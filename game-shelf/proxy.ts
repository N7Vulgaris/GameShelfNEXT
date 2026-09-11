import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/auth/auth";

export default async function Proxy(request: NextRequest) {
  const session = await getSession();

  const isQuizPage = request.nextUrl.pathname.startsWith("/quiz");
  const isManagePage = request.nextUrl.pathname.startsWith("/management");

  if (isQuizPage && !session?.user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isManagePage && !(session?.user.role === "admin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
