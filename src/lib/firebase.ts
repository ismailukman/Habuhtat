import { initializeApp, getApps } from "firebase/app"
import { getAnalytics, isSupported } from "firebase/analytics"

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

// Initialize Analytics only on client side
let analytics = null
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app)
    }
  })
}

export { app, analytics }
