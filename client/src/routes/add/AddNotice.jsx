import { useState } from "react";
import MainLogo from "../../components/MainLogo";

function AddNotice() {
  const [notice, setNotice] = useState("");

  const onClickNotice = async () => {
    console.log(notice);
    const res = await fetch("/add/notice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: notice }),
    });

    const data = await res.json();
    if (data.message == "suceess") {
      alert("공지사항이 등록되었습니다.");
      setNotice("");
    }
  };
  return (
    <div>
      <MainLogo />
      <h1>공지사항 작성</h1>
      <input
        type="text"
        placeholder="공지사항"
        value={notice}
        onChange={(e) => setNotice(e.target.value)}
      />

      <button onClick={onClickNotice}>완료</button>
    </div>
  );
}

export default AddNotice;
