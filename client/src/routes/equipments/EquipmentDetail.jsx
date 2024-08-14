import { useEffect, useParams } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import EquipmentSearchBar from "../../components/equipments/EquipmentSearchBar";

import FileImage from "../../assets/image/file.png";

function EquipmentDetail() {
  const location = useLocation();

  const [equipmentName, setEquipmentName] = useState("");
  const [equipmentLocation, setEquipmentLocation] = useState("");
  const [equipmentFunction, setEquipmentFunction] = useState("");
  const [equipmentImage, setEquipmentImage] = useState();

  console.log(location.state.eid);

  const eid = location.state.eid;
  const name = location.state.name;
  //setEquipmentName(name);

  const [isfile, setIsFile] = useState(false);

  useEffect(() => {
    /*
    (async () => {
      const res = await fetch(`/equipments/${eid}`);
      const data = await res.json();
      console.log(data);

      setEquipmentName(name);
      setEquipmentLocation(data[0][2]);
      setEquipmentFunction(data[0][3]);
      setEquipmentImage(btoa(data[0][4]));

      console.log(typeof equipmentName);
      console.log(equipmentName);

      const res2 = await fetch(`/search/file/${equipmentName}`);
      const data2 = await res2.json();
      console.log(data2);

      if (data2.message == "yes") {
        setIsFile(true);
      }
    })();
    */
    (async () => {
      await fetch(`/equipments/${eid}`)
        .then((response) => response.json())
        .then((data) => {
          setEquipmentName(data[0][1]);
          setEquipmentLocation(data[0][2]);
          setEquipmentFunction(data[0][3]);
          setEquipmentImage(btoa(data[0][4]));
          return data[0][1];
        })
        .then((name) => {
          console.log(name);
          fetch(`/search/file/${name}`)
            .then((response) => response.json())
            .then((data) => {
              if (data.message == "yes") {
                setIsFile(true);
              }
            });
        });
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
        ) : (
          <p>파일이 없다.</p>
        )}
      </div>
    </div>
  );
}

export default EquipmentDetail;
