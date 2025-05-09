
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Handle language detection and route localization if needed
  return NextResponse.next();
}
