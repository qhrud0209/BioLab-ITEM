import React from "react";
import MainLogo from "../../components/MainLogo";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function EquipmentSearchBar() {
  const navigate = useNavigate();

  const [searchterm, setSearchterm] = useState("");

  const onKeySearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/equipments/list/${searchterm}`);
    }
  };
  return (
    <div>
      <MainLogo />
      <input
        type="text"
        placeholder="기구명을 입력하세요."
        name="search"
        onChange={(e) => setSearchterm(e.target.value)}
        onKeyDown={onKeySearch}
      />
      <button onClick={() => navigate(`/equipments/list/${searchterm}`)}>
        검색
      </button>
    </div>
  );
}

export default EquipmentSearchBar;
