import { useEffect, useState } from "react";
import google from "../../css/FirstGoogleSignUp.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { GoogleLogin } from "../../../apis/UserApi";

function FirstSocial() {
  const [isphone, setIsphone] = useState(false);
  const [isage, setIsage] = useState(false);

  const [phonetext, setPhonetext] = useState("*전화번호를 입력해주세요.");
  const [agetext, setAgetext] = useState("*나이를 입력해주세요.");

  const userId = useParams();
  const [isClicked, setIsClicked] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userId: userId.userId,
    phone: "",
    gender: "남",
    region: "서울",
    age: "",
    role: "",
  });

  const { phone, gender, region, age, role } = user;
  const onChange = (event) => {
    const { value, name } = event.target;
    console.log(event, "event");
    setUser({
      ...user,
      [name]: value,
    });
    console.log(user);
  };
  const changePhone = (e) => {
    const phoneCurrent = e.target.value;
    setUser({
      ...user,
      phone: phoneCurrent,
    });

    const regex = /^[0-9\b]{11,11}$/;
    if (phoneCurrent === "") {
      setIsphone(false);
      setPhonetext("*전화번호를 입력해주세요.");
    } else if (regex.test(e.target.value)) {
      setIsphone(true);
      setPhonetext("*사용가능한 전화번호입니다.");
    } else {
      setIsphone(false);
      setPhonetext("*올바른 전화번호 형식으로 입력해주세요.");
    }
  };

  const changeAge = (e) => {
    const ageCurrent = e.target.value;
    setUser({
      ...user,
      age: ageCurrent,
    });
    const regex = /^[0-9\b]{0,3}$/;
    if (ageCurrent === "") {
      setIsage(false);
      setAgetext("*나이를 입력해주세요.");
    } else if (regex.test(e.target.value)) {
      setIsage(true);
      setAgetext("");
    } else {
      setIsage(false);
      setAgetext("*3자리 이하숫자로만 입력해주세요.");
    }
  };
  // const onChangePhone = () => {
  //   setUser({
  //     ...user,
  //     phone: user.phone.replaceAll("-", ""),
  //   });
  // };

  const submit = async () => {
    try {
      await GoogleLogin(user).then((res) => {
        alert("회원가입이 되었습니다. 로그인을 다시 진행해주세요.");
        navigate("/login");
      });
    } catch (err) {
      console.log(err);
    }
  };

  const sumbitGoogle = () => {
    if (user.region === "") {
      alert("지역을 선택해주세요.");
    } else if (!isage) {
      alert("나이를 형식에 맞게 입력해주세요.");
    } else if (!isphone) {
      alert("전화번호를 형식에 맞게 다시 입력해주세요.");
    } else if (user.role === "") {
      alert("멘토/멘티를 선택해주세요.");
    } else {
      submit();
    }
  };
  const handleClick = (e) => {
    console.log(e.target.value);
    setIsClicked(e.target.value);
    console.log(isClicked, "state");
    onChange(e);
  };
  return (
    <div style={{ width: "100%", height: "100vh", backgroundColor: "#FAFAFA" }}>
      <div
        style={{
          position: "absolute",
          top: "0",
          width: "100%",
          height: "100%",
        }}
      >
        <div className={google.googlebox}>
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>
            추가정보 입력
          </div>
          <div style={{ marginLeft: "10px" }}>
            <div style={{ marginTop: "50px" }}>
              <span style={{ width: "100px", display: "inline-block" }}>
                성별 :{" "}
              </span>
              <label htmlFor="남">남</label>
              <input
                id="남"
                type="radio"
                name="gender"
                value="남"
                onChange={onChange}
                defaultChecked
              ></input>
              <label htmlFor="여" style={{ marginLeft: "10px" }}>
                여
              </label>
              <input
                id="여"
                type="radio"
                name="gender"
                value="여"
                onChange={onChange}
              ></input>
            </div>
            <div>
              <span style={{ width: "100px", display: "inline-block" }}>
                지역 :{" "}
              </span>
              <select
                className={google.selectRegion}
                name="region"
                onChange={onChange}
              >
                <option value="">지역</option>
                <option value="서울">서울</option>
                <option value="인천">인천</option>
                <option value="경기">경기</option>
                <option value="충청북도">충청북도</option>
                <option value="충청남도">충청남도</option>
                <option value="경상북도">경상북도</option>
                <option value="경상남도">경상남도</option>
                <option value="전라북도">전라북도</option>
                <option value="전라남도">전라남도</option>
                <option value="강원도">강원도</option>
              </select>
            </div>
            <div style={{ marginTop: "40px" }}>
              <span style={{ width: "100px", display: "inline-block" }}>
                나이 :
              </span>
              <input
                type="text"
                placeholder="나이 입력(ex.25)"
                name="age"
                value={age}
                onChange={changeAge}
                className={google.textInput}
              />
              <div
                style={{
                  width: "300px",
                  height: "20px",
                  color: "red",
                  fontSize: "13px",
                  marginLeft: "100px",
                  marginTop: "3px",
                }}
              >
                {agetext}
              </div>
            </div>
            <div style={{ marginTop: "26px" }}>
              <span style={{ width: "100px", display: "inline-block" }}>
                전화번호 :{" "}
              </span>
              <input
                type="text"
                placeholder="-없이 숫자만 입력해주세요."
                name="phone"
                value={phone}
                onChange={changePhone}
                className={google.textInput}
              />
              {isphone ? (
                <div
                  style={{
                    width: "300px",
                    height: "20px",
                    color: "blue",
                    fontSize: "13px",
                    marginTop: "3px",
                    marginLeft: "100px",
                  }}
                >
                  {phonetext}
                </div>
              ) : (
                <div
                  style={{
                    width: "300px",
                    height: "20px",
                    color: "red",
                    fontSize: "13px",
                    marginTop: "3px",
                    marginLeft: "100px",
                  }}
                >
                  {phonetext}
                </div>
              )}
            </div>
            <div style={{ marginTop: "40px" }}>
              <span style={{ width: "100px", display: "inline-block" }}>
                멘토/멘티 :{" "}
              </span>
              <button
                value="mentor"
                onClick={handleClick}
                name="role"
                className={google.mentomenti}
                style={
                  isClicked === "mentor"
                    ? { backgroundColor: "#66c109", color: "white" }
                    : { backgroundColor: "white", color: "black" }
                }
              >
                멘토
              </button>
              <button
                value="mentee"
                onClick={handleClick}
                name="role"
                className={google.mentomenti}
                style={
                  isClicked === "mentee"
                    ? {
                        backgroundColor: "#66c109",
                        color: "white",
                        marginLeft: "20px",
                      }
                    : {
                        backgroundColor: "white",
                        color: "black",
                        marginLeft: "20px",
                      }
                }
              >
                멘티
              </button>
            </div>
          </div>
          <div
            style={{
              marginTop: "50px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={sumbitGoogle}
              style={{
                width: "300px",
                height: "35px",
                backgroundColor: "#66c109",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              회원가입
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FirstSocial;
