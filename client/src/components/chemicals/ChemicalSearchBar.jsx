import { useNavigate } from "react-router-dom";
import { useState } from "react";

import styles from "./ChemicalSearchBar.module.css";
import MainLogo from "../../components/MainLogo";
function ChemicalSearchBar() {
  const navigate = useNavigate();

  const [searchterm, setSearchterm] = useState("");

  const onKeySearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/chemicals/list/${searchterm}`);
    }
  };

  return (
    <div className={styles.bigBox}>
      <div>
        <MainLogo className={styles.MainLogo} />
      </div>
      <div className={styles.SearchBarBox}>
        <div>
          <input
            className={styles.SearchBar}
            type="text"
            placeholder="약품명을 입력하세요."
            name="search"
            onChange={(e) => setSearchterm(e.target.value)}
            onKeyDown={onKeySearch}
          />
        </div>
        <div>
          <button onClick={() => navigate(`/chemicals/list/${searchterm}`)}>
            검색
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChemicalSearchBar;
