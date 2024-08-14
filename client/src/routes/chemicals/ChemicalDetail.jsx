import { useEffect, useParams } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import ChemicalSearchBar from "../../components/chemicals/ChemicalSearchBar";
function ChemicalDetail() {
  const location = useLocation();

  console.log(location.state.cid);

  const cid = location.state.cid;

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
    </div>
  );
}

export default ChemicalDetail;
