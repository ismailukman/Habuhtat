"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { User } from "firebase/auth"
import {
  onAuthChange,
  getUserProfile,
  UserProfile,
  UserRole,
  logout as firebaseLogout
} from "./firebase"
import { useRouter } from "next/navigation"

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  logout: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  logout: async () => {},
  refreshProfile: async () => {}
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const refreshProfile = async () => {
    if (user) {
      const userProfile = await getUserProfile(user.uid)
      setProfile(userProfile)
    }
  }

  const logout = async () => {
    await firebaseLogout()
    setUser(null)
    setProfile(null)
    router.push("/login")
  }

  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      setUser(firebaseUser)

      if (firebaseUser) {
        const userProfile = await getUserProfile(firebaseUser.uid)
        setProfile(userProfile)
      } else {
        setProfile(null)
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, profile, loading, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// HOC for protected routes
export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  allowedRoles?: UserRole[]
) {
  return function ProtectedRoute(props: P) {
    const { user, profile, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!loading) {
        if (!user) {
          router.push("/login")
        } else if (allowedRoles && profile && !allowedRoles.includes(profile.role)) {
          // Redirect to appropriate dashboard based on role
          router.push(`/dashboard/${profile.role}`)
        }
      }
    }, [user, profile, loading, router])

    if (loading) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )
    }

    if (!user || (allowedRoles && profile && !allowedRoles.includes(profile.role))) {
      return null
    }

    return <WrappedComponent {...props} />
  }
}
