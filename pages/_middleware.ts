import {NextRequest, NextResponse} from 'next/server';

const Routes = ['/', '/library', '/playlist']

export function middleware(req: NextRequest) {

  if (Routes.find(route => route === req.nextUrl.pathname)) {
    const token = req.cookies.TRAX_ACCESS_TOKEN
    if (!token) return NextResponse.redirect('/signin')
  }
}
