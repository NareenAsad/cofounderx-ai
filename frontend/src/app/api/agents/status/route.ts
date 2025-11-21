import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const workspaceId = request.nextUrl.searchParams.get("workspaceId")

  try {
    // In production, call FastAPI to get real agent status
    const agentStatus = {
      workspaceId,
      agents: [
        {
          name: "Product Agent",
          status: "active",
          progress: 75,
          currentTask: "Designing product roadmap",
          lastUpdate: new Date().toISOString(),
        },
        {
          name: "Marketing Agent",
          status: "active",
          progress: 50,
          currentTask: "Analyzing competitor strategies",
          lastUpdate: new Date().toISOString(),
        },
        {
          name: "Finance Agent",
          status: "active",
          progress: 30,
          currentTask: "Building financial models",
          lastUpdate: new Date().toISOString(),
        },
      ],
    }

    return NextResponse.json(agentStatus)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch agent status" }, { status: 500 })
  }
}
