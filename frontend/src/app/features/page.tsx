"use client"

import { Calendar, Users, Trophy, Zap, Shield, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FeaturesPage() {
  const features = [
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Effortlessly schedule and manage events with our intuitive calendar system. Avoid conflicts and maximize attendance.",
      color: "indigo"
    },
    {
      icon: Users,
      title: "Real-time Collaboration",
      description: "Connect with students and coordinators in real-time for seamless event execution and communication.",
      color: "purple"
    },
    {
      icon: Trophy,
      title: "Gamified Engagement",
      description: "Earn rewards and track your participation with our engagement score system. Compete on leaderboards!",
      color: "pink"
    },
    {
      icon: Zap,
      title: "Instant Notifications",
      description: "Never miss an event update. Get real-time notifications for registrations, changes, and reminders.",
      color: "yellow"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Your data is protected with enterprise-grade security. Role-based access ensures proper permissions.",
      color: "green"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track event performance, attendance rates, and engagement metrics with comprehensive analytics.",
      color: "blue"
    }
  ]

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      indigo: { bg: "bg-indigo-100 dark:bg-indigo-900", text: "text-indigo-600 dark:text-indigo-400" },
      purple: { bg: "bg-purple-100 dark:bg-purple-900", text: "text-purple-600 dark:text-purple-400" },
      pink: { bg: "bg-pink-100 dark:bg-pink-900", text: "text-pink-600 dark:text-pink-400" },
      yellow: { bg: "bg-yellow-100 dark:bg-yellow-900", text: "text-yellow-600 dark:text-yellow-400" },
      green: { bg: "bg-green-100 dark:bg-green-900", text: "text-green-600 dark:text-green-400" },
      blue: { bg: "bg-blue-100 dark:bg-blue-900", text: "text-blue-600 dark:text-blue-400" }
    }
    return colors[color] || colors.indigo
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="container relative z-10 px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-6">
            Powerful Features
          </h1>
          <p className="max-w-[700px] mx-auto text-lg md:text-xl text-muted-foreground">
            Everything you need to manage campus events efficiently and create unforgettable experiences.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const colorClasses = getColorClasses(feature.color)
              return (
                <div 
                  key={index}
                  className="flex flex-col items-center p-8 bg-background rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`p-4 ${colorClasses.bg} rounded-full mb-6`}>
                    <feature.icon className={`h-8 w-8 ${colorClasses.text}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-center text-muted-foreground">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to experience these features?</h2>
            <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join NexEvent today and transform how your campus manages events.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/events">
                <Button size="lg" variant="secondary" className="font-bold">
                  Explore Events
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="font-bold border-white text-white hover:bg-white/10" onClick={() => alert("Sign up coming soon!")}>
                Get Started Free
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
