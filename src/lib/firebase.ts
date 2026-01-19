import { initializeApp, getApps } from "firebase/app"
import { getAnalytics, isSupported } from "firebase/analytics"
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from "firebase/auth"
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  addDoc
} from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDUa4mHqNov3vHnwW0FRymq0YAdSc5ZIgk",
  authDomain: "habuhtat.firebaseapp.com",
  projectId: "habuhtat",
  storageBucket: "habuhtat.firebasestorage.app",
  messagingSenderId: "868894749499",
  appId: "1:868894749499:web:f12bdbbd77aa0d0928bd1e",
  measurementId: "G-NTX3PCCEE1"
}

// Initialize Firebase only if it hasn't been initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

// Initialize services
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

// Initialize Analytics only on client side
let analytics: ReturnType<typeof getAnalytics> | null = null
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app)
    }
  })
}

// User roles
export type UserRole = "ambassador" | "journalist" | "admin"

// User profile interface
export interface UserProfile {
  uid: string
  email: string
  name: string
  role: UserRole
  createdAt: Timestamp
  updatedAt: Timestamp
  isActive: boolean
  avatar?: string
  bio?: string
  location?: string
}

// Hero profile interface
export interface HeroProfile {
  id: string
  heroName: string
  location: string
  country: string
  category: string
  summary: string
  fullStory?: string
  impact: string
  contactEmail?: string
  contactPhone?: string
  imageUrl?: string
  additionalImages?: string[]
  status: "draft" | "review" | "claimed" | "story_submitted" | "ai_generated" | "approved" | "scheduled" | "published"
  ambassadorId: string
  ambassadorName: string
  journalistId?: string
  journalistName?: string
  claimedAt?: Timestamp
  storySubmittedAt?: Timestamp
  approvedAt?: Timestamp
  scheduledFor?: Timestamp
  publishedAt?: Timestamp
  createdAt: Timestamp
  updatedAt: Timestamp
}

// Story interface
export interface Story {
  id: string
  heroProfileId: string
  heroName: string
  title: string
  content: string
  journalistId: string
  journalistName: string
  status: "draft" | "submitted" | "revision_requested" | "approved"
  revisionNotes?: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

// AI Content interface
export interface AIContent {
  id: string
  heroProfileId: string
  heroName: string
  storyId: string
  platform: "twitter" | "instagram" | "linkedin" | "facebook" | "blog"
  contentType: "thread" | "post" | "carousel" | "article" | "summary"
  content: string
  hashtags: string[]
  status: "pending" | "approved" | "rejected" | "published"
  createdAt: Timestamp
  approvedAt?: Timestamp
  publishedAt?: Timestamp
}

// Auth functions
export const loginWithEmail = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
}

export const registerWithEmail = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
}

export const logout = async () => {
  return signOut(auth)
}

export const getCurrentUser = (): User | null => {
  return auth.currentUser
}

export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback)
}

// User profile functions
export const createUserProfile = async (uid: string, data: Partial<UserProfile>) => {
  const userRef = doc(db, "users", uid)
  const now = Timestamp.now()
  await setDoc(userRef, {
    uid,
    ...data,
    createdAt: now,
    updatedAt: now,
    isActive: true
  })
}

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const userRef = doc(db, "users", uid)
  const userSnap = await getDoc(userRef)
  if (userSnap.exists()) {
    return userSnap.data() as UserProfile
  }
  return null
}

export const updateUserProfile = async (uid: string, data: Partial<UserProfile>) => {
  const userRef = doc(db, "users", uid)
  await updateDoc(userRef, {
    ...data,
    updatedAt: Timestamp.now()
  })
}

// Hero profile functions
export const createHeroProfile = async (data: Omit<HeroProfile, "id" | "createdAt" | "updatedAt">) => {
  const now = Timestamp.now()
  const heroRef = await addDoc(collection(db, "heroes"), {
    ...data,
    createdAt: now,
    updatedAt: now
  })
  return heroRef.id
}

export const getHeroProfile = async (id: string): Promise<HeroProfile | null> => {
  const heroRef = doc(db, "heroes", id)
  const heroSnap = await getDoc(heroRef)
  if (heroSnap.exists()) {
    return { id: heroSnap.id, ...heroSnap.data() } as HeroProfile
  }
  return null
}

export const updateHeroProfile = async (id: string, data: Partial<HeroProfile>) => {
  const heroRef = doc(db, "heroes", id)
  await updateDoc(heroRef, {
    ...data,
    updatedAt: Timestamp.now()
  })
}

export const getHeroesByAmbassador = async (ambassadorId: string) => {
  const q = query(
    collection(db, "heroes"),
    where("ambassadorId", "==", ambassadorId),
    orderBy("createdAt", "desc")
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as HeroProfile))
}

export const getAvailableHeroes = async () => {
  const q = query(
    collection(db, "heroes"),
    where("status", "==", "review"),
    orderBy("createdAt", "desc")
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as HeroProfile))
}

export const getClaimedHeroesByJournalist = async (journalistId: string) => {
  const q = query(
    collection(db, "heroes"),
    where("journalistId", "==", journalistId),
    orderBy("claimedAt", "desc")
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as HeroProfile))
}

export const getAllHeroes = async (statusFilter?: string) => {
  let q = query(collection(db, "heroes"), orderBy("createdAt", "desc"))
  if (statusFilter) {
    q = query(
      collection(db, "heroes"),
      where("status", "==", statusFilter),
      orderBy("createdAt", "desc")
    )
  }
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as HeroProfile))
}

// Claim hero function
export const claimHeroProfile = async (heroId: string, journalistId: string, journalistName: string) => {
  const heroRef = doc(db, "heroes", heroId)
  await updateDoc(heroRef, {
    status: "claimed",
    journalistId,
    journalistName,
    claimedAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  })
}

// Story functions
export const createStory = async (data: Omit<Story, "id" | "createdAt" | "updatedAt">) => {
  const now = Timestamp.now()
  const storyRef = await addDoc(collection(db, "stories"), {
    ...data,
    createdAt: now,
    updatedAt: now
  })

  // Update hero status
  await updateHeroProfile(data.heroProfileId, { status: "story_submitted", storySubmittedAt: now })

  return storyRef.id
}

export const getStoriesByJournalist = async (journalistId: string) => {
  const q = query(
    collection(db, "stories"),
    where("journalistId", "==", journalistId),
    orderBy("createdAt", "desc")
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Story))
}

export const getAllStories = async () => {
  const q = query(collection(db, "stories"), orderBy("createdAt", "desc"))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Story))
}

// AI Content functions
export const createAIContent = async (data: Omit<AIContent, "id" | "createdAt">) => {
  const now = Timestamp.now()
  const contentRef = await addDoc(collection(db, "aiContent"), {
    ...data,
    createdAt: now
  })
  return contentRef.id
}

export const getAIContentByHero = async (heroProfileId: string) => {
  const q = query(
    collection(db, "aiContent"),
    where("heroProfileId", "==", heroProfileId),
    orderBy("createdAt", "desc")
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AIContent))
}

export const getAllAIContent = async (statusFilter?: string) => {
  let q = query(collection(db, "aiContent"), orderBy("createdAt", "desc"))
  if (statusFilter) {
    q = query(
      collection(db, "aiContent"),
      where("status", "==", statusFilter),
      orderBy("createdAt", "desc")
    )
  }
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AIContent))
}

export const updateAIContent = async (id: string, data: Partial<AIContent>) => {
  const contentRef = doc(db, "aiContent", id)
  await updateDoc(contentRef, data)
}

// File upload function
export const uploadFile = async (file: File, path: string): Promise<string> => {
  const storageRef = ref(storage, path)
  await uploadBytes(storageRef, file)
  return getDownloadURL(storageRef)
}

// Get all users (admin only)
export const getAllUsers = async () => {
  const q = query(collection(db, "users"), orderBy("createdAt", "desc"))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => doc.data() as UserProfile)
}

// Dashboard stats
export const getDashboardStats = async (role: UserRole, userId?: string) => {
  if (role === "ambassador" && userId) {
    const heroes = await getHeroesByAmbassador(userId)
    return {
      totalSubmissions: heroes.length,
      underReview: heroes.filter(h => h.status === "review").length,
      claimed: heroes.filter(h => h.status === "claimed").length,
      approved: heroes.filter(h => ["approved", "scheduled", "published"].includes(h.status)).length,
      published: heroes.filter(h => h.status === "published").length
    }
  }

  if (role === "journalist" && userId) {
    const available = await getAvailableHeroes()
    const claimed = await getClaimedHeroesByJournalist(userId)
    const stories = await getStoriesByJournalist(userId)
    return {
      availableProfiles: available.length,
      myClaims: claimed.length,
      storiesSubmitted: stories.length,
      published: claimed.filter(h => h.status === "published").length
    }
  }

  if (role === "admin") {
    const allHeroes = await getAllHeroes()
    const allContent = await getAllAIContent()
    const allUsers = await getAllUsers()
    return {
      pendingReview: allHeroes.filter(h => h.status === "story_submitted").length,
      aiGenerated: allContent.filter(c => c.status === "pending").length,
      approved: allHeroes.filter(h => h.status === "approved").length,
      scheduled: allHeroes.filter(h => h.status === "scheduled").length,
      published: allHeroes.filter(h => h.status === "published").length,
      totalUsers: allUsers.length,
      ambassadors: allUsers.filter(u => u.role === "ambassador").length,
      journalists: allUsers.filter(u => u.role === "journalist").length
    }
  }

  return {}
}

export { app, auth, db, storage, analytics }
