"use client";
import { useState, useEffect, useRef } from "react";

async function fetchJson(url, option) {
  const response = await fetch(url, option);
  const json = await response.json();
  if (!response.ok) {
    throw new Error(JSON.stringify(json));
  }
  return json;
}

export default function Comment({ parentId }) {
  const [commentList, setCommentList] = useState([]);
  const [comment, setComment] = useState("");
  const inputRef = useRef();

  function selectCommentList(pObj) {
    fetchJson(`/api/comment/list?parentId=${pObj.parentId}`, {})
      .then((result) => {
        setCommentList(result);
      })
      .catch((error) => {
        console.log("조회오류", JSON.parse(error));
      });
  }

  function insertComment(pObj) {
    fetchJson("/api/comment/new", { method: "POST", body: JSON.stringify({ comment: pObj.comment, parentId: pObj.parentId }) })
      .then((result) => {
        selectCommentList({ parentId: pObj.parentId });
        setComment("");
        inputRef.current.focus();
      })
      .catch((error) => {
        alert(JSON.parse(error.message).retMsg);
      });
  }

  useEffect(() => {
    selectCommentList({ parentId });
  }, []);

  return (
    <div>
      <hr></hr>
      {commentList.length > 0 ? commentList.map((row, idx) => <p key={row._id}>{row.content}</p>) : <p>댓글이 없습니다.</p>}
      <input
        value={comment}
        ref={inputRef}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <button
        onClick={(e) => {
          insertComment({ comment, parentId });
        }}
      >
        댓글전송
      </button>
    </div>
  );
}
