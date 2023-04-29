import { connectDB } from "../../lib/mongodb.js";
import { ObjectId } from "mongodb";

export default async function Detail({ params, searchParams }) {
  let _id = params.id;
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").findOne({ _id: new ObjectId(_id) });
  console.log("props", params, searchParams);
  return (
    <div>
      <h4>상세페이지임</h4>
      <h4>{result.title}</h4>
      <p>{result.content}</p>
    </div>
  );
}
