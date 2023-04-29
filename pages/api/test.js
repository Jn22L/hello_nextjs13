export default function handler(req, res) {
  console.log("오 잘되네222", req);
  return res.status(200).json("처리완료");
  //return new Response("Hello, Next.js!");
}
