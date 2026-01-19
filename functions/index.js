const functions = require("firebase-functions")
const admin = require("firebase-admin")

admin.initializeApp()

const db = admin.firestore()

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions"
const MODEL = "gpt-4o"

const buildPrompt = ({ hero, story, platform, contentType }) => {
  const storyContent = story?.content ? `Story draft:\n${story.content}` : "Story draft: Not available."
  return [
    "You are Ama, the AI Curator for Habuhtat Media.",
    "Generate a platform-optimized content variant for an environmental hero.",
    "Return a JSON object with keys: content (string) and hashtags (array of strings).",
    "Tone: hopeful, human-centered, factual, and story-first.",
    "Avoid politics. Emphasize impact and the hero's personal journey.",
    "",
    `Platform: ${platform}`,
    `Content type: ${contentType}`,
    "",
    `Hero name: ${hero.heroName}`,
    `Location: ${hero.location}, ${hero.country}`,
    `Category: ${hero.category}`,
    `Summary: ${hero.summary || "Not provided"}`,
    `Impact: ${hero.impact || "Not provided"}`,
    storyContent,
  ].join("\n")
}

const normalizeHashtags = (hashtags) => {
  if (Array.isArray(hashtags)) return hashtags.filter(Boolean)
  if (typeof hashtags === "string") {
    return hashtags
      .split(/[\s,]+/)
      .map((tag) => tag.trim())
      .filter(Boolean)
  }
  return []
}

exports.generateAiContent = functions
  .region("us-central1")
  .https.onRequest(async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*")
    res.set("Access-Control-Allow-Methods", "POST, OPTIONS")
    res.set("Access-Control-Allow-Headers", "Content-Type")

    if (req.method === "OPTIONS") {
      res.status(204).send("")
      return
    }

    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" })
      return
    }

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      res.status(500).json({ error: "Missing OPENAI_API_KEY in environment." })
      return
    }

    const { heroProfileId, platform, contentType } = req.body || {}
    if (!heroProfileId || !platform || !contentType) {
      res.status(400).json({ error: "heroProfileId, platform, and contentType are required." })
      return
    }

    try {
      const heroSnap = await db.collection("heroes").doc(heroProfileId).get()
      if (!heroSnap.exists) {
        res.status(404).json({ error: "Hero profile not found." })
        return
      }

      const hero = heroSnap.data()
      const storySnap = await db
        .collection("stories")
        .where("heroProfileId", "==", heroProfileId)
        .orderBy("createdAt", "desc")
        .limit(1)
        .get()

      const storyDoc = storySnap.empty ? null : storySnap.docs[0]
      const story = storyDoc ? { id: storyDoc.id, ...storyDoc.data() } : null

      const prompt = buildPrompt({ hero, story, platform, contentType })

      const openAiResponse = await fetch(OPENAI_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: MODEL,
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: "Return only valid JSON." },
            { role: "user", content: prompt },
          ],
          temperature: 0.7,
        }),
      })

      if (!openAiResponse.ok) {
        const errorText = await openAiResponse.text()
        res.status(500).json({ error: "OpenAI request failed.", details: errorText })
        return
      }

      const openAiJson = await openAiResponse.json()
      const rawContent = openAiJson.choices?.[0]?.message?.content || "{}"

      let parsed = { content: "", hashtags: [] }
      try {
        parsed = JSON.parse(rawContent)
      } catch (parseError) {
        parsed.content = rawContent
      }

      const contentData = {
        heroProfileId,
        heroName: hero.heroName || "Unknown Hero",
        storyId: story?.id || "",
        platform,
        contentType,
        content: parsed.content || "",
        hashtags: normalizeHashtags(parsed.hashtags),
        status: "pending",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      }

      const contentRef = await db.collection("aiContent").add(contentData)

      res.json({ id: contentRef.id, ...contentData })
    } catch (error) {
      console.error("AI content generation failed", error)
      res.status(500).json({ error: "AI content generation failed." })
    }
  })
