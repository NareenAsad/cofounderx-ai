"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Sparkles } from "lucide-react"
import Sidebar from "@/components/dashboard/sidebar"
import Header from "@/components/dashboard/header"

export default function NewWorkspace() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    idea: "",
    targetMarket: "",
    fundingGoal: "",
  })

  const [isGenerating, setIsGenerating] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    // Simulate API call to FastAPI backend
    setTimeout(() => {
      setIsGenerating(false)
      alert("Workspace created! Redirecting...")
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-auto">
          <div className="max-w-3xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="mb-8">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 text-accent hover:text-accent-hover mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold text-text-primary mb-2">Create New Workspace</h1>
              <p className="text-text-secondary">
                Tell us about your startup idea and our AI co-founders will help you build it
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="card">
                <label className="block text-text-primary font-medium mb-2">Workspace Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., EdTech Platform"
                  className="input-field"
                  required
                />
              </div>

              <div className="card">
                <label className="block text-text-primary font-medium mb-2">Your Startup Idea</label>
                <textarea
                  name="idea"
                  value={formData.idea}
                  onChange={handleChange}
                  placeholder="Describe your startup idea in detail..."
                  className="input-field min-h-32 resize-none"
                  required
                />
                <p className="text-text-muted text-xs mt-2">
                  Be specific about the problem you're solving and your solution
                </p>
              </div>

              <div className="card">
                <label className="block text-text-primary font-medium mb-2">Target Market</label>
                <input
                  type="text"
                  name="targetMarket"
                  value={formData.targetMarket}
                  onChange={handleChange}
                  placeholder="e.g., K-12 educators, SaaS founders"
                  className="input-field"
                  required
                />
              </div>

              <div className="card">
                <label className="block text-text-primary font-medium mb-2">Funding Goal (Optional)</label>
                <input
                  type="text"
                  name="fundingGoal"
                  value={formData.fundingGoal}
                  onChange={handleChange}
                  placeholder="e.g., $500K"
                  className="input-field"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="btn-primary inline-flex items-center gap-2 disabled:opacity-50"
                >
                  <Sparkles className="w-5 h-5" />
                  {isGenerating ? "Generating..." : "Generate Startup Plan"}
                </button>
                <Link href="/dashboard" className="btn-secondary">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
