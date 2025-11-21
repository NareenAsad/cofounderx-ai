import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  // Mock endpoint - connects to FastAPI backend
  try {
    const workspaces = [
      {
        id: "1",
        name: "EdTech Platform",
        idea: "AI-powered personalized learning",
        status: "active",
        createdAt: "2024-11-15",
      },
      {
        id: "2",
        name: "FinTech MVP",
        idea: "Decentralized payment solution",
        status: "draft",
        createdAt: "2024-11-10",
      },
    ]

    return NextResponse.json(workspaces)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch workspaces" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  // Create new workspace - calls FastAPI backend
  try {
    const body = await request.json()

    // In production, this would call your FastAPI backend:
    // const response = await fetch('http://localhost:8000/api/workspace', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(body)
    // })

    const newWorkspace = {
      id: Math.random().toString(36).substr(2, 9),
      ...body,
      status: "draft",
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json(newWorkspace, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create workspace" }, { status: 400 })
  }
}
