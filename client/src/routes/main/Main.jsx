import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Main.module.css";

import MainLogo from "../../components/MainLogo";

function Main() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetch("/notice");
      const data = await res.json();
      //console.log(data[0][0]);
      setMessage(data);
      console.log(message);
    })();
  }, []);

  const navigate = useNavigate();

  return (
    <div className={styles.Block}>
      <div className={styles.Title}>
        <MainLogo classname={styles.LogoIMG} />
      </div>
      <p className={styles.message}>{message}</p>

      <div className={styles.Buttons}>
        <button
          className={styles.chemicalButton}
          onClick={() => navigate("/chemicals")}
        >
          CHEMICALS
        </button>
        <button
          className={styles.equipmentButton}
          onClick={() => navigate("/equipments")}
        >
          EQUIPMENTS
        </button>
      </div>
    </div>
  );
}

export default Main;
