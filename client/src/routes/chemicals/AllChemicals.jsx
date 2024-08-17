import { useEffect, useState } from "react";
import arrOrder from "../../utils/arrOrder";
import ChemicalSearchBar from "../../components/chemicals/ChemicalSearchBar";
import image1 from "../../assets/image/chemical-1.jpg";
import image2 from "../../assets/image/chemical-2.jpg";
import xMark from "../../assets/image/x-mark.png";
import Modal from "react-modal";

function AllChemicals() {
  const [chemicals, setChemicals] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  useEffect(() => {
    (async () => {
      const res = await fetch("/chemicals/all");
      const data = await res.json();

      data.sort(arrOrder("1"));

      setChemicals(data);
    })();
  }, []);

  return (
    <div>
      <ChemicalSearchBar />
      <h1>All Chemicals</h1>
      <span>약품명</span>
      <span>위치</span>
      {chemicals.map((chemical) => {
        return (
          <div>
            <span>{chemical[1]}</span>
            <span>{chemical[2]}</span>
          </div>
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

export default AllChemicals;
