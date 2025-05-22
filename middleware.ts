import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PROTECTED_ROUTES = ['/dashboard','/leaderboard']
const PUBLIC_ROUTES_FOR_AUTHED_USERS = ['/', '/login', '/signup']

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const token = request.cookies.get('token')?.value

  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  // Function to check if the user is authenticated
  const isAuthenticated = async () => {
    if (!token) return false
    try {
      const res = await fetch(`${apiUrl}/isAuthenticated`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': `token=${token}`,
        },
      })
      return res.ok
    } catch {
      return false
    }
  }

  const pathname = url.pathname

  // 1. Redirect to /login if trying to access protected route and not authenticated
  if (PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
    const authed = await isAuthenticated()
    if (!authed) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // 2. Redirect to /dashboard if authenticated and accessing public routes like / or /login
  if (PUBLIC_ROUTES_FOR_AUTHED_USERS.includes(pathname)) {
    const authed = await isAuthenticated()
    if (authed) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/login','/dashboard/:path*','/leaderboard/:path*'],
}
