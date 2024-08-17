import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Chemical from "../../components/chemicals/Chemical";

import ChemicalSearchBar from "../../components/chemicals/ChemicalSearchBar";
import image1 from "../../assets/image/chemical-1.jpg";
import image2 from "../../assets/image/chemical-2.jpg";
import xMark from "../../assets/image/x-mark.png";
import Modal from "react-modal";
function ChemicalList() {
  const navigate = useNavigate();

  const { searchTerm } = useParams();
  const [modalShow, setModalShow] = useState(false);
  const [chemicals, setChemicals] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/search/chemical/${searchTerm}`);
      const data = await res.json();
      console.log(data);
      setChemicals(data);
      console.log(chemicals);
    })();
  }, [searchTerm]);

  return (
    <div>
      <ChemicalSearchBar />

      {chemicals.map((chemical) => {
        return (
          <Chemical
            cid={chemical[0]}
            chemicalName={chemical[1]}
            chemicalLocation={chemical[2]}
            chemicalQuantity={chemical[6]}
          />
        );
      })}

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

export default ChemicalList;
