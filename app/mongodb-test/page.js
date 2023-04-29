import { connectDB } from "@/lib/mongodb";
export default async function Home() {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray();
  return <div>{result[0].title}</div>;
}
