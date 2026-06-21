import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "NexEvent",
  description: "Advanced Event Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased flex flex-col", inter.className)}>
        <AuthProvider>
          <Navbar />
          <main className="flex-1">
              {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
