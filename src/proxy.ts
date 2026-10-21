import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 1. Identify protected routes
  const isAdminRoute = pathname.startsWith('/admin') && pathname !== '/admin/login';
  const isProtectedApi = pathname.startsWith('/api/projects') && request.method !== 'GET';

  // 2. If it's not a protected route, let the request pass immediately
  if (!isAdminRoute && !isProtectedApi) {
    return NextResponse.next();
  }

  // 3. Check for the secure session cookie
  const sessionCookie = request.cookies.get('fw_admin_session')?.value;
  const isValidSession = sessionCookie === process.env.ADMIN_TOKEN;

  // 4. Handle Unauthorized Access
  if (!isValidSession) {
    if (isProtectedApi) {
      // Block API writes
      return NextResponse.json({ error: 'SYS_ERR // UNAUTHORIZED' }, { status: 401 });
    } else {
      // Redirect page requests to the login terminal
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // 5. Access Granted
  return NextResponse.next();
}

// Optimize middleware to only run on specific paths
export const config = {
  matcher: ['/admin/:path*', '/api/projects/:path*'],
};