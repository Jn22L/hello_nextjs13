import Link from "next/link";
import { connectDB } from "@/lib/mongodb.js";
import { ObjectId } from "mongodb";

export default async function Edit({ params, searchParams }) {
  const db = (await connectDB).db("forum");
  console.log(params);
  let result = await db.collection("post").findOne({ _id: new ObjectId(params.id) });

  return (
    <div className="p-20">
      <h4>글수정</h4>
      <form action="/api/post/edit" method="POST">
        <input name="title" defaultValue={result.title}></input>
        <input name="content" defaultValue={result.content}></input>
        <input style={{ display: "none" }} name="_id" defaultValue={result._id.toString()}></input>
        <button type="submit">버튼</button>
      </form>
    </div>
  );
}
