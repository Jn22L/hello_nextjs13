import queryPromise from "../lib/db.js";

export default async function List() {
  let queryString = "SELECT * FROM HJ_BOARD";
  let rows;
  try {
    rows = await queryPromise(queryString);
  } catch (error) {
    console.error(error);
  }

  console.log("디비결과rows", rows);

  return (
    <div>
      <h1>리스트 페이지</h1>
      <div>
        {rows.map((row, idx) => (
          <div>{row.CONTENT}</div>
        ))}
      </div>
    </div>
  );
}
