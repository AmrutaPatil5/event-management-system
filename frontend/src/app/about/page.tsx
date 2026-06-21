"use client"

import { Button } from "@/components/ui/button"
import { Users, Target, Heart, Sparkles } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="container relative z-10 px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-6">
            About NexEvent
          </h1>
          <p className="max-w-[700px] mx-auto text-lg md:text-xl text-muted-foreground">
            Revolutionizing campus event management with modern technology and seamless experiences.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-muted-foreground text-lg mb-4">
                NexEvent was born from a simple idea: campus events should be easy to discover, join, and manage. 
                We believe that every student deserves access to enriching experiences that go beyond the classroom.
              </p>
              <p className="text-muted-foreground text-lg">
                Our platform bridges the gap between event organizers and attendees, creating a vibrant 
                ecosystem where knowledge sharing, networking, and fun converge.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-background p-6 rounded-xl border shadow-sm text-center">
                <div className="text-4xl font-bold text-indigo-500 mb-2">500+</div>
                <div className="text-muted-foreground">Events Hosted</div>
              </div>
              <div className="bg-background p-6 rounded-xl border shadow-sm text-center">
                <div className="text-4xl font-bold text-purple-500 mb-2">10K+</div>
                <div className="text-muted-foreground">Active Users</div>
              </div>
              <div className="bg-background p-6 rounded-xl border shadow-sm text-center">
                <div className="text-4xl font-bold text-pink-500 mb-2">50+</div>
                <div className="text-muted-foreground">Colleges</div>
              </div>
              <div className="bg-background p-6 rounded-xl border shadow-sm text-center">
                <div className="text-4xl font-bold text-green-500 mb-2">98%</div>
                <div className="text-muted-foreground">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-background rounded-xl border shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 bg-indigo-100 dark:bg-indigo-900 rounded-full inline-block mb-4">
                <Target className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Innovation</h3>
              <p className="text-muted-foreground">
                We constantly push boundaries to deliver cutting-edge solutions that make event management effortless.
              </p>
            </div>
            <div className="text-center p-8 bg-background rounded-xl border shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 bg-purple-100 dark:bg-purple-900 rounded-full inline-block mb-4">
                <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Community</h3>
              <p className="text-muted-foreground">
                We believe in the power of bringing people together and fostering meaningful connections.
              </p>
            </div>
            <div className="text-center p-8 bg-background rounded-xl border shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 bg-pink-100 dark:bg-pink-900 rounded-full inline-block mb-4">
                <Heart className="h-8 w-8 text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Passion</h3>
              <p className="text-muted-foreground">
                We're passionate about student success and creating memorable experiences that last a lifetime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4 md:px-6 text-center">
          <Sparkles className="h-12 w-12 text-indigo-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Join the NexEvent Community</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Be part of a growing community that's redefining campus experiences.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/">
              <Button size="lg" variant="premium">
                Get Started
              </Button>
            </Link>
            <Button size="lg" variant="outline" onClick={() => alert("Contact form coming soon!")}>
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
