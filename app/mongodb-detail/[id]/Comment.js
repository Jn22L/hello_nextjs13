"use client";
import { useState, useEffect, useRef } from "react";

export default function Comment({ parentId, comments }) {
  let [commentList, setCommentList] = useState([]);
  let [comment, setComment] = useState("");
  const inputRef = useRef();

  console.log("댓글의 parentID:", parentId);

  async function fetchApiCommentList(param) {
    const response = await fetch(`/api/comment/list?parentId=${param.parentId}`);
    const json = await response.json();
    if (!response.ok) {
      throw new Error(JSON.stringify(json));
    }
    return json;
  }

  function selectCommentList(param) {
    fetchApiCommentList(param)
      .then((result) => {
        console.log("조회결과", result);
        setCommentList(result);
      })
      .catch((error) => {
        console.log("조회오류", JSON.parse(error));
      });
  }

  useEffect(() => {
    console.log("컴포넌트가 화면에 나타남");
    selectCommentList({ parentId });
    return () => {
      console.log("컴포넌트가 화면에서 사라짐");
    };
  }, []);

  return (
    <div>
      <hr></hr>
      {commentList.length > 0 ? commentList.map((row, idx) => <p key={row._id}>{row.content}</p>) : "댓글없음"}

      <input
        onChange={(e) => {
          setComment(e.target.value);
        }}
        value={comment}
        ref={inputRef}
      />
      <button
        onClick={(e) => {
          console.log(comment);
          fetch("/api/comment/new", { method: "POST", body: JSON.stringify({ comment, parentId: parentId }) })
            .then((r) => r.json())
            .then((result) => {
              selectCommentList({ parentId });
              setComment("");
              inputRef.current.focus();
            });
        }}
      >
        댓글전송
      </button>
    </div>
  );
}
