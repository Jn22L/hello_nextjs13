"use client";
import Link from "next/link.js";
import { fetchJson } from "@/util/nj-common";

export default function ListItem({ result, session }) {
  const spanStyle = { display: "inline-block", width: "80%", textAlign: "right", }; // prettier-ignore

  return (
    <div className="list-bg">
      {result.map((row, idx) => (
        <div className="list-item" style={{ background: row.complete === "N" ? "white" : "#FFA500" }} key={idx}>
          {/* prettier-ignore */ <Link href={`/mongodb-detail/${row._id.toString()}`}><h4>{row.title}</h4></Link>}
          {/* prettier-ignore */ <span style={spanStyle}>✔️</span>}
          <p>{row.content}</p>
        </div>
      ))}
    </div>
  );
}
