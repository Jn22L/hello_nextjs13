import { connectDB } from "@/lib/mongodb.js";
import { ObjectId } from "mongodb";
export default async function handler(req, res) {
  console.log("1 api/delete = ", req.body);
  if (req.method === "DELETE") {
    console.log("2 api/delete = ", JSON.parse(req.body)._id);
    try {
      const db = (await connectDB).db("forum");
      let result = await db.collection("post").deleteOne({
        _id: new ObjectId(JSON.parse(req.body)._id),
      });
      console.log("DB정상수정결과:", result);
      //return res.redirect(302, "/mongodb-list");
      return res.status(200).json("삭제완료");
    } catch (error) {
      console.log("DB수정에러", error);
      return res.status(500).json(error);
    }
  } else {
    return res.status(200).redirect("/mongodb-list");
  }
}
