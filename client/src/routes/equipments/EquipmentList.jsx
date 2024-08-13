import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import EquipmentSearchBar from "../../components/equipments/EquipmentSearchBar";
import Equipment from "../../components/equipments/Equipment";
function EquipmentList() {
  const { searchTerm } = useParams();

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
    </div>
  );
}

export default EquipmentList;
