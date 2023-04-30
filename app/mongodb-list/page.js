import Link from "next/link.js";
import { connectDB } from "@/lib/mongodb.js";
import DetailLink from "./DetailLink";
import ListItem from "./ListItem";
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
