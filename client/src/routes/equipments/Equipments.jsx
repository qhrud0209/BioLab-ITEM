import EquipmentSearchBar from "../../components/equipments/EquipmentSearchBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Modal from "react-modal";
import corridor from "../../assets/image/equipment-corridor.jpg";
import deeping from "../../assets/image/equipment-deeping.jpg";
import lab from "../../assets/image/equipment-lab.jpg";
import xMark from "../../assets/image/x-mark.png";

function Equipments() {
  const navigate = useNavigate();

  const [showCorridor, setShowCorridor] = useState(false);
  const [showDeeping, setShowDeeping] = useState(false);
  const [showLab, setShowLab] = useState(false);
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
      <EquipmentSearchBar />
      <h1>기구</h1>
      <p>{message}</p>

      <button onClick={() => setShowCorridor(true)}>
        <p>복도</p>
      </button>
      <button onClick={() => setShowDeeping(true)}>
        <p>심화기기실</p>
      </button>
      <button onClick={() => setShowLab(true)}>
        <p>실험실</p>
      </button>

      <Modal
        isOpen={showCorridor}
        onRequestClose={() => setShowCorridor(false)}
      >
        <button onClick={() => setShowCorridor(false)}>
          <img src={xMark} />
        </button>

        <img src={corridor} />
      </Modal>
      <Modal isOpen={showDeeping} onRequestClose={() => setShowDeeping(false)}>
        <button onClick={() => setShowDeeping(false)}>
          <img src={xMark} />
        </button>

        <img src={deeping} />
      </Modal>
      <Modal isOpen={showLab} onRequestClose={() => setShowLab(false)}>
        <button onClick={() => setShowLab(false)}>
          <img src={xMark} />
        </button>

        <img src={lab} />
      </Modal>
    </div>
  );
}

export default Equipments;
