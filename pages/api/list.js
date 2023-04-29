import { connectDB } from "@/lib/mongodb.js";

export default async function handler(req, res) {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray();
  if (req.method === "GET") {
    console.log(result);
    return res.status(200).json(result);
  } else if (req.method === "POST") {
    console.log("POST 요청");
  }
  return res.status(200).json("처리완료");
  //return new Response("Hello, Next.js!");
}
