import { Zap } from "lucide-react"

interface AgentCardProps {
  name: string
  status: "active" | "idle" | "complete"
  progress: number
  currentTask: string
}

export default function AgentCard({ name, status, progress, currentTask }: AgentCardProps) {
  const statusConfig = {
    active: { bg: "bg-success/20", text: "text-success", label: "Active" },
    idle: { bg: "bg-text-muted/20", text: "text-text-muted", label: "Idle" },
    complete: { bg: "bg-accent/20", text: "text-accent", label: "Complete" },
  }

  const config = statusConfig[status]

  return (
    <div className="bg-background p-4 rounded-lg border border-border">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-accent" />
          <p className="font-medium text-text-primary">{name}</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded ${config.bg} ${config.text}`}>{config.label}</span>
      </div>

      <p className="text-sm text-text-secondary mb-3">{currentTask}</p>

      <div className="w-full bg-background rounded-full h-2 border border-border">
        <div className="bg-accent h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="text-text-muted text-xs mt-2">{progress}% complete</p>
    </div>
  )
}
