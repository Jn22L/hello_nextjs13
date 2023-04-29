import Link from "next/link";

export default function SignUp() {
  return (
    <div className="p-20">
      <h4>회원가입</h4>
      <form action="/api/post/signup" method="POST">
        <input name="user_id" placeholder="아이디"></input>
        <input name="user_name" placeholder="이름"></input>
        <input name="user_password" placeholder="패스워드"></input>
        <button type="submit">버튼</button>
      </form>
    </div>
  );
}
