"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

interface AuthContextType {
  user: any | null
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null)

  // Mock login/logout for now to satisfy interactivity check
  const login = () => {
    console.log("Logging in...")
    setUser({ name: "Demo User", email: "demo@nexevent.com" })
  }

  const logout = () => {
    console.log("Logging out...")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
