import { connectDB } from "@/lib/mongodb.js";
import { authOptions } from "/pages/api/auth/[...nextauth].js";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
  let session = await getServerSession(req, res, authOptions);
  if (session !== null) {
    req.body.author = session.user.email;
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
      let result = await db.collection("post").insertOne(req.body);
      return res.redirect(302, "/mongodb-list");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(200).redirect("/mongodb-list");
  }
}
