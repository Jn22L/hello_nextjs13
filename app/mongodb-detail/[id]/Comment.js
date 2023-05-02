"use client";
import { useState } from "react";

export default function Comment({ parent }) {
  let [comment, setComment] = useState("");

  return (
    <div>
      <div>댓글목록</div>
      <input
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <button
        onClick={(e) => {
          console.log(comment);
          fetch("/api/post/comment", { method: "POST", body: JSON.stringify({ comment, parent }) });
        }}
      >
        댓글전송
      </button>
    </div>
  );
}
