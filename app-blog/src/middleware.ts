import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Если нет сессии и пользователь зашёл в /admin → редиректим на /auth
  if (!session && req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/auth", req.url))
  }

  return res
}

// Middleware срабатывает только для админки
export const config = {
  matcher: ["/admin/:path*"],
}
