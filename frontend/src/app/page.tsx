"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-background/50 to-transparent"></div>
        
        <div className="container relative z-10 px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              The Future of Campus Events
            </h1>
            <p className="max-w-[700px] text-lg md:text-xl text-muted-foreground animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              Seamlessly organize, join, and manage college events. Experience the next generation of event management with NexEvent.
            </p>
            <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-400">
              <Link href="/events">
                <Button size="lg" variant="premium" className="h-12 px-8 text-lg">
                  Explore Events <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="h-12 px-8 text-lg">
                  Learn More
                </Button>
              </Link>
              <Button size="lg" variant="destructive" className="h-12 px-8 text-lg" onClick={() => alert("UI is Awake!")}>
                Test UI
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Features Preview */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Why Choose NexEvent?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Smart scheduling, real-time collaboration, and gamified engagement — all in one platform.
          </p>
          <Link href="/features">
            <Button variant="outline" size="lg">
              Explore All Features
            </Button>
          </Link>
        </div>
      </section>
        
      {/* CTA Section */}
      <section className="py-20">
          <div className="container px-4 md:px-6">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-center text-white relative overflow-hidden">
                  <div className="relative z-10">
                      <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
                      <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">Join thousands of students and transform your campus experience today.</p>
                      <Button size="lg" variant="secondary" className="font-bold">
                          Create Free Account
                      </Button>
                  </div>
                   <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
              </div>
          </div>
      </section>
    </div>
  )
}
