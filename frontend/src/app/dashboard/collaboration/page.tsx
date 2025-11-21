"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Send, Zap, Users } from "lucide-react"
import Sidebar from "@/components/dashboard/sidebar"
import Header from "@/components/dashboard/header"

interface Message {
  id: string
  agent: string
  content: string
  timestamp: string
  type: "message" | "update"
  isStreaming?: boolean
}

interface AgentStatus {
  name: string
  status: "active" | "idle" | "complete"
  progress: number
  currentTask: string
}

export default function Collaboration() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      agent: "Product Agent",
      content: "Analyzing market demand for personalized learning platforms...",
      timestamp: "2 minutes ago",
      type: "update",
    },
    {
      id: "2",
      agent: "Marketing Agent",
      content: "Identified key competitors: Duolingo, Khan Academy, Coursera. Researching differentiation strategies.",
      timestamp: "1 minute ago",
      type: "message",
    },
    {
      id: "3",
      agent: "Finance Agent",
      content: "Building financial model based on SaaS metrics. Preliminary runway: 24 months.",
      timestamp: "Just now",
      type: "update",
      isStreaming: true,
    },
  ])

  const [agents, setAgents] = useState<AgentStatus[]>([
    { name: "Product Agent", status: "active", progress: 75, currentTask: "Roadmap creation" },
    { name: "Marketing Agent", status: "active", progress: 50, currentTask: "GTM strategy" },
    { name: "Finance Agent", status: "active", progress: 30, currentTask: "Financial projections" },
  ])

  const [inputValue, setInputValue] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      agent: "You",
      content: inputValue,
      timestamp: "Just now",
      type: "message",
    }

    setMessages([...messages, newMessage])
    setInputValue("")
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 flex overflow-hidden">
          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-auto">
              <div className="max-w-3xl mx-auto px-6 py-8">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 text-accent hover:text-accent-hover mb-4"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Link>

                <h1 className="text-3xl font-bold text-text-primary mb-2">Live Collaboration</h1>
                <p className="text-text-secondary mb-8">Watch your AI co-founders work on EdTech Platform</p>

                {/* Messages */}
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-4 ${msg.type === "message" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.type === "update" && (
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                            <Zap className="w-5 h-5 text-accent" />
                          </div>
                        </div>
                      )}

                      <div
                        className={`max-w-md ${msg.type === "message" ? "bg-accent text-white" : "bg-surface text-text-primary"} rounded-lg p-4`}
                      >
                        {msg.type === "update" && <p className="text-sm font-medium mb-2">{msg.agent}</p>}
                        <p className="text-sm">{msg.content}</p>
                        {msg.isStreaming && <span className="inline-block ml-2 animate-pulse">▌</span>}
                        <p className={`text-xs mt-2 ${msg.type === "message" ? "text-white/70" : "text-text-muted"}`}>
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="border-t border-border bg-surface">
              <div className="max-w-3xl mx-auto px-6 py-4">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Send a message to your AI co-founders..."
                    className="input-field flex-1"
                  />
                  <button type="submit" className="btn-primary">
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Sidebar - Agent Status */}
          <div className="w-80 border-l border-border bg-surface overflow-auto">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Users className="w-5 h-5 text-accent" />
                <h2 className="text-lg font-semibold text-text-primary">AI Agents</h2>
              </div>

              <div className="space-y-4">
                {agents.map((agent) => (
                  <div key={agent.name} className="bg-background p-4 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-text-primary">{agent.name}</p>
                      <span
                        className={`text-xs px-2 py-1 rounded ${agent.status === "active"
                          ? "bg-success/20 text-success"
                          : agent.status === "complete"
                            ? "bg-accent/20 text-accent"
                            : "bg-text-muted/20 text-text-muted"
                          }`}
                      >
                        {agent.status}
                      </span>
                    </div>

                    <p className="text-sm text-text-secondary mb-3">{agent.currentTask}</p>

                    <div className="w-full bg-background rounded-full h-2 border border-border">
                      <div
                        className="bg-accent h-2 rounded-full transition-all duration-300"
                        style={{ width: `${agent.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-text-muted text-xs mt-2">{agent.progress}% complete</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
