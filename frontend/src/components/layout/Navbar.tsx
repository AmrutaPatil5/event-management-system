"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, Menu, X } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, login, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-indigo-500" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500">
              NexEvent
            </span>
        </div>
        <nav className="hidden md:flex gap-6 items-center">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">Home</Link>
            <Link href="/features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Features</Link>
            <Link href="/about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">About</Link>
        </nav>
        <div className="hidden md:flex items-center gap-4">
            {user ? (
               <div className="flex items-center gap-4">
                 <span className="text-sm font-medium">Hello, {user.name}</span>
                 <Button variant="ghost" size="sm" onClick={logout}>Log Out</Button>
               </div>
            ) : (
                <>
                  <Button variant="ghost" size="sm" onClick={login}>Log In</Button>
                  <Button size="sm" variant="premium">Get Started</Button>
                </>
            )}
        </div>
        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t p-4 bg-background">
          <nav className="flex flex-col gap-4">
             <Link href="/" className="text-sm font-medium transition-colors hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
             <Link href="/features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Features</Link>
             <Link href="/about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
             <div className="flex flex-col gap-2 mt-4">
                {user ? (
                   <>
                     <span className="text-sm font-medium">Signed in as {user.name}</span>
                     <Button variant="ghost" onClick={() => { logout(); setIsMobileMenuOpen(false) }}>Log Out</Button>
                   </>
                ) : (
                   <>
                     <Button variant="ghost" onClick={() => { login(); setIsMobileMenuOpen(false) }}>Log In</Button>
                     <Button variant="premium">Get Started</Button>
                   </>
                )}
             </div>
          </nav>
        </div>
      )}
    </header>
  )
}
