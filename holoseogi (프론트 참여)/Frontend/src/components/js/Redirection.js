import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/userSlice";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { UserInfo } from "../../apis/UserApi";

// 구글로그인 화면
function Redirection() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(document.referrer);
  const searchParams = new URLSearchParams(window.location.search);
  const urlParams = new URL(window.location.href).searchParams;
  const accessToken = urlParams.get("accessToken");
  const userId = urlParams.get("userId");
  let userInfo = "";
  console.log(window.location.href);
  const signup = async () => {
    try {
      await UserInfo(accessToken).then(() => {
        userInfo = JSON.parse(jwtDecode(accessToken).USER);
        console.log(userInfo);
        sessionStorage.setItem("token", accessToken);
        dispatch(
          login({
            userId: userInfo.id,
            userToken: accessToken,
            userEmail: userInfo.email,
            userImg: userInfo.img,
            userName: userInfo.name,
            userGender: userInfo.gender,
            userAge: userInfo.age,
            userPhone: userInfo.phone,
            userRegion: userInfo.region,
            userRole: userInfo.role,
          })
        );
        navigate("/");
      });
    } catch (err) {
      alert("oAuth token expired");
      console.log(err);
      throw new Error(err);
    }
  };

  useEffect(() => {
    if (accessToken === null) {
      alert("소셜을 통한 회원가입을 위하여 추가정보를 기입해주세요.");
      navigate(`/signup/social/${userId}`);
    } else {
      console.log(accessToken);

      signup();

      console.log(`엑세스토큰 : ${accessToken} 을 저장했습니다.`);
    }
  }, [accessToken, dispatch]);

  return <h3>로딩중입니다.</h3>;
}
export default Redirection;
