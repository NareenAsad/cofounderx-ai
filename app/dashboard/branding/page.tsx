"use client"

import Link from "next/link"
import { ArrowLeft, Download, Share2, Check } from "lucide-react"
import { useState } from "react"
import Sidebar from "@/components/dashboard/sidebar"
import Header from "@/components/dashboard/header"

export default function Branding() {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }

  const brandColors = [
    { name: "Primary", color: "#3b82f6", hex: "#3b82f6" },
    { name: "Secondary", color: "#1f2937", hex: "#1f2937" },
    { name: "Success", color: "#10b981", hex: "#10b981" },
    { name: "Warning", color: "#f59e0b", hex: "#f59e0b" },
    { name: "Error", color: "#ef4444", hex: "#ef4444" },
  ]

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto px-6 py-8">
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-accent hover:text-accent-hover mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>

            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">Branding Kit</h1>
                <p className="text-text-secondary">Your EdTech Platform brand identity</p>
              </div>
              <div className="flex gap-2">
                <button className="btn-secondary inline-flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
                <button className="btn-primary inline-flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Download
                </button>
              </div>
            </div>

            {/* Brand Colors */}
            <div className="card mb-6">
              <h2 className="text-xl font-semibold text-text-primary mb-4">Color Palette</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {brandColors.map((item) => (
                  <div key={item.name} className="cursor-pointer" onClick={() => copyToClipboard(item.hex, item.name)}>
                    <div
                      className="w-full h-24 rounded-lg mb-2 border border-border hover:border-accent transition-colors"
                      style={{ backgroundColor: item.color }}
                      title={`Click to copy ${item.hex}`}
                    />
                    <p className="text-sm font-medium text-text-primary">{item.name}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-text-muted">{item.hex}</p>
                      {copied === item.name && <Check className="w-3 h-3 text-success" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Logo */}
            <div className="card mb-6">
              <h2 className="text-xl font-semibold text-text-primary mb-4">Logo</h2>
              <div className="space-y-4">
                <div className="bg-background p-8 rounded-lg border border-border flex items-center justify-center">
                  <div className="w-20 h-20 bg-accent rounded-lg flex items-center justify-center text-white text-3xl font-bold">
                    EP
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="btn-secondary text-sm">Download PNG</button>
                  <button className="btn-secondary text-sm">Download SVG</button>
                </div>
              </div>
            </div>

            {/* Typography */}
            <div className="card mb-6">
              <h2 className="text-xl font-semibold text-text-primary mb-4">Typography</h2>
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-text-muted mb-2">Heading (H1) - Geist 700</p>
                  <p className="text-4xl font-bold text-text-primary">EdTech Platform</p>
                </div>
                <div>
                  <p className="text-sm text-text-muted mb-2">Heading (H2) - Geist 600</p>
                  <p className="text-2xl font-semibold text-text-primary">Build Your Vision</p>
                </div>
                <div>
                  <p className="text-sm text-text-muted mb-2">Body Text - Geist 400</p>
                  <p className="text-base text-text-primary">
                    Personalized learning experiences powered by AI technology. Our platform helps educators deliver
                    tailored content to every student.
                  </p>
                </div>
              </div>
            </div>

            {/* Brand Voice */}
            <div className="card">
              <h2 className="text-xl font-semibold text-text-primary mb-4">Brand Voice</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-text-primary mb-2">Tone</h3>
                  <ul className="space-y-2 text-text-secondary text-sm">
                    <li>Professional yet approachable</li>
                    <li>Clear and direct</li>
                    <li>Confident and forward-thinking</li>
                    <li>Empowering and inclusive</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-text-primary mb-2">Values</h3>
                  <ul className="space-y-2 text-text-secondary text-sm">
                    <li>Innovation in education</li>
                    <li>Accessibility for all</li>
                    <li>Data-driven decisions</li>
                    <li>Continuous improvement</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
