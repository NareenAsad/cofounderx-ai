"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, MoreVertical, Play, Share2 } from "lucide-react"
import Sidebar from "@/components/dashboard/sidebar"
import Header from "@/components/dashboard/header"

interface Workspace {
  id: string
  name: string
  idea: string
  status: "draft" | "active" | "complete"
  lastModified: string
  collaborators: number
}

export default function Dashboard() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([
    {
      id: "1",
      name: "EdTech Platform",
      idea: "AI-powered personalized learning",
      status: "active",
      lastModified: "2 hours ago",
      collaborators: 3,
    },
    {
      id: "2",
      name: "FinTech MVP",
      idea: "Decentralized payment solution",
      status: "draft",
      lastModified: "1 day ago",
      collaborators: 2,
    },
    {
      id: "3",
      name: "HealthTech App",
      idea: "Mental health tracking platform",
      status: "complete",
      lastModified: "3 days ago",
      collaborators: 4,
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success/20 text-success border border-success/30"
      case "draft":
        return "bg-warning/20 text-warning border border-warning/30"
      case "complete":
        return "bg-accent/20 text-accent border border-accent/30"
      default:
        return "bg-surface text-text-secondary border border-border"
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-auto">
          <div className="max-w-6xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">Your Workspaces</h1>
                <p className="text-text-secondary">Manage and create your startup projects</p>
              </div>
              <Link href="/dashboard/workspace" className="btn-primary inline-flex items-center gap-2">
                <Plus className="w-5 h-5" />
                New Workspace
              </Link>
            </div>

            {/* Workspaces Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workspaces.map((workspace) => (
                <div key={workspace.id} className="card group hover:border-accent/50 transition-all cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-text-primary text-lg mb-1">{workspace.name}</h3>
                      <p className="text-text-secondary text-sm">{workspace.idea}</p>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="w-5 h-5 text-text-muted hover:text-text-primary" />
                    </button>
                  </div>

                  <div className="mb-4 pb-4 border-t border-border pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(workspace.status)}`}>
                        {workspace.status.charAt(0).toUpperCase() + workspace.status.slice(1)}
                      </span>
                      <span className="text-text-muted text-xs">{workspace.lastModified}</span>
                    </div>
                    <div className="flex items-center gap-2 text-text-secondary text-sm">
                      <div className="flex -space-x-2">
                        {Array.from({ length: workspace.collaborators }).map((_, i) => (
                          <div
                            key={i}
                            className="w-6 h-6 rounded-full bg-accent/20 border border-accent/50 flex items-center justify-center text-xs"
                          >
                            {String.fromCharCode(65 + i)}
                          </div>
                        ))}
                      </div>
                      <span>{workspace.collaborators} collaborators</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/dashboard/workspace/${workspace.id}`}
                      className="flex-1 btn-primary text-sm inline-flex items-center justify-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      Open
                    </Link>
                    <button className="btn-secondary text-sm px-3">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {workspaces.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-surface rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <Plus className="w-8 h-8 text-text-muted" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">No workspaces yet</h3>
                <p className="text-text-secondary mb-6">Create your first startup workspace to get started</p>
                <Link href="/dashboard/workspace" className="btn-primary inline-flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Create Workspace
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
