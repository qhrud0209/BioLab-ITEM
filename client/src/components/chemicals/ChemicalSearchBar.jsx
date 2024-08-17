import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/image/BioTEM_logo.png";
import styles from "./ChemicalSearchBar.module.css";
import search from "../../assets/image/search.png";
function ChemicalSearchBar() {
  const navigate = useNavigate();

  const [searchterm, setSearchterm] = useState("");

  const onKeySearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/chemicals/list/${searchterm}`);
    }
  };

  return (
    <div className={styles.block}>
      <img
        onClick={() => navigate("/")}
        className={styles.mainlogo}
        src={logo}
      />

      <div className={styles.serachbarblock}>
        <input
          className={styles.searchbar}
          type="text"
          placeholder="약품명을 입력하세요."
          name="search"
          onChange={(e) => setSearchterm(e.target.value)}
          onKeyDown={onKeySearch}
        />

        <div>
          <img
            onClick={() => navigate(`/chemicals/list/${searchterm}`)}
            src={search}
            className={styles.search}
          />{" "}
        </div>
      </div>
    </div>
  );
}

export default ChemicalSearchBar;
