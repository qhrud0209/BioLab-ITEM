import { useEffect, useState } from "react";
import arrOrder from "../../utils/arrOrder";
import ChemicalSearchBar from "../../components/chemicals/ChemicalSearchBar";

function AllChemicals() {
  const [chemicals, setChemicals] = useState([]);
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
    </div>
  );
}

export default AllChemicals;
