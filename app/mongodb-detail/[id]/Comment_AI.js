"use client";
import { useState, useEffect, useRef } from "react";

const fetchJson = async (url, options = {}) => {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export default function Comment({ parentId, comments }) {
  const [commentList, setCommentList] = useState([]);
  const [comment, setComment] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await fetchJson(`/api/comment/list?parentId=${parentId}`);
        setCommentList(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [parentId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment) {
      return;
    }
    try {
      await fetchJson("/api/comment/new", {
        method: "POST",
        body: JSON.stringify({ comment, parentId }),
      });
      setComment("");
      inputRef.current.focus();
      fetchComments();
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <div>
      <hr />
      {commentList.length > 0 ? commentList.map((comment) => <p key={comment._id}>{comment.content}</p>) : <p>No comments yet.</p>}
      <form onSubmit={handleCommentSubmit}>
        <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
}
