import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MainLogo from "../../assets/image/BioTEM_logo.png";
import ChemicalSearchBar from "../../components/chemicals/ChemicalSearchBar";
import image1 from "../../assets/image/chemical-1.jpg";
import image2 from "../../assets/image/chemical-2.jpg";
import xMark from "../../assets/image/x-mark.png";
import Modal from "react-modal";

import styles from "./Chemicals.module.css";

function Chemicals() {
  const navigate = useNavigate();

  const [searchterm, setSearchterm] = useState("");
  const [message, setMessage] = useState("");
  const [modalShow, setModalShow] = useState(false);
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
      <div className={styles.Box1}>
        <div className={styles.Box2}>
          <h1>CHEMICAL</h1>

          <ChemicalSearchBar />
        </div>
        <p>{message}</p>
      </div>
      <div>
        <button onClick={() => navigate("/chemicals/all")}>
          <p>전체목록확인</p>
        </button>

        <button onClick={() => setModalShow(true)}>
          <p>위치확인</p>
        </button>
      </div>
      <Modal isOpen={modalShow} onRequestClose={() => setModalShow(false)}>
        <button onClick={() => setModalShow(false)}>
          <img src={xMark} />
        </button>
        <img src={image1} />
        <img src={image2} />
      </Modal>
    </div>
  );
}

export default Chemicals;
