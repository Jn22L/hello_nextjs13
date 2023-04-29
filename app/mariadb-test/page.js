import queryPromise from "@/lib/mariadb.js";

export default async function Home() {
  let queryString = "SELECT * FROM HJ_BOARD";
  let rows;
  try {
    rows = await queryPromise(queryString);
  } catch (error) {
    console.error(error);
  }

  return (
    <div>
      <h1>mysql2-test</h1>
      <div>{rows && rows.map((row, idx) => <div>{row.CONTENT}</div>)}</div>
    </div>
  );
}
