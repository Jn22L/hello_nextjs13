import { connectDB } from "@/lib/mongodb.js";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
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
