import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import corridor from "../../assets/image/equipment-corridor.jpg";
import deeping from "../../assets/image/equipment-deeping.jpg";
import lab from "../../assets/image/equipment-lab.jpg";
import xMark from "../../assets/image/x-mark.png";
import EquipmentSearchBar from "../../components/equipments/EquipmentSearchBar";
import Equipment from "../../components/equipments/Equipment";
function EquipmentList() {
  const { searchTerm } = useParams();

  const [showCorridor, setShowCorridor] = useState(false);
  const [showDeeping, setShowDeeping] = useState(false);
  const [showLab, setShowLab] = useState(false);

  const [equipments, setEquipments] = useState([]);
  const [array, setArray] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetch(`/search/equipment/${searchTerm}`);
      const data = await res.json();
      console.log(data);
      setEquipments(data);
      console.log(equipments);
    })();
  }, [searchTerm]);

  return (
    <div>
      <EquipmentSearchBar />
      <h1>Equipment List</h1>

      {equipments.map((equipment) => {
        return (
          <Equipment
            eid={equipment[0]}
            equipmentName={equipment[1]}
            equipmentLocation={equipment[2]}
            equipmentFunction={equipment[3]}
          />
        );
      })}

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

export default EquipmentList;
