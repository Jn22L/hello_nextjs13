import Link from "next/link.js";
import { connectDB } from "@/lib/mongodb.js";
export default async function List() {
  const db = (await connectDB).db("forum");
  let result = await db.collection("members").find().toArray();
  return (
    <div className="list-bg">
      {result.map((row, idx) => (
        <div className="list-item" key={idx}>
          <h4>{row.user_id}</h4>
          <h4>{row.user_name}</h4>
        </div>
      ))}
    </div>
  );
}
