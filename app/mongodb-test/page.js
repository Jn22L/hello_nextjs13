import { connectDB } from "../lib/mongodb.js";
export default async function Home() {
  let client = await connectDB;
  const db = client.db("forum");
  let result = await db.collection("post").find().toArray();
  return <div>{result[1].title}</div>;
}
