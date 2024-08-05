import { useNavigate } from "react-router-dom";
import { useState } from "react";

import MainLogo from "../../assets/image/BioTEM_logo.png";
function ChemicalSearchBar() {
  const navigate = useNavigate();

  const [searchterm, setSearchterm] = useState("");

  const onKeySearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/chemicals/list/${searchterm}`);
    }
  };

  return (
    <div>
      <img onClick={() => navigate("/")} src={MainLogo} />
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
    </div>
  );
}

export default ChemicalSearchBar;
