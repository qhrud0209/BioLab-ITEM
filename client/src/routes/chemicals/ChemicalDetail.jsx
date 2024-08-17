import { useEffect, useParams } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import ChemicalSearchBar from "../../components/chemicals/ChemicalSearchBar";
import image1 from "../../assets/image/chemical-1.jpg";
import image2 from "../../assets/image/chemical-2.jpg";
import xMark from "../../assets/image/x-mark.png";
import Modal from "react-modal";
function ChemicalDetail() {
  const location = useLocation();

  console.log(location.state.cid);

  const cid = location.state.cid;

  const [modalShow, setModalShow] = useState(false);

  const [chemicalName, setChemicalName] = useState("");
  const [chemicalLocation, setChemicalLocation] = useState("");

  const [chemicalCaution, setChemicalCaution] = useState("");
  const [chemicalImage, setChemicalImage] = useState();
  const [chemicalDate, setChemicalDate] = useState("");

  const [chemicalQuantity, setChemicalQuantity] = useState();

  useEffect(() => {
    (async () => {
      const res = await fetch(`/chemicals/${cid}`);
      const data = await res.json();
      console.log(data);

      setChemicalName(data[0][1]);
      setChemicalLocation(data[0][2]);
      setChemicalCaution(data[0][3]);
      setChemicalImage(btoa(data[0][4]));
      setChemicalDate(data[0][5]);
      setChemicalQuantity(data[0][6]);

      console.log(
        chemicalName,
        chemicalLocation,
        chemicalCaution,
        chemicalImage,
        chemicalDate,
        chemicalQuantity
      );
    })();
  }, []);

  return (
    <div>
      <ChemicalSearchBar />

      <h1>Chemical Detail</h1>
      <p>{chemicalName}</p>
      <p>{chemicalLocation}</p>
      <p>{chemicalCaution}</p>
      <p>{chemicalDate}</p>
      <p>{chemicalQuantity}</p>
      <img src={`data:image/png;base64,${chemicalImage}`} alt="chemical" />

      <button onClick={() => setModalShow(true)}>
        <p>위치확인</p>
      </button>

      <Modal isOpen={modalShow} onRequestClose={() => setModalShow(false)}>
        <button onClick={() => setModalShow(false)}>
          <img src={xMark} />
        </button>
        <img src={image1} />
        <img src={image2} />
      </Modal>
    </div>
  );
}

export default ChemicalDetail;
