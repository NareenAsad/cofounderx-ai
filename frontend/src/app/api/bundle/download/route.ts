import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { workspaceId, format = "zip" } = body

    // In production, this would:
    // 1. Call FastAPI to generate bundle
    // 2. Stream file download
    // const response = await fetch('http://localhost:8000/api/bundle/generate', {
    //   method: 'POST',
    //   body: JSON.stringify({ workspaceId })
    // })

    const bundle = {
      id: Math.random().toString(36).substr(2, 9),
      workspaceId,
      format,
      size: "15.2MB",
      createdAt: new Date().toISOString(),
      downloadUrl: `/downloads/startup-bundle-${workspaceId}.${format}`,
      contents: [
        "business_plan.pdf",
        "pitch_deck.pptx",
        "financial_projections.xlsx",
        "brand_guidelines.pdf",
        "product_roadmap.json",
        "marketing_strategy.md",
      ],
    }

    return NextResponse.json(bundle)
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate bundle" }, { status: 400 })
  }
}
