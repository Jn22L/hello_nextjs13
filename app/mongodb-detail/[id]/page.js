import { connectDB } from "@/lib/mongodb.js";
import { ObjectId } from "mongodb";
import Comment from "./Comment";

export default async function Detail({ params, searchParams }) {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").findOne({ _id: new ObjectId(params.id) });
  let comments = await db
    .collection("comment")
    .find({ parentId: new ObjectId(params.id) })
    .toArray();

  return (
    <div>
      <h4>상세페이지임</h4>
      <h4>{result.title}</h4>
      <p>{result.content}</p>
      <Comment parentId={params.id} comments={comments} />
    </div>
  );
}
