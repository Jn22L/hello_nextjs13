"use client";
// error.js 는 clien component 로 만들어야 한다.
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
