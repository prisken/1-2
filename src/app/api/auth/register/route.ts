import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email, password, firstName, lastName, phone } = await req.json()
    
    // For now, return a simple response
    // In a real app, you would create a new user in your database
    return NextResponse.json({
      success: false,
      message: 'Registration not implemented yet'
    }, { status: 501 })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Invalid request'
    }, { status: 400 })
  }
}
