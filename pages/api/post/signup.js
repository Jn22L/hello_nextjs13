import { connectDB } from "@/lib/mongodb.js";

export default async function handler(req, res) {
  if (req.method == "POST") {
    if (req.body.user_id === "") {
      return res.status(500).json("닉네임을 입력해 주세요.");
    }
    if (req.body.user_name === "") {
      return res.status(500).json("이름을 입력해 주세요.");
    }
    if (req.body.user_password === "") {
      return res.status(500).json("암호를 입력해 주세요.");
    }
    try {
      const db = (await connectDB).db("forum");
      let userCount = await db.collection("members").find({ user_id: req.body.user_id }).count();
      if (userCount !== 0) {
        return res.status(500).json(`${req.body.user_id} 은/는 이미사용중 입니다. 다른닉네임을 입력해 주세요`);
      }
      let result = await db.collection("members").insertOne(req.body);
      return res.redirect(302, "/mongodb-memberlist");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(200).redirect("/mongodb-memberlist");
  }
}
