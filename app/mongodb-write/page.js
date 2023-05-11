"use client";

import { useState } from "react";

export default function Write() {
  const [imgUrl, setImgUrl] = useState("");

  function handleChange(e) {
    const file = e.target.files[0];
    let src = URL.createObjectURL(file);
    setImgUrl(src);
  }

  // 무료 이미지 업로드 사이트 사용하기 ??
  return (
    <div className="p-20">
      <h4>글작성</h4>
      <form action="/api/post/new" method="POST">
        <input name="title" placeholder="글제목"></input>
        <input name="content" placeholder="글내용"></input>
        <input type="file" accept="image/*" onChange={(e) => handleChange(e)}></input>
        <img src={imgUrl} />
        <img src="https://i.postimg.cc/D0G8Z05r/792963f57b8007d9e.jpg" border="0" alt="792963f57b8007d9e" />
        <button type="submit">저장</button>
      </form>
    </div>
  );
}
