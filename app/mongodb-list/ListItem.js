"use client";
import Link from "next/link.js";
import { useRouter } from "next/navigation";

export default function ListItem({ result, session }) {
  let router = useRouter(); // client component 에서만 사용가능

  async function apiPostDelete(row) {
    const response = await fetch("/api/post/delete", { method: "DELETE", body: JSON.stringify({ _id: row._id, author: row.author ?? "" }) });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(JSON.stringify(json));
    }
    return json;
  }

  function handleDelete(e, row) {
    apiPostDelete(row)
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

  console.log("ListItem.result", result);
  return (
    <div className="list-bg">
      {result.map((row, idx) => (
        <div className="list-item" key={idx}>
          <Link href={`/mongodb-detail/${row._id.toString()}`}>
            <h4>{row.title}</h4>
          </Link>
          {session && <Link href={`/mongodb-edit/${row._id}`}>✏️</Link>}
          {session && (
            <span style={{ cursor: "pointer" }} onClick={(e) => handleDelete(e, row)}>
              🗑️
            </span>
          )}
          <span
            style={{ cursor: "pointer", display: "inline-block", width: "80%", textAlign: "right" }}
            onClick={(e) => {
              let curBg = e.target.parentElement.style.background;
              e.target.parentElement.style.background = curBg === "white" || curBg === "" ? "#FFA500" : "white";
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
