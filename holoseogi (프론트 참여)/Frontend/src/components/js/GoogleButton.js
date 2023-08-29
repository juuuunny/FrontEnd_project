import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const GoogleButton = () => {
  const navigate = useNavigate();
  return (
    <GoogleLogin
      buttonText="Login"
      onSuccess={(res) => {
        const inFo = jwtDecode(res.credential);
        console.log(inFo);
        axios
          .post("http://localhost:8080/oauth2/authorization/google")
          .then((res) => {
            res.json();
            navigate("/Main");
          })
          .then(console.log(res));
      }}
      onError={() => {
        console.log("FAIL");
      }}
    />
  );
};
export default GoogleButton;
