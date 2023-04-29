"use client";

import { useRouter, usePathname, useSearchParams, useParams } from "next/navigation";

export default function DetailLink(props) {
  let router = useRouter(); // client component 에서만 사용가능
  // 아래 기능도 있음 - 나중에 알아보자
  let a = usePathname();
  let b = useSearchParams();
  let c = useParams();
  console.log(c);
  return (
    <button
      onClick={() => {
        // router.back(); // 뒤로가기
        // router.forward(); // 앞으로가기
        // router.refresh(); // 새로고침
        // router.prefetch(props.url); // 미리 가져오기? 빠르게 가져올 수 있다고 하는데 나중에 알아보자 ???
        router.push(props.url);
      }}
    >
      버튼
    </button>
  );
}
