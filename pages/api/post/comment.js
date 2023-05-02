import { connectDB } from "@/lib/mongodb.js";
import { authOptions } from "/pages/api/auth/[...nextauth].js";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
  let session = await getServerSession(req, res, authOptions);
  console.log("댓글 api session:", session);
  console.log("댓글 api body:", JSON.parse(req.body));
  let param = JSON.parse(req.body);

  if (req.method == "POST") {
    if (param.comment === "") {
      return res.status(500).json("댓글을 입력해 주세요.");
    }
    if (session !== null) {
      param.author = session.user.email;
      console.log("댓글 2222 :", param);
    }
    try {
      const db = (await connectDB).db("forum");
      let result = await db.collection("comment").insertOne(param);
      return res.status(200).json("댓글입력완료.");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(200).redirect("/mongodb-list");
  }
}
