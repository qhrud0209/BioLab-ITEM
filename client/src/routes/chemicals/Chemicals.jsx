import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MainLogo from "../../assets/image/BioTEM_logo.png";
import ChemicalSearchBar from "../../components/chemicals/ChemicalSearchBar";

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
      <h1>약품</h1>
      <p>{message}</p>
      <ChemicalSearchBar />
      <button onClick={() => navigate("/chemicals/all")}>
        <p>전체목록확인</p>
      </button>
    </div>
  );
}

export default Chemicals;
