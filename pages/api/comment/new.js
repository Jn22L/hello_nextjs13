import { connectDB } from "@/lib/mongodb.js";
import { authOptions } from "/pages/api/auth/[...nextauth].js";
import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  let session = await getServerSession(req, res, authOptions);
  let param = JSON.parse(req.body);

  if (req.method == "POST") {
    if (param.comment === "") {
      return res.status(500).json("댓글을 입력해 주세요.");
    }
    try {
      if (session !== null) {
        let comment = {
          author: session.user.email,
          content: param.comment,
          parentId: new ObjectId(param.parentId),
        };

        console.log("댓글 파라메터:", comment);

        const db = (await connectDB).db("forum");
        let result = await db.collection("comment").insertOne(comment);
        return res.status(200).json({ retMsg: "댓글 추가 완료" });
      } else {
        return res.status(500).json({ retMsg: "로그인이 필요한 서비스 입니다." });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(200).redirect("/mongodb-list");
  }
}
