import Link from "next/link.js";
import { connectDB } from "@/lib/mongodb.js";
import DetailLink from "./DetailLink";
import ListItem from "./ListItem";
import dayjs from "dayjs";

import { authOptions } from "/pages/api/auth/[...nextauth].js";
import { getServerSession } from "next-auth";

//export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function List() {
  let session = await getServerSession(authOptions);
  let yesterdayYYYYMMDD = dayjs().subtract(1, "day").format("YYYYMMDD");

  const db = (await connectDB).db("forum");
  let result = await db
    .collection("post")
    .find({ $or: [{ complete: "N" }, { complete: { $gte: yesterdayYYYYMMDD } }] }) // 미완료 or 어제완료한것
    .toArray();

  return (
    <div>
      <ListItem result={result} session={session} />
    </div>
  );
}
