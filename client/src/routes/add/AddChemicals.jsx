import React from "react";
import { useState } from "react";
import ImageData from "../../assets/image/replaceIMG.png";

function AddChemicals() {
  const [chemicalName, setChemicalName] = useState("");
  const [chmicalLocation, setChemicalLocation] = useState("");
  const [chemicalCaution, setChemicalCaution] = useState("");
  const [chemicalImage, setChemicalImage] = useState(ImageData);
  const [chemicalDate, setChemicalDate] = useState("");
  const [chemicalQuantity, setChemicalQuantity] = useState();

  const onChangeImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      //console.log("Encoded Base 64 File String:", reader.result);
      var data = reader.result.split(",")[1];
      var binaryBlob = atob(data);
      //console.log("Encoded Binary File String:", binaryBlob);

      setChemicalImage(binaryBlob);
      var convertBase64 = btoa(binaryBlob);

      //console.log("Decoded Base 64 File String:", convertBase64);

      //console.log("img" + img);
    };
    reader.readAsDataURL(file);
  };

  const onAddChemical = async () => {
    console.log(
      chemicalName,
      chmicalLocation,
      chemicalCaution,
      chemicalImage,
      chemicalDate,
      chemicalQuantity
    );

    const res = await fetch("/add/chemical", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: chemicalName,
        location: chmicalLocation,
        caution: chemicalCaution,
        image: chemicalImage,
        date: chemicalDate,
        quantity: chemicalQuantity,
      }),
    });

    console.log(res);
    const data = await res.json();
    console.log(data);
    console.log(data.message);
    if (data.message == "success") {
      alert("약품이 추가되었습니다.");

      setChemicalName("");
      setChemicalLocation("");
      setChemicalCaution("");
      setChemicalImage(ImageData);
      setChemicalDate("");
      setChemicalQuantity();
    }
  };

  return (
    <div>
      <h1>Add Chemicals</h1>
      <input
        type="text"
        placeholder="약품명"
        value={chemicalName}
        onChange={(e) => setChemicalName(e.target.value)}
      />
      <input
        type="text"
        placeholder="약품위치"
        value={chmicalLocation}
        onChange={(e) => setChemicalLocation(e.target.value)}
      />
      <input
        type="text"
        placeholder="주의사항"
        value={chemicalCaution}
        onChange={(e) => setChemicalCaution(e.target.value)}
      />
      <input type="date" onChange={(e) => setChemicalDate(e.target.value)} />
      <input type="file" name="chemicalImage" onChange={onChangeImage} />
      <input
        type="number"
        placeholder="수량"
        value={chemicalQuantity}
        onChange={(e) => setChemicalQuantity(e.target.value)}
      />
      <button onClick={onAddChemical}>추가하기</button>
    </div>
  );
}

export default AddChemicals;
