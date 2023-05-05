import Link from "next/link.js";
import { connectDB } from "@/lib/mongodb.js";
import DetailLink from "./DetailLink";
import ListItem from "./ListItem";

import { authOptions } from "/pages/api/auth/[...nextauth].js";
import { getServerSession } from "next-auth";

//export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function List() {
  let session = await getServerSession(authOptions);
  console.log("list세션:", session);

  const db = (await connectDB).db("forum");
  //await db.collection("post").getPlanCache().clear(); // Removes all cached query plans // 에러남
  let result = await db.collection("post").find().toArray();

  console.log(result);

  return (
    <div>
      <ListItem result={result} session={session} />
    </div>
  );
}
