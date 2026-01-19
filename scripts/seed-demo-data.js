const admin = require("firebase-admin")
const path = require("path")

const args = process.argv.slice(2)
const keyArgIndex = args.findIndex((arg) => arg === "--key")
const keyPath = keyArgIndex >= 0 ? args[keyArgIndex + 1] : process.env.GOOGLE_APPLICATION_CREDENTIALS

if (!keyPath) {
  console.error("Provide a service account key with --key <path> or set GOOGLE_APPLICATION_CREDENTIALS.")
  process.exit(1)
}

const resolvedPath = path.resolve(keyPath)
admin.initializeApp({
  credential: admin.credential.cert(require(resolvedPath)),
})

const db = admin.firestore()
const auth = admin.auth()

const demoUsers = [
  { email: "admin@habuhtat.com", name: "Admin", role: "admin" },
  { email: "ambassador@habuhtat.com", name: "Ambassador", role: "ambassador" },
  { email: "journalist@habuhtat.com", name: "Journalist", role: "journalist" },
]

const daysAgo = (days) => {
  const date = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
  return admin.firestore.Timestamp.fromDate(date)
}

const buildHeroes = (ids) => ([
  {
    id: "demo-hero-1",
    heroName: "Amina Diallo",
    location: "Kayes",
    country: "Mali",
    category: "Clean Water",
    summary: "Built a community-led borehole network that cut water walks in half.",
    impact: "14 villages now have year-round access to clean water.",
    status: "review",
    ambassadorId: ids.ambassador,
    ambassadorName: "Ambassador",
    createdAt: daysAgo(2),
    updatedAt: daysAgo(2),
  },
  {
    id: "demo-hero-2",
    heroName: "Lucas Ortega",
    location: "Cali",
    country: "Colombia",
    category: "Reforestation",
    summary: "Organized urban forest corridors with local schools.",
    impact: "12,000 native trees planted and maintained by volunteers.",
    status: "claimed",
    ambassadorId: ids.ambassador,
    ambassadorName: "Ambassador",
    journalistId: ids.journalist,
    journalistName: "Journalist",
    claimedAt: daysAgo(5),
    createdAt: daysAgo(7),
    updatedAt: daysAgo(5),
  },
  {
    id: "demo-hero-3",
    heroName: "Mei Lin",
    location: "Taichung",
    country: "Taiwan",
    category: "Waste Reduction",
    summary: "Launched a market composting cooperative.",
    impact: "50 tons of organic waste diverted each month.",
    status: "story_submitted",
    ambassadorId: ids.ambassador,
    ambassadorName: "Ambassador",
    journalistId: ids.journalist,
    journalistName: "Journalist",
    claimedAt: daysAgo(10),
    storySubmittedAt: daysAgo(3),
    createdAt: daysAgo(15),
    updatedAt: daysAgo(3),
  },
  {
    id: "demo-hero-4",
    heroName: "Samir Okoye",
    location: "Enugu",
    country: "Nigeria",
    category: "Solar Energy",
    summary: "Installed community solar micro-grids for clinics.",
    impact: "6 clinics now operate 24/7 with reliable power.",
    status: "approved",
    ambassadorId: ids.ambassador,
    ambassadorName: "Ambassador",
    journalistId: ids.journalist,
    journalistName: "Journalist",
    approvedAt: daysAgo(4),
    createdAt: daysAgo(20),
    updatedAt: daysAgo(4),
  },
  {
    id: "demo-hero-5",
    heroName: "Priya Sharma",
    location: "Pune",
    country: "India",
    category: "Air Quality",
    summary: "Built a low-cost sensor network for school districts.",
    impact: "Air alerts now protect 18 schools during peak smog.",
    status: "scheduled",
    ambassadorId: ids.ambassador,
    ambassadorName: "Ambassador",
    journalistId: ids.journalist,
    journalistName: "Journalist",
    approvedAt: daysAgo(8),
    scheduledFor: daysAgo(-1),
    createdAt: daysAgo(30),
    updatedAt: daysAgo(1),
  },
  {
    id: "demo-hero-6",
    heroName: "Elena Rodriguez",
    location: "San Jose",
    country: "Costa Rica",
    category: "Wildlife Conservation",
    summary: "Protected a coastal nesting ground with local rangers.",
    impact: "Sea turtle hatch rates increased by 40%.",
    status: "published",
    ambassadorId: ids.ambassador,
    ambassadorName: "Ambassador",
    journalistId: ids.journalist,
    journalistName: "Journalist",
    publishedAt: daysAgo(1),
    createdAt: daysAgo(40),
    updatedAt: daysAgo(1),
  },
])

const buildStories = (ids) => ([
  {
    id: "demo-story-1",
    heroProfileId: "demo-hero-3",
    heroName: "Mei Lin",
    title: "Turning Market Waste Into Community Soil",
    content:
      "Mei Lin grew tired of seeing market waste dumped each week. She built a cooperative where vendors and households sort organics, turning scraps into compost for neighborhood gardens. The program now diverts 50 tons monthly and funds local school lunches.",
    journalistId: ids.journalist,
    journalistName: "Journalist",
    status: "submitted",
    createdAt: daysAgo(5),
    updatedAt: daysAgo(3),
  },
  {
    id: "demo-story-2",
    heroProfileId: "demo-hero-6",
    heroName: "Elena Rodriguez",
    title: "Guardians of the Nesting Coast",
    content:
      "Elena Rodriguez rallied coastal fishers to protect sea turtle nests. By installing low-light patrols and training youth rangers, hatch rates jumped 40%, and eco-tourism now funds the patrols year-round.",
    journalistId: ids.journalist,
    journalistName: "Journalist",
    status: "approved",
    createdAt: daysAgo(12),
    updatedAt: daysAgo(2),
  },
])

const buildAiContent = () => ([
  {
    id: "demo-ai-1",
    heroProfileId: "demo-hero-3",
    heroName: "Mei Lin",
    storyId: "demo-story-1",
    platform: "linkedin",
    contentType: "summary",
    content:
      "Mei Lin transformed weekly market waste into a cooperative composting effort in Taichung. The program now diverts 50 tons of organic waste each month and funds local school lunches. A community story of circular impact.",
    hashtags: ["CircularEconomy", "CommunityImpact", "WasteReduction"],
    status: "pending",
    createdAt: daysAgo(1),
  },
  {
    id: "demo-ai-2",
    heroProfileId: "demo-hero-6",
    heroName: "Elena Rodriguez",
    storyId: "demo-story-2",
    platform: "instagram",
    contentType: "post",
    content:
      "Elena and her coastal rangers protect sea turtle nests every night. With local youth leading patrols, hatch rates rose 40% and new eco-tourism income now funds the effort year-round. A victory for community-led conservation.",
    hashtags: ["WildlifeConservation", "LocalHeroes", "OceanGuardians"],
    status: "approved",
    createdAt: daysAgo(2),
    approvedAt: daysAgo(1),
  },
])

const ensureUsers = async () => {
  const ids = {}
  for (const user of demoUsers) {
    const record = await auth.getUserByEmail(user.email)
    ids[user.role] = record.uid
  }
  return ids
}

const seed = async () => {
  const ids = await ensureUsers()
  const heroes = buildHeroes(ids)
  const stories = buildStories(ids)
  const aiContent = buildAiContent()

  const batch = db.batch()

  heroes.forEach((hero) => {
    const ref = db.collection("heroes").doc(hero.id)
    batch.set(ref, hero, { merge: true })
  })

  stories.forEach((story) => {
    const ref = db.collection("stories").doc(story.id)
    batch.set(ref, story, { merge: true })
  })

  aiContent.forEach((content) => {
    const ref = db.collection("aiContent").doc(content.id)
    batch.set(ref, content, { merge: true })
  })

  await batch.commit()
  console.log("Seeded demo heroes, stories, and AI content.")
}

seed().catch((error) => {
  console.error("Seeding failed:", error)
  process.exit(1)
})
