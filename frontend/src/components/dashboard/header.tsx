"use client"

import { Bell, Search, User } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-surface border-b border-border">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input type="text" placeholder="Search workspaces..." className="input-field pl-10" />
          </div>
        </div>

        <div className="flex items-center gap-4 ml-6">
          <button className="p-2 hover:bg-surface-hover rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-text-muted" />
          </button>
          <button className="p-2 hover:bg-surface-hover rounded-lg transition-colors">
            <User className="w-5 h-5 text-text-muted" />
          </button>
        </div>
      </div>
    </header>
  )
}
