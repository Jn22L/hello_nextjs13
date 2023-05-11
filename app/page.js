import Link from "next/link";
import { cookies } from "next/headers";

export default async function Home() {
  let test2 = cookies().get("my");
  console.log("쿠키", test2);

  return (
    <div>
      <h4>home</h4>
    </div>
  );
}
