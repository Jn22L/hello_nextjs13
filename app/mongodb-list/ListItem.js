"use client";
import Link from "next/link.js";
import { useRouter } from "next/navigation";

export default function ListItem({ result, session }) {
  let router = useRouter(); // client component 에서만 사용가능

  return (
    <div className="list-bg">
      {result.map((row, idx) => (
        <div className="list-item" key={idx}>
          <Link href={`/mongodb-detail/${row._id.toString()}`}>
            <h4>{row.title}</h4>
          </Link>
          {session && <Link href={`/mongodb-edit/${row._id}`}>✏️</Link>}
          {session && (
            <span
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                if (!confirm("삭제할까요?")) {
                  return;
                }
                fetch("/api/post/delete", { method: "DELETE", body: JSON.stringify({ _id: row._id }) })
                  .then((r) => {
                    if (r.status == 200) {
                      return r.json();
                    } else {
                      //서버가 에러코드전송시 실행할코드
                    }
                  })
                  .then((result) => {
                    //성공시 실행할코드
                    alert(result);
                    e.target.parentElement.style.opacity = 0;
                    setTimeout(() => {
                      e.target.parentElement.style.display = "none";
                    }, 1000);
                    //router.push("/mongodb-list");
                    //router.refresh();
                  })
                  .catch((error) => {
                    //인터넷문제 등으로 실패시 실행할코드
                    console.log(error);
                  });
              }}
            >
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
