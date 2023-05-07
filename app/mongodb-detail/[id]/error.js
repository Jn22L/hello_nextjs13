"use client";
export default function Error({ error, reset }) {
  return (
    <div>
      <h4>에러발생 ㅅㄱ</h4>
      <button
        onClick={() => {
          reset();
        }}
      >
        다시불러오기
      </button>
    </div>
  );
}
