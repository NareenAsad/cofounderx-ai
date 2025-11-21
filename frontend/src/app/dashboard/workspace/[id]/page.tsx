"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Save, Share2, Download } from "lucide-react"
import Sidebar from "@/components/dashboard/sidebar"
import Header from "@/components/dashboard/header"

interface TabItem {
  id: string
  label: string
}

export default function WorkspaceDetail({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [formData, setFormData] = useState({
    name: "EdTech Platform",
    idea: "AI-powered personalized learning for K-12 students",
    targetMarket: "K-12 educators and students",
    fundingGoal: "$500K",
    businessModel: "B2C SaaS",
    techStack: "Next.js, Python, PostgreSQL",
  })

  const tabs: TabItem[] = [
    { id: "overview", label: "Overview" },
    { id: "agents", label: "AI Agents" },
    { id: "deliverables", label: "Deliverables" },
    { id: "settings", label: "Settings" },
  ]

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 text-accent hover:text-accent-hover mb-4"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Link>
                <h1 className="text-3xl font-bold text-text-primary">{formData.name}</h1>
                <p className="text-text-secondary mt-1">{formData.idea}</p>
              </div>
              <div className="flex gap-2">
                <button className="btn-secondary inline-flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
                <button className="btn-primary inline-flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Export
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-surface border-b border-border rounded-t-lg flex gap-8 px-6 py-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-2 font-medium transition-colors ${activeTab === tab.id
                    ? "text-accent border-b-2 border-accent"
                    : "text-text-secondary hover:text-text-primary"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-surface border border-t-0 border-border rounded-b-lg p-6">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-text-primary font-medium mb-2">Workspace Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-text-primary font-medium mb-2">Startup Idea</label>
                    <textarea
                      value={formData.idea}
                      onChange={(e) => setFormData({ ...formData, idea: e.target.value })}
                      className="input-field min-h-24 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-text-primary font-medium mb-2">Target Market</label>
                      <input
                        type="text"
                        value={formData.targetMarket}
                        onChange={(e) => setFormData({ ...formData, targetMarket: e.target.value })}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-text-primary font-medium mb-2">Funding Goal</label>
                      <input
                        type="text"
                        value={formData.fundingGoal}
                        onChange={(e) => setFormData({ ...formData, fundingGoal: e.target.value })}
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-text-primary font-medium mb-2">Business Model</label>
                      <input
                        type="text"
                        value={formData.businessModel}
                        onChange={(e) => setFormData({ ...formData, businessModel: e.target.value })}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-text-primary font-medium mb-2">Tech Stack</label>
                      <input
                        type="text"
                        value={formData.techStack}
                        onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <button className="btn-primary inline-flex items-center gap-2">
                      <Save className="w-5 h-5" />
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "agents" && (
                <div>
                  <p className="text-text-secondary mb-4">AI agents working on your startup</p>
                  <div className="space-y-4">
                    <div className="bg-background p-4 rounded-lg border border-border">
                      <div className="font-medium text-text-primary mb-1">Product Agent</div>
                      <p className="text-text-secondary text-sm">Designing your product roadmap and features</p>
                      <div className="mt-3 w-full bg-background rounded-full h-2">
                        <div className="bg-success h-2 rounded-full" style={{ width: "75%" }}></div>
                      </div>
                      <p className="text-text-muted text-xs mt-2">75% complete</p>
                    </div>

                    <div className="bg-background p-4 rounded-lg border border-border">
                      <div className="font-medium text-text-primary mb-1">Marketing Agent</div>
                      <p className="text-text-secondary text-sm">Creating your GTM strategy and brand narrative</p>
                      <div className="mt-3 w-full bg-background rounded-full h-2">
                        <div className="bg-success h-2 rounded-full" style={{ width: "50%" }}></div>
                      </div>
                      <p className="text-text-muted text-xs mt-2">50% complete</p>
                    </div>

                    <div className="bg-background p-4 rounded-lg border border-border">
                      <div className="font-medium text-text-primary mb-1">Finance Agent</div>
                      <p className="text-text-secondary text-sm">Building financial projections and pitch deck</p>
                      <div className="mt-3 w-full bg-background rounded-full h-2">
                        <div className="bg-accent h-2 rounded-full" style={{ width: "30%" }}></div>
                      </div>
                      <p className="text-text-muted text-xs mt-2">30% complete</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "deliverables" && (
                <div>
                  <p className="text-text-secondary mb-6">Generated startup assets ready for download</p>
                  <div className="space-y-3 mb-6">
                    {[
                      "Business Plan",
                      "Pitch Deck",
                      "Financial Projections",
                      "Brand Guidelines",
                      "Product Roadmap",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center justify-between bg-background p-4 rounded-lg border border-border"
                      >
                        <span className="text-text-primary font-medium">{item}</span>
                        <button className="text-accent hover:text-accent-hover text-sm font-medium">Download</button>
                      </div>
                    ))}
                  </div>
                  <div className="bg-background p-4 rounded-lg border border-border">
                    <p className="text-text-primary font-medium mb-2">Download Complete Bundle</p>
                    <p className="text-text-secondary text-sm mb-4">Get all assets in a single .zip file</p>
                    <button className="btn-primary inline-flex items-center gap-2">
                      <Download className="w-5 h-5" />
                      Download Bundle (15.2MB)
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div>
                  <p className="text-text-secondary mb-4">Workspace settings and permissions</p>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-text-primary font-medium mb-2">Workspace Privacy</label>
                      <select className="input-field">
                        <option>Private (Only you)</option>
                        <option>Shared (Team members)</option>
                        <option>Public</option>
                      </select>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <button className="text-error hover:text-error/80">Delete Workspace</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
