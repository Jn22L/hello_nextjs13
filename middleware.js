import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  // console.log("미들웨어:nextUrl =====>", req.nextUrl);
  // console.log("미들웨어:cookies =====>", req.cookies);
  // console.log("미들웨어:headers =====>", req.headers);
  // console.log(req.nextUrl.pathname);

  // JWT 방식일때만 getToken 가능
  // .env 파일에 NEXTAUTH_SECRET 설정이 있어야 함
  const session = await getToken({ req: req });
  if (req.nextUrl.pathname.startsWith("/mongodb-write")) {
    if (session === null) {
      return NextResponse.redirect(new URL("http://localhost:3000/api/auth/signin"));
    }
  }

  console.log("세션정보 ==========>", session);

  //if (req.nextUrl.pathname === "/mongodb-list") {
  if (req.nextUrl.pathname.startsWith("/mongodb")) {
    console.log(new Date());
    console.log(req.headers.get("sec-ch-ua-platform"));
    return NextResponse.next();
  }

  req.cookies.get("쿠키이름"); //출력
  req.cookies.has("쿠키이름"); //존재확인
  req.cookies.delete("쿠키이름"); //삭제

  const response = NextResponse.next();
  response.cookies.set({
    name: "mode2",
    value: "dark",
    maxAge: 3600,
    httpOnly: true,
  });
  return response; //쿠키생성
}
