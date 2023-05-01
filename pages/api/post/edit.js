import { connectDB } from "@/lib/mongodb.js";
import { ObjectId } from "mongodb";
import { authOptions } from "/pages/api/auth/[...nextauth].js";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
  let session = await getServerSession(req, res, authOptions);

  console.log(req.body);

  if (session !== null) {
    if (session.user.email !== req.body.author) {
      return res.status(500).json("자신의 글만 수정가능 합니다.");
    }
  } else {
    return res.status(500).json("로그인 사용자가 아닙니다.");
  }

  if (req.method == "POST") {
    if (req.body.title === "") {
      return res.status(500).json("제목을 입력해 주세요.");
    }
    if (req.body.content === "") {
      return res.status(500).json("내용을 입력해 주세요.");
    }
    try {
      const db = (await connectDB).db("forum");
      let result = await db.collection("post").updateOne(
        {
          _id: new ObjectId(req.body._id),
        },
        {
          $set: {
            title: req.body.title,
            content: req.body.content,
          },
        }
      );
      console.log("DB정상수정결과:", result);
      return res.redirect(302, "/mongodb-list");
    } catch (error) {
      console.log("DB수정에러", error);
      return res.status(500).json(error);
    }
  } else {
    return res.status(200).redirect("/mongodb-list");
  }
}
