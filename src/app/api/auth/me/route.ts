import { NextResponse } from 'next/server'

export async function GET() {
  // For now, return a simple response indicating no user is logged in
  // This prevents the 404 error that was causing the application to crash
  return NextResponse.json({
    user: null,
    message: 'No user logged in'
  })
}
