import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Main.module.css";

import MainLogo from "../../assets/image/BioTEM_logo.png";

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
    <div>
      <div className={styles.MainLogo}>
        <img src={MainLogo} />
      </div>
      <div>
        <p>{message}</p>
      </div>

      <div>
        <div className={styles.Buttons}>
          <button
            className={styles.chemicalButton}
            onClick={() => navigate("/chemicals")}
          >
            약품
          </button>
        </div>
        <div>
          <button
            className={styles.equipmentButton}
            onClick={() => navigate("/equipments")}
          >
            기구
          </button>
        </div>
      </div>
    </div>
  );
}

export default Main;
