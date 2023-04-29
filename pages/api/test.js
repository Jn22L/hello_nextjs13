export default function handler(요청, 응답) {
  console.log("오 잘되네222");
  return 응답.status(200).json("처리완료");
  //return new Response("Hello, Next.js!");
}
