import React, { useEffect, useState } from "react";
import logincss from "../../css/login.module.css";
import man_logo from "../../../components/img/user.png";
import googleLogo from "../../img/googleLogo.png";
import naverLogo from "../../img/naverLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/slices/userSlice";
import { UserInfo } from "../../../apis/UserApi";
import { SelfLogin } from "../../../apis/UserApi";
function Login() {
  const navigate = useNavigate();
  const nowURL = new URL(window.location.href);
  console.log(nowURL.origin, "zz");

  const dispatch = useDispatch();
  const serverDomain = "http://www.holoseogi.co.kr";
  const local = "http://localhost:3000";
  // 구글 로그인 연결
  const GoogleLogin = () => {
    window.location.href = `http://ec2-3-37-185-169.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorize/google?redirect_uri=http://www.holoseogi.co.kr/oauth2/redirect`;
  };

  const NaverLogin = () => {
    window.location.href = `http://ec2-3-37-185-169.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorize/naver?redirect_uri=http://www.holoseogi.co.kr/oauth2/redirect`;
  };

  // 이메일과 비밀번호로 로그인
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (event) => {
    const { value, name } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const signup = async (token) => {
    try {
      await UserInfo(token).then((res) => {
        console.log(res);
        dispatch(
          login({
            userId: res.data.id,
            userToken: token,
            userEmail: res.data.email,
            userImg: res.data.img,
            userName: res.data.name,
            userGender: res.data.gender,
            userAge: res.data.age,
            userPhone: res.data.phone,
            userRegion: res.data.region,
            userRole: res.data.role,
          })
        );

        navigate("/");
      });
    } catch (err) {
      alert("oAuth token expired");
      console.log(err);
    }
  };

  const onLogin = async () => {
    try {
      await SelfLogin(user).then((res) => {
        if (res.status === 500) {
          alert(
            "이메일 또는 비밀번호가 잘못되었습니다. 다시 로그인을 진행해주세요."
          );
        } else if (res.status === 200) {
          const token = res.data.accessToken;
          sessionStorage.setItem("token", token);
          signup(token);
        }
      });
    } catch (err) {
      alert("로그인을 다시 진행해주세요.");
    }
  };

  const onSignUp = () => {
    navigate("/signup");
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      {/* 로그인 박스 부분 */}
      <div className={logincss.loginBox}>
        <div className={logincss.logo}>
          <Link to={"/"}>
            <img className={logincss.man} src={man_logo} />
            <p className={logincss.txt}>홀로서기</p>
          </Link>
        </div>
        <div className={logincss.loginInput}>
          <input
            type="text"
            placeholder="이메일"
            name="email"
            value={email}
            onChange={onChange}
          />
          <input
            type="password"
            placeholder="비밀번호"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className={logincss.button}>
          <Button onClick={onLogin}>로그인</Button>

          <span
            style={{
              fontSize: "15px",
              width: "210px",
              height: "24px",
              display: "flex",
              alignItems: "center",
              lineHeight: "24px",
            }}
          >
            계정이 없으신가요?
            <Button onClick={onSignUp}>회원가입</Button>
          </span>
        </div>
        <div className={logincss.lineBox}>
          <hr className={logincss.line} />
          <hr className={logincss.line2} />
        </div>
      </div>

      {/* SNS 로그인 부분 */}
      <div className={logincss.btnBox}>
        <button
          type="button"
          className={`${logincss.Button} ${logincss.naver}`}
          onClick={NaverLogin}
        >
          <div className={logincss.buttonText}>
            <img className={logincss.btnLogo} src={naverLogo}></img>

            <div>네이버로 로그인하기</div>
          </div>
        </button>
        <button
          onClick={GoogleLogin}
          type="button"
          className={`${logincss.Button} ${logincss.google}`}
        >
          <div className={logincss.buttonText}>
            <img className={logincss.btnLogo} src={googleLogo}></img>

            <div>구글로 로그인하기</div>
          </div>
        </button>
      </div>
    </div>
  );
}

export default Login;
