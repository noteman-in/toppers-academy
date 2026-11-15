import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Keep this line for the logic inside the function
  const secretPath = process.env.NEXT_PUBLIC_ADMIN_PATH || 'ops-master-2026';

  // 1. Block default /admin
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    return new NextResponse('Not Found', { status: 404 });
  }

  // 2. Rewrite the secret URL to /admin
  if (pathname.startsWith(`/${secretPath}`)) {
    const newPath = pathname.replace(`/${secretPath}`, '/admin');
    
    // PRESERVE THE QUERY STRING (e.g., ?q=sarthak)
    const searchParams = request.nextUrl.search;
    const rewriteUrl = new URL(newPath + searchParams, request.url);

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-original-path', pathname);
    requestHeaders.set('x-is-login-page', pathname.includes('/login') ? 'true' : 'false');

    return NextResponse.rewrite(rewriteUrl, {
      request: { headers: requestHeaders }
    });
  }

  return NextResponse.next();
}

export const config = {
  // Matcher MUST be static strings. 
  // If you change NEXT_PUBLIC_ADMIN_PATH in .env, you MUST change it here too.
  matcher: ['/admin/:path*', '/ops-master-2026/:path*'],
};