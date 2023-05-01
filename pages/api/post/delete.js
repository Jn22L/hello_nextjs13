import { connectDB } from "@/lib/mongodb.js";
import { ObjectId } from "mongodb";
import { authOptions } from "/pages/api/auth/[...nextauth].js";
import { getServerSession } from "next-auth";
export default async function handler(req, res) {
  let session = await getServerSession(req, res, authOptions);
  let param = JSON.parse(req.body);
  let author = param.author === undefined ? "" : param.author;
  console.log("세션:", session);
  console.log("삭제파람 param:", param);
  console.log("삭제 author author:", author);
  if (session !== null) {
    if (session.user.email !== author) {
      console.log("자신의 글만 삭제가능 합니다");
      return res.status(200).json({ resTitle: "삭제권한없음", resMsg: "자신의 글만 삭제가능 합니다." });
    }
  } else {
    return res.status(200).json({ resTitle: "로그인사용자가아님", resMsg: "자신의 글만 삭제가능 합니다." });
  }

  if (req.method === "DELETE") {
    console.log("2 api/delete = ", JSON.parse(req.body)._id);
    try {
      const db = (await connectDB).db("forum");
      let result = await db.collection("post").deleteOne({
        _id: new ObjectId(JSON.parse(req.body)._id),
      });
      console.log("DB정상수정결과:", result);
      //return res.redirect(302, "/mongodb-list");
      return res.status(200).json({ resTitle: "OK", resMsg: "삭제완료 하였습니다." });
    } catch (error) {
      console.log("DB수정에러", error);
      return res.status(500).json(error);
    }
  } else {
    return res.status(200).redirect("/mongodb-list");
  }
}
