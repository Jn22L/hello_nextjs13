import { connectDB } from "../lib/mongodb.js";
export default async function List() {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray();
  return (
    <div className="list-bg">
      {result.map((rows) => {
        return (
          <div className="list-item">
            <h4>{rows.title}</h4>
            <p>{rows.content}</p>
          </div>
        );
      })}
    </div>
  );
}
