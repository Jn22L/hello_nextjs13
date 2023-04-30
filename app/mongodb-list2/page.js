import Link from "next/link.js";
import { connectDB } from "@/lib/mongodb.js";
import DetailLink from "./DetailLink";
import ListItem from "./ListItem";

//export const dynamic = "force-dynamic";
export const revalidate = 20; // 20초 캐싱 사용= 20초 전엔 동일한 캐시 데이타만 보임(서버자원 절약)

// 캐싱 관련 문법
// await fetch('/URL', {cache: 'force-cache'})    // 캐쉬사용 - 디폴트
// await fetch('/URL', {cache: 'no-store'})       // 캐쉬사용안함
// await fetch('/URL', {next: {revalidate: 60}} ) // 60초마다 캐싱된 데이터 갱신( = export const revalidate = 60;)

export default async function List() {
  const db = (await connectDB).db("forum");
  //await db.collection("post").getPlanCache().clear(); // Removes all cached query plans // 에러남
  let result = await db.collection("post").find().toArray();
  return (
    <div>
      <ListItem result={result} />
      {
        // 아래 부분을 ListItem 으로 분리 -> client component 로 만들고, 삭제시 사라지는 애니메이션 넣기 위해서
        // <div className="list-bg">
        //   {result.map((row, idx) => (
        //     <div className="list-item" key={idx}>
        //       {
        //         // Link 만 써도 next 내부적으로 prefetch 를 해온다.
        //         // 그런데 모든 글버튼에서 전부 prefetch 를 할 필요가 있을까?(성능이슈)
        //         // prefetch 를 끄고 싶으면 Link 태그에, prefetch={false} 를 써주면 된다.
        //       }
        //       <Link href={`/mongodb-detail/${row._id}`}>
        //         <h4>{row.title}</h4>
        //       </Link>
        //       <Link href={`/mongodb-edit/${row._id}`}>✏️</Link>
        //       {
        //         // DataLink 예제는 주석(client component 에서 useRouter 사용하여 이동해보기)
        //         // <DetailLink url={`/mongodb-detail/${row._id}`} />
        //       }
        //       <p>{row.content}</p>
        //     </div>
        //   ))}
        // </div>
      }
    </div>
  );
}
