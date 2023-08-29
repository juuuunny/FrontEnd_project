import axios from "axios";
import { useNavigate } from "react-router-dom";
function GoogleLogin() {
  const navigate = useNavigate();
  axios.get(`http://localhost:8080/`).then((res) => {
    console.log(res);
    navigate("/Main");
  });
}
export default GoogleLogin;
