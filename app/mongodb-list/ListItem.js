"use client";
import Link from "next/link.js";
import { fetchJson } from "@/util/nj-common";

export default function ListItem({ result, session }) {
  const spanStyle = { cursor: "pointer", display: "inline-block", width: "80%", textAlign: "right", }; // prettier-ignore

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

  function handleOnClick(e) {
    let curBg = e.target.parentElement.style.background;
    e.target.parentElement.style.background = curBg === "white" || curBg === "" ? "#FFA500" : "white";
  }

  return (
    <div className="list-bg">
      {result.map((row, idx) => (
        <div className="list-item" key={idx}>
          {/* prettier-ignore */ <Link href={`/mongodb-detail/${row._id.toString()}`}><h4>{row.title}</h4></Link>}
          {session && <Link href={`/mongodb-edit/${row._id}`}>✏️</Link>}
          {/* prettier-ignore */ session && (<span style={{ cursor: "pointer" }} onClick={(e) => handleDelete(e, row)}>🗑️</span>)}
          <span
            style={spanStyle}
            onClick={(e) => {
              handleOnClick(e);
            }}
          >
            ✔️
          </span>
          <p>{row.content}</p>
        </div>
      ))}
    </div>
  );
}
