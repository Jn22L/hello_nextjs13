import { connectDB } from "@/lib/mongodb.js";
import ListItem from "./ListItem";
import { authOptions } from "/pages/api/auth/[...nextauth].js";
import { getServerSession } from "next-auth";
import dayjs from "dayjs";

export const revalidate = 0;

export default async function List() {
  let session = await getServerSession(authOptions);
  let yesterdayYYYYMMDD = dayjs().subtract(1, "day").format("YYYYMMDD");

  const db = (await connectDB).db("forum");
  let result = await db
    .collection("post")
    .find({ $and: [{ complete: { $ne: "N" } }, { complete: { $lt: yesterdayYYYYMMDD } }] }) // 엊그제 완료건까지
    .toArray();

  return (
    <div>
      <ListItem result={result} session={session} />
    </div>
  );
}
