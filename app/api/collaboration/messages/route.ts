import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const messages = [
      {
        id: "1",
        agent: "Product Agent",
        content: "Analyzing market demand...",
        timestamp: new Date(Date.now() - 2 * 60000).toISOString(),
      },
      {
        id: "2",
        agent: "Marketing Agent",
        content: "Researching competitors...",
        timestamp: new Date(Date.now() - 60000).toISOString(),
      },
    ]

    return NextResponse.json(messages)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const message = {
      id: Math.random().toString(36).substr(2, 9),
      ...body,
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json(message, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to send message" }, { status: 400 })
  }
}
