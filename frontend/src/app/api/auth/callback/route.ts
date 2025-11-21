import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  // Mock OAuth callback - in production would handle real auth
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")
  const state = searchParams.get("state")

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=no_code", request.url))
  }

  // In production: exchange code for token via FastAPI backend
  // const response = await fetch('http://localhost:8000/api/auth/callback', {
  //   method: 'POST',
  //   body: JSON.stringify({ code, state })
  // })

  return NextResponse.redirect(new URL("/dashboard", request.url))
}
