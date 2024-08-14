import { useNavigate } from "react-router-dom";

function Equipment({
  eid,
  equipmentName,
  equipmentLocation,
  equipmentFunction,
}) {
  const navigate = useNavigate();
  return (
    <div
      onClick={(e) => {
        navigate(`/equipments/detail/${eid}`, {
          state: {
            eid: eid,
            name: equipmentName,
          },
        });
      }}
    >
      <p>
        {equipmentName} /{equipmentLocation} /{equipmentFunction}
      </p>
    </div>
  );
}

export default Equipment;
