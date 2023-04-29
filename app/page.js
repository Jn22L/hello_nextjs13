import Link from "next/link";

export default async function Home() {
  return (
    <div>
      <h1>Next.js 13 공부 메인페이지</h1>
      <Link href="/mongodb-list">
        <h4>MongoDB 글목록 보기</h4>
      </Link>
    </div>
  );
}
