import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Chemical from "../../components/chemicals/Chemical";

import ChemicalSearchBar from "../../components/chemicals/ChemicalSearchBar";

function ChemicalList() {
  const navigate = useNavigate();

  const { searchTerm } = useParams();

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
    </div>
  );
}

export default ChemicalList;
