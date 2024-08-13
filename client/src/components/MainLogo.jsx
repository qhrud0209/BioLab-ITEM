import logo from "../assets/image/BioTEM_logo.png";
import { useNavigate } from "react-router-dom";
function MainLogo(className) {
  const navigate = useNavigate();

  return (
    <div>
      <img
        className={className}
        src={logo}
        onClick={() => navigate("/")}
        alt="logo"
      />
    </div>
  );
}

export default MainLogo;
