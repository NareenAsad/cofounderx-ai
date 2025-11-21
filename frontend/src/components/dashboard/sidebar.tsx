"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Zap, Users, Settings, LogOut } from "lucide-react"

export default function Sidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <aside className="w-64 bg-surface border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white font-bold">C</div>
          <span className="font-bold text-lg text-text-primary">CoFounderX</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <NavLink href="/dashboard" icon={Home} label="Dashboard" active={isActive("/dashboard")} />
        <NavLink href="/dashboard/workspace" icon={Zap} label="New Workspace" active={false} />
        <NavLink
          href="/dashboard/collaboration"
          icon={Users}
          label="Live Collaboration"
          active={isActive("/dashboard/collaboration")}
        />
        <NavLink
          href="/dashboard/branding"
          icon={Settings}
          label="Branding Kit"
          active={isActive("/dashboard/branding")}
        />
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-border">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-hover transition-colors text-text-secondary hover:text-text-primary">
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  )
}

function NavLink({ href, icon: Icon, label, active }: any) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
        active ? "bg-accent text-white" : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </Link>
  )
}
