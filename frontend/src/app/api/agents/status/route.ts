import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request: Request) {
  const workspaceId = new URL(request.url).searchParams.get("workspaceId");

  try {
    const res = await fetch(`${API_URL}/generate?workspaceId=${workspaceId}`);
    if (!res.ok) throw new Error("Failed to fetch agent status");
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch agent status" }, { status: 500 });
  }
}
