"use client";
import { useState, useEffect, useRef } from "react";

export default function Comment({ parentId, comments }) {
  let [commentList, setCommentList] = useState([]);
  let [comment, setComment] = useState("");
  const inputRef = useRef();

  console.log("댓글의 parentID:", parentId);

  function selectCommentList(pObj) {
    async function fetchSelect() {
      const response = await fetch(`/api/comment/list?parentId=${pObj.parentId}`);
      const json = await response.json();
      if (!response.ok) {
        throw new Error(JSON.stringify(json));
      }
      return json;
    }
    fetchSelect()
      .then((result) => {
        setCommentList(result);
      })
      .catch((error) => {
        console.log("조회오류", JSON.parse(error));
      });
  }

  function insertComment(pObj) {
    async function fetchInsert() {
      const response = await fetch("/api/comment/new", { method: "POST", body: JSON.stringify({ comment: pObj.comment, parentId: pObj.parentId }) });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(JSON.stringify(json));
      }
      return json;
    }
    fetchInsert()
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
      {commentList.length > 0 ? commentList.map((row, idx) => <p key={row._id}>{row.content}</p>) : "댓글없음"}
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
