import EquipmentSearchBar from "../../components/equipments/EquipmentSearchBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
function Equipments() {
  const navigate = useNavigate();

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
    </div>
  );
}

export default Equipments;
