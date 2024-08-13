import { useNavigate } from "react-router-dom";

function Chemical({ cid, chemicalName, chemicalLocation, chemicalQuantity }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={(e) => {
        navigate(`/chemicals/detail/${cid}`, {
          state: {
            cid: cid,
          },
        });
      }}
    >
      <p>
        {chemicalName} /{chemicalLocation} /{chemicalQuantity}
      </p>
    </div>
  );
}

export default Chemical;
