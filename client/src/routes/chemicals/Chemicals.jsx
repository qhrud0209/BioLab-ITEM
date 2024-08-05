import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MainLogo from "../../assets/image/BioTEM_logo.png";

function Chemicals() {
  const navigate = useNavigate();

  const [searchterm, setSearchterm] = useState("");
  const [message, setMessage] = useState("");
  const onKeySearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/chemicals/list/${searchterm}`);
    }
  };

  useEffect(() => {
    (async () => {
      const res = await fetch("/notice");
      const data = await res.json();
      setMessage(data[0][0]);
    })();
  }, []);
  return (
    <div>
      <img onClick={() => navigate("/")} src={MainLogo} />
      <h1>약품</h1>
      <p>{message}</p>
      <input
        type="text"
        placeholder="약품명을 입력하세요."
        name="search"
        onChange={(e) => setSearchterm(e.target.value)}
        onKeyDown={onKeySearch}
      />
      <button onClick={() => navigate(`/chemicals/list/${searchterm}`)}>
        검색
      </button>
      <button onClick={() => navigate("/chemicals/all")}>
        <p>전체목록확인</p>
      </button>
    </div>
  );
}

export default Chemicals;
