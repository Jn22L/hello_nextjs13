import { connectDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(요청, 응답) {
  const db = (await connectDB).db("forum");
  console.log("api 요청:", 요청.query.parentId);
  let result = await db
    .collection("comment")
    .find({ parentId: new ObjectId(요청.query.parentId) })
    .toArray();
  console.log("api 결과", result);
  응답.status(200).json(result);
}
