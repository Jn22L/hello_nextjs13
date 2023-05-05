import { connectDB } from "@/lib/mongodb.js";
import { ObjectId } from "mongodb";
import { authOptions } from "/pages/api/auth/[...nextauth].js";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
  let session = await getServerSession(req, res, authOptions);

  console.log(req.body);

  if (req.method == "POST") {
    let param = JSON.parse(req.body);
    console.log(param);
    try {
      const db = (await connectDB).db("forum");
      let result = await db.collection("post").updateOne(
        {
          _id: new ObjectId(param._id),
        },
        {
          $set: {
            complete: param.complete,
          },
        }
      );
      console.log("DB정상수정결과:", result);
      return res.status(200).json({ resMsg: "체크완료" });
    } catch (error) {
      console.log("DB수정에러", error);
      return res.status(500).json({ resMsg: "수정실패" });
    }
  } else {
    return res.status(200).redirect("/mongodb-list");
  }
}
