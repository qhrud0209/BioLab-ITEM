import { useEffect, useParams } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import EquipmentSearchBar from "../../components/equipments/EquipmentSearchBar";

import FileImage from "../../assets/image/file.png";

function EquipmentDetail() {
  const location = useLocation();

  console.log(location.state.eid);

  const eid = location.state.eid;

  const [equipmentName, setEquipmentName] = useState("");
  const [equipmentLocation, setEquipmentLocation] = useState("");
  const [equipmentFunction, setEquipmentFunction] = useState("");
  const [equipmentImage, setEquipmentImage] = useState();

  const [isfile, setIsFile] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/equipments/${eid}`);
      const data = await res.json();
      console.log(data);

      setEquipmentName(data[0][1]);
      setEquipmentLocation(data[0][2]);
      setEquipmentFunction(data[0][3]);
      setEquipmentImage(btoa(data[0][4]));

      console.log(
        equipmentName,
        equipmentLocation,
        equipmentFunction,
        equipmentImage
      );

      const res2 = await fetch("/search/file" + equipmentName);
      const data2 = res2.json();

      if (data2.message == "yes") {
        setIsFile(true);
      }
    })();
  }, []);

  const onClickFile = () => {
    (async () => {
      fetch("/download/file" + equipmentName)
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");

          link.setAttribute("href", url);
          link.setAttribute("download", equipmentName + ".pdf");

          document.body.appendChild(link);

          link.click();

          link.parentNode.removeChild(link);

          window.URL.revokeObjectURL(url);
        });
    })();
  };
  return (
    <div>
      <EquipmentSearchBar />
      <h1>Equipment Detail</h1>

      <p>{equipmentName}</p>
      <p>{equipmentLocation}</p>
      <p>{equipmentFunction}</p>
      <img src={`data:image/png;base64,${equipmentImage}`} alt="chemical" />
      <div>
        {isfile ? (
          <img src={FileImage} onClick={onClickFile} alt="file" />
        ) : null}
      </div>
    </div>
  );
}

export default EquipmentDetail;
