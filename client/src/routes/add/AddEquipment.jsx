import React from "react";
import { useState } from "react";
import ImageData from "../../assets/image/replaceIMG.png";

import MainLogo from "../../components/MainLogo";

function AddEquipment() {
  var temp = ImageData.split(",")[1];
  var imageData = atob(temp);

  const [equipmentName, setEquipmentName] = useState("");
  const [equipmentLocation, setEquipmentLocation] = useState("");
  const [equipmentFunction, setEquipmentFunction] = useState("");
  const [equipmentImage, setEquipmentImage] = useState(imageData);
  const [equipmentFile, setEquipmentFile] = useState(null);

  const onChangeImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      var data = reader.result.split(",")[1];
      var binaryBlob = atob(data);

      setEquipmentImage(binaryBlob);
    };
    reader.readAsDataURL(file);
  };

  const onChangeFile = (e) => {
    setEquipmentFile(e.target.files[0]);
  };

  const onAddEquipment = () => {
    (async () => {
      if (!equipmentName) {
        alert("기구명을 입력해주세요.");
        return;
      }
      if (!equipmentLocation) {
        alert("기구위치를 입력해주세요.");
        return;
      }
      if (!equipmentFunction) {
        alert("기능을 입력해주세요.");
        return;
      }
      if (!equipmentFile) {
        const res = await fetch("/add/equipment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: equipmentName,
            location: equipmentLocation,
            function: equipmentFunction,
            image: equipmentImage,
          }),
        });

        console.log(res);
        const data = await res.json();
        console.log(data);
        console.log(data.message);
        if (data.message == "success") {
          alert("기구이 추가되었습니다.");
          window.location.reload();
          /*
          setEquipmentName("");
          setEquipmentLocation("");
          setEquipmentFunction("");
          setEquipmentImage(ImageData);
          setEquipmentFile(null);
          */
        }
      } else {
        const formData = new FormData();
        formData.append("files", equipmentFile);

        console.log(formData);
        console.log(Array.from(formData));

        const ret = await fetch("/upload/file/" + equipmentName, {
          method: "POST",
          body: formData,
        });

        const response = await ret.json();
        console.log(response);

        if (response.message == "success") {
          const res = await fetch("/add/equipment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: equipmentName,
              location: equipmentLocation,
              function: equipmentFunction,
              image: equipmentImage,
            }),
          });

          console.log(res);
          const data = await res.json();
          console.log(data);
          console.log(data.message);
          if (data.message == "success") {
            alert("기구이 추가되었습니다.");
            window.location.reload();
            /*
            setEquipmentName("");
            setEquipmentLocation("");
            setEquipmentFunction("");
            setEquipmentImage(ImageData);
            setEquipmentFile(null);
            */
          }
        } else {
          alert("기구 추가에 실패했습니다.");
        }
      }
    })();
  };

  return (
    <div>
      <MainLogo className="mainLogo" />
      <h1>기구추가하기</h1>

      <input
        type="text"
        placeholder="기구명"
        value={equipmentName}
        onChange={(e) => setEquipmentName(e.target.value)}
      />
      <input
        type="text"
        placeholder="약품위치"
        value={equipmentLocation}
        onChange={(e) => setEquipmentLocation(e.target.value)}
      />
      <input
        type="text"
        placeholder="기능"
        value={equipmentFunction}
        onChange={(e) => setEquipmentFunction(e.target.value)}
      />
      <p>사진</p>
      <input type="file" name="chemicalImage" onChange={onChangeImage} />
      <p>파일</p>
      <input type="file" onChange={onChangeFile} />
      <button onClick={onAddEquipment}>추가하기</button>
    </div>
  );
}

export default AddEquipment;
