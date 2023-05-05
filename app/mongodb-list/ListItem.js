"use client";
import Link from "next/link.js";
import { fetchJson } from "@/util/nj-common";

export default function ListItem({ result, session }) {
  const spanStyle = { cursor: "pointer", display: "inline-block", width: "80%", textAlign: "right", }; // prettier-ignore

  console.log(result);

  result.complete === "Y" ? "#FFA500" : "white";

  function handleDelete(e, row) {
    fetchJson("/api/post/delete", { method: "DELETE", body: JSON.stringify({ _id: row._id, author: row.author ?? "" }) })
      .then((json) => {
        alert(json.resMsg);
        e.target.parentElement.style.opacity = 0;
        setTimeout(() => {
          e.target.parentElement.style.display = "none";
        }, 1000);
      })
      .catch((error) => {
        alert(JSON.parse(error.message).resMsg);
      });
  }

  function handleCompleteOnClick(e, row) {
    console.log(e.target.dataset.complete);
    let curBg = e.target.parentElement.style.background;

    if (e.target.dataset.complete === "N") {
      e.target.parentElement.style.background = "#FFA500";
      e.target.dataset.complete = "Y";
    } else {
      e.target.parentElement.style.background = "white";
      e.target.dataset.complete = "N";
    }
    //e.target.parentElement.style.background = curBg === "white" || curBg === "" ? "#FFA500" : "white";

    fetchJson("/api/post/complete", { method: "POST", cache: "no-store", body: JSON.stringify({ _id: row._id, complete: e.target.dataset.complete }) })
      .then((json) => {
        console.log("수정완료", json);
        alert(json.resMsg);
      })
      .catch((error) => {
        console.log("에러", json);
        alert(JSON.parse(error.message).resMsg);
      });
  }

  return (
    <div className="list-bg">
      {result.map((row, idx) => (
        <div className="list-item" style={{ background: row.complete === "Y" ? "#FFA500" : "white" }} key={idx}>
          {/* prettier-ignore */ <Link href={`/mongodb-detail/${row._id.toString()}`}><h4>{row.title}</h4></Link>}
          {session && <Link href={`/mongodb-edit/${row._id}`}>✏️</Link>}
          {/* prettier-ignore */ session && (<span style={{ cursor: "pointer" }} onClick={(e) => handleDelete(e, row)}>🗑️</span>)}
          {/* prettier-ignore */ session && (<span style={{ cursor: "pointer" }} onClick={(e) => handleDelete(e, row)}>🗑️</span>)}
          {/* prettier-ignore */ <span style={spanStyle} data-complete={row.complete} onClick={(e) => handleCompleteOnClick(e, row)}>✔️</span>}
          <p>{row.content}</p>
        </div>
      ))}
    </div>
  );
}
