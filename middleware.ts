import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { getSession } from '@/lib/session';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // Define protected route patterns
  const protectedRoutes = ['/dashboard', '/urls', '/profile'];
  const authRoutes = ['/auth/signin', '/auth/signup', '/auth/forgot-password', '/auth/reset-password', 'auth/signup-success'];

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  // Check if the current path is an auth route
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Skip middleware for static files, API routes, and public assets
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.startsWith('/favicon.ico') || pathname.includes('.')) {
    return NextResponse.next();
  }

  try {
    // Get session using better-auth
    const session = await getSession();

    const isAuthenticated = !!session?.id;

    // If user is authenticated and trying to access auth routes, redirect to dashboard
    if (isAuthenticated && isAuthRoute) {
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    }

    // If user is not authenticated and trying to access protected routes, redirect to signin
    if (!isAuthenticated && isProtectedRoute) {
      url.pathname = '/auth/signin';
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }

    // Allow the request to continue
    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);

    // On error, if trying to access protected route, redirect to signin
    if (isProtectedRoute) {
      url.pathname = '/auth/signin';
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }

    // For non-protected routes, allow to continue
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
