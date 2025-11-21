import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const workspace = {
      id: params.id,
      name: "EdTech Platform",
      idea: "AI-powered personalized learning for K-12 students",
      status: "active",
      targetMarket: "K-12 educators and students",
      businessModel: "B2C SaaS",
      fundingGoal: "$500K",
      createdAt: "2024-11-15",
    }

    return NextResponse.json(workspace)
  } catch (error) {
    return NextResponse.json({ error: "Workspace not found" }, { status: 404 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    const updatedWorkspace = {
      id: params.id,
      ...body,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json(updatedWorkspace)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update workspace" }, { status: 400 })
  }
}
