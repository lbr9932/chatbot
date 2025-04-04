import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Assistant } from "@/constants/assistant";
import { match } from "path-to-regexp";

// import { getSession } from '@/serverActions/auth'
// import { authorizeUser } from "@/serverActions/user";

const matchersForAuth = ["/myaccount/:path", "/users/:path"];
const matchersForSignIn = ["/signup/:path", "/signin/:path"];

export async function middleware(request: NextRequest) {
  const { threadId = undefined } = JSON.parse(
    request.cookies.get("assistant")?.value || "{}"
  ) as Assistant;

  const response = NextResponse.next();
  response.cookies.set("visited", "true");

  if (isMatch(request.nextUrl.pathname, matchersForAuth)) {
    return threadId
      ? response
      : NextResponse.redirect(new URL("/chat", request.url));
    /*  return (await authorizeUser()) // 세션 정보 확인
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/signin", request.url)); */
  }
  if (isMatch(request.nextUrl.pathname, matchersForSignIn)) {
    /*  return (await authorizeUser()) // 세션 정보 확인
      ? NextResponse.redirect(new URL("/", request.url))
      : NextResponse.next(); */
  }
  return response;
}

function isMatch(pathname: string, urls: string[]) {
  return urls.some((url) => !!match(url)(pathname));
}
