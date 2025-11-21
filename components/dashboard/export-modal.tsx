"use client"

import { useState } from "react"
import { Download, X } from "lucide-react"

interface ExportModalProps {
  isOpen: boolean
  onClose: () => void
  workspaceId: string
  workspaceName: string
}

export default function ExportModal({ isOpen, onClose, workspaceId, workspaceName }: ExportModalProps) {
  const [format, setFormat] = useState<"zip" | "pdf">("zip")
  const [isGenerating, setIsGenerating] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)

  const handleExport = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch("/api/bundle/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workspaceId, format }),
      })

      const data = await response.json()
      setDownloadUrl(data.downloadUrl)
    } catch (error) {
      console.error("Export failed:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-surface border border-border rounded-lg max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-text-primary">Export Workspace</h2>
          <button onClick={onClose} className="text-text-muted hover:text-text-primary">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">Format</label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  value="zip"
                  checked={format === "zip"}
                  onChange={(e) => setFormat(e.target.value as "zip")}
                  className="w-4 h-4"
                />
                <span className="text-text-primary">Complete Bundle (ZIP)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  value="pdf"
                  checked={format === "pdf"}
                  onChange={(e) => setFormat(e.target.value as "pdf")}
                  className="w-4 h-4"
                />
                <span className="text-text-primary">PDF Report</span>
              </label>
            </div>
          </div>

          {downloadUrl && (
            <div className="bg-background p-4 rounded-lg border border-border">
              <p className="text-sm text-text-secondary mb-3">Your export is ready!</p>
              <a href={downloadUrl} className="btn-primary w-full inline-flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Download Now
              </a>
            </div>
          )}

          <div className="flex gap-2">
            {!downloadUrl && (
              <button onClick={handleExport} disabled={isGenerating} className="btn-primary flex-1">
                {isGenerating ? "Generating..." : "Generate Export"}
              </button>
            )}
            <button onClick={onClose} className="btn-secondary flex-1">
              {downloadUrl ? "Close" : "Cancel"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
