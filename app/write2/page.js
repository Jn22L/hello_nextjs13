import { connectDB } from "@/lib/mongodb.js";
import { revalidatePath } from "next/cache";

export default async function Write2() {
  //DB에서 데이터 뽑아서 보여주기
  const db = (await connectDB).db("forum");
  let result = await db.collection("post_test").find().toArray();

  async function handleSubmit(formData) {
    "use server";
    const db = (await connectDB).db("forum");
    await db.collection("post_test").insertOne({ title: formData.get("post1") });
    revalidatePath("/write2");
  }

  return (
    <form action={handleSubmit}>
      <input type="text" name="post1" />
      <button type="submit">Submit</button>
      {result ? result.map((a) => <p>글제목 : {a.title}</p>) : null}
    </form>
  );
}
