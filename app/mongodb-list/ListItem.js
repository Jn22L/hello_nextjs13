"use client";
import Link from "next/link.js";
import { fetchJson } from "@/util/nj-common";
import dayjs from "dayjs";

export default function ListItem({ result, session }) {
  const spanStyle = { cursor: "pointer", display: "inline-block", width: "80%", textAlign: "right", }; // prettier-ignore
  let nowYYYYMMDD = dayjs().format("YYYYMMDD");

  function handleDelete(e, row) {
    if (!confirm("삭제 할까요?")) {
      return;
    }

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
    if (e.target.dataset.complete === "N") {
      e.target.parentElement.style.background = "#FFA500";
      e.target.dataset.complete = nowYYYYMMDD;
    } else {
      e.target.parentElement.style.background = "white";
      e.target.dataset.complete = "N";
    }

    fetchJson("/api/post/complete", { method: "POST", cache: "no-store", body: JSON.stringify({ _id: row._id, complete: e.target.dataset.complete }) })
      .then((json) => {
        console.log("OK", json);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }

  return (
    <div className="list-bg">
      {result.map((row, idx) => (
        <div className="list-item" style={{ background: row.complete === "N" ? "white" : "#FFA500" }} key={idx}>
          {/* prettier-ignore */ <Link href={`/mongodb-detail/${row._id.toString()}`}><h4>{row.title}</h4></Link>}
          {session && <Link href={`/mongodb-edit/${row._id}`}>✏️</Link>}
          {/* prettier-ignore */ session && (<span style={{ cursor: "pointer" }} onClick={(e) => handleDelete(e, row)}>🗑️</span>)}
          {/* prettier-ignore */ <span style={spanStyle} data-complete={row.complete} onClick={(e) => handleCompleteOnClick(e, row)}>✔️</span>}
          <p>{row.content}</p>
        </div>
      ))}
    </div>
  );
}
