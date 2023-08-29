import Navigation from "../../../components/js/navigation";
import { Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import signup from "../../css/signup.module.css";
import menu from "../../../components/css/navigationMenu.module.css";
import { useEffect, useState } from "react";
import { getBoardDetailApi } from "../../../apis/boardApi";
import home from "../../css/home.module.css";
import { SignUp, confirmEmailCode, sendEmailCode } from "../../../apis/UserApi";

// 게시물 상세 페이지

function BoardDetail() {
  const navigate = useNavigate();

  const [isEmail, setIsEmail] = useState(false);
  const [isConfirmCode, setIsConfirmCode] = useState(false);
  const [ispasswordType, setIspasswordType] = useState(false);
  const [ispasswordSame, setIspasswordSame] = useState(false);
  const [isphone, setIsphone] = useState(false);
  const [isage, setIsage] = useState(false);
  const [isgender, setIsgender] = useState(false);
  const [isrole, setIsrole] = useState(false);
  const [ischecked2, setIschecked2] = useState(false);

  const [emailtext, setEmailtext] = useState("*이메일을 입력해주세요.");
  const [codetext, setCodetext] = useState("");
  const [passwordtext, setPasswordtext] = useState("*비밀번호를 입력해주세요.");
  const [passwordSameText, setPasswordSameText] =
    useState("*비밀번호가 다릅니다.");
  const [phonetext, setPhonetext] = useState("*전화번호를 입력해주세요.");
  const [agetext, setAgetext] = useState("*나이를 입력해주세요.");
  const [gendertext, setGendertext] = useState("");
  const [roletext, setRoletext] = useState("");
  const [check2Text, setCheck2Text] = useState("");

  const onSubmit = () => {
    if (user.name === "") {
      alert("이름을 입력해주세요");
    } else if (!isEmail) {
      alert("잘못된 이메일 형식입니다. 다시 확인해주세요.");
    } else if (!isConfirmCode) {
      alert("이메일 인증에 실패하였습니다. 다시 진행해주세요.");
    } else if (!ispasswordType) {
      alert("비밀번호를 형식에 맞게 다시 입력해주세요.");
    } else if (!ispasswordSame) {
      alert("비밀번호가 맞지 않습니다. 비밀번호 확인을 다시 입력해주세요.");
    } else if (!isphone) {
      alert("전화번호를 형식에 맞게 다시 입력해주세요.");
    } else if (!isage) {
      alert("나이를 형식에 맞게 입력해주세요.");
    } else if (!isgender) {
      alert("성별을 선택하지 않았습니다.");
    } else if (!isrole) {
      alert("멘토, 멘티 중 원하는 역할을 선택해주세요.");
    } else if (!ischecked2) {
      alert("필수약관에 동의해주세요.");
    } else {
      finalSubmit();
      alert("회원가입이 되었습니다. 로그인을 다시 진행해주세요.");
      navigate("/login");
    }
  };

  const finalSubmit = async () => {
    try {
      await SignUp(user).then((res) => {
        console.log(res);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const [user, setUser] = useState({
    name: "",
    email: "",
    code: "",
    password: "",
    passwordConfirm: "",
    role: "",
    phone: "",
    region: "서울",
    gender: "",
    age: "",
  });

  const {
    name,
    email,
    code,
    password,
    passwordConfirm,
    role,
    phone,
    region,
    gender,
    age,
  } = user;

  const onChange = (event) => {
    const { value, name } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const onChangeEmail = (e) => {
    const emailRegex =
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    const emailCurrent = e.target.value;
    setUser({
      ...user,
      email: emailCurrent,
    });

    if (!emailRegex.test(emailCurrent)) {
      setEmailtext("*잘못된 이메일 형식입니다. 다시 확인해주세요.");
      setIsEmail(false);
    } else {
      setEmailtext("*사용가능한 이메일 주소입니다.");
      setIsEmail(true);
    }
  };

  const sendCode = async () => {
    try {
      await sendEmailCode(email).then((res) => {
        console.log(res);
      });
    } catch (err) {
      if (err.response.data.code === 500) {
        alert("이미 회원가입된 이메일입니다.");
      }
      console.log(err);
    }
  };

  const onClickSendCode = () => {
    if (isEmail) {
      sendCode();
    } else {
      alert("이메일 형식이 올바르지 않습니다.");
    }
  };

  const confirmCode = async () => {
    try {
      await confirmEmailCode(email, code).then((res) => {
        if (res.data.authResult) {
          setIsConfirmCode(true);
          setCodetext("*인증 성공");
        } else {
          setIsConfirmCode(false);
          setCodetext("*인증 실패");
        }
        console.log(res.data.authResult);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onChangePassword = (e) => {
    const passwordCurrent = e.target.value;
    setUser({
      ...user,
      password: passwordCurrent,
    });
    var regExp = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
    if (passwordCurrent.length < 8 || passwordCurrent.length > 16) {
      setIspasswordType(false);
      setPasswordtext("*비밀번호 형식이 올바르지 않습니다.");
    } else if (regExp.test(passwordCurrent)) {
      setIspasswordType(true);
      setPasswordtext("*사용가능한 비밀번호입니다.");
    } else {
      setIspasswordType(false);
      setPasswordtext("*비밀번호 형식이 올바르지 않습니다");
    }
  };

  const onChangePasswordSame = (e) => {
    const passwordSameCurrent = e.target.value;
    setUser({
      ...user,
      passwordConfirm: passwordSameCurrent,
    });

    if (password === passwordSameCurrent) {
      setIspasswordSame(true);
      setPasswordSameText("*비밀번호가 같습니다.");
    } else {
      setIspasswordSame(false);
      setPasswordSameText("*비밀번호가 다릅니다.");
    }
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

  const changeGender = (e) => {
    setUser({
      ...user,
      gender: e.target.value,
    });
    setIsgender(true);
    setGendertext(e.target.value);
  };

  const changeRole = (e) => {
    setUser({
      ...user,
      role: e.target.value,
    });
    setIsrole(true);
    setRoletext(e.target.value);
  };

  const onCheck2 = () => {
    setIschecked2(true);
    setCheck2Text("check");
  };

  return (
    <div>
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          width: "1180px",
          margin: "0 auto",
        }}
      >
        <Navigation />

        <div className={menu.menu}>
          <div>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button>홈</Button>
            </Link>
          </div>
          <div className={menu.post}>
            <Link to="/posting" style={{ textDecoration: "none" }}>
              <Button style={{ color: "#66c109" }}>게시판</Button>
            </Link>
          </div>
          <div>
            <Link to="/program" style={{ textDecoration: "none" }}>
              <Button>프로그램</Button>
            </Link>
          </div>
          <div>
            <Link to="/postlist" style={{ textDecoration: "none" }}>
              <Button>멘토멘티</Button>
            </Link>
          </div>
          <div>
            <Link to="/inquire" style={{ textDecoration: "none" }}>
              <Button>문의</Button>
            </Link>
          </div>
        </div>
        <div
          style={{
            width: "980px",
            height: "1066px",
            margin: "268px auto 58px",
            display: "flex",
            flexShrink: "0",
            borderRadius: "16px",
            backgroundColor: "white",
            boxShadow: "0px 4px 4px 0px rgba(102, 193, 9, 0.20)",
            paddingLeft: "152px",
            paddingTop: "35px",
            display: "flex",
            flexDirection: "column",
          }}
          className={signup.totalSignUp}
        >
          <div className={signup.signup}>회원가입</div>
          <div style={{ marginTop: "12px" }}>
            <div
              style={{
                width: "36px",
                height: "20px",
                color: "#333",
                fontSize: "14px",
                fontWeight: "600",
                fontStyle: "normal",
                lineHeight: "20px",
              }}
            >
              이름
            </div>
            <input
              type="text"
              placeholder="이름 입력"
              name="name"
              value={name}
              onChange={onChange}
            />
            {name === "" ? (
              <div
                style={{
                  width: "160px",
                  height: "20px",
                  color: "red",
                  fontSize: "13px",
                  marginLeft: "8px",
                  marginTop: "3px",
                }}
              >
                *이름을 입력해주세요
              </div>
            ) : (
              <div
                style={{
                  width: "160px",
                  height: "20px",
                  color: "blue",
                  fontSize: "13px",
                  marginTop: "3px",
                  marginLeft: "8px",
                }}
              ></div>
            )}
          </div>
          <div>
            <div
              style={{
                width: "44px",
                height: "20px",
                color: "#333",
                fontSize: "14px",
                fontWeight: "600",
                fontStyle: "normal",
                lineHeight: "20px",
                marginTop: "6px",
              }}
            >
              이메일
            </div>
            <div>
              <input
                type="email"
                placeholder="이메일 입력"
                name="email"
                value={email}
                onChange={onChangeEmail}
              />
              <Button
                onClick={onClickSendCode}
                style={{
                  padding: "0px 10px",
                  marginLeft: "66px",
                  width: "118px",
                  height: "44px",
                  borderRadius: "8px",
                  backgroundColor: "#66C109",
                  color: "white",
                  border: "none",
                  fontSize: "14px",
                  fontWeight: "600",
                  lineHeight: "24px",
                  fontStyle: "normal",
                  cursor: "pointer",
                }}
              >
                인증 코드 전송
              </Button>
            </div>
            {isEmail ? (
              <div
                style={{
                  width: "300px",
                  height: "20px",
                  color: "blue",
                  fontSize: "13px",
                  marginTop: "3px",
                  marginLeft: "8px",
                }}
              >
                {emailtext}
              </div>
            ) : (
              <div
                style={{
                  width: "300px",
                  height: "20px",
                  color: "red",
                  fontSize: "13px",
                  marginTop: "3px",
                  marginLeft: "8px",
                }}
              >
                {emailtext}
              </div>
            )}
          </div>
          <div>
            <div
              style={{
                width: "56px",
                height: "20px",
                color: "#333",
                fontSize: "14px",
                fontWeight: "600",
                fontStyle: "normal",
                lineHeight: "20px",
                marginTop: "6px",
              }}
            >
              인증코드
            </div>
            <div>
              <input
                type="text"
                placeholder="인증 코드 입력"
                name="code"
                value={code}
                onChange={onChange}
              />
              <Button
                onClick={confirmCode}
                style={{
                  padding: "0px 10px",
                  marginLeft: "66px",
                  width: "118px",
                  height: "44px",
                  borderRadius: "8px",
                  backgroundColor: "#66C109",
                  color: "white",
                  border: "none",
                  fontSize: "14px",
                  fontWeight: "600",
                  lineHeight: "24px",
                  fontStyle: "normal",
                  cursor: "pointer",
                }}
              >
                인증 확인
              </Button>
            </div>
            {isConfirmCode ? (
              <div
                style={{
                  width: "300px",
                  height: "20px",
                  color: "blue",
                  fontSize: "13px",
                  marginTop: "3px",
                  marginLeft: "8px",
                }}
              >
                {codetext}
              </div>
            ) : (
              <div
                style={{
                  width: "300px",
                  height: "20px",
                  color: "red",
                  fontSize: "13px",
                  marginTop: "3px",
                  marginLeft: "8px",
                }}
              >
                {codetext}
              </div>
            )}
          </div>
          <div style={{ display: "flex", marginTop: "6px" }}>
            <div>
              <div
                style={{
                  width: "240px",
                  height: "20px",
                  color: "#333",
                  fontSize: "14px",
                  fontWeight: "600",
                  fontStyle: "normal",
                  lineHeight: "20px",
                }}
              >
                비밀번호(8~16자의 영문,숫자만 포함)
              </div>
              <input
                type="password"
                placeholder="비밀번호 입력"
                name="password"
                value={password}
                onChange={onChangePassword}
              />
              {ispasswordType ? (
                <div
                  style={{
                    width: "300px",
                    height: "20px",
                    color: "blue",
                    fontSize: "13px",
                    marginTop: "3px",
                    marginLeft: "8px",
                  }}
                >
                  {passwordtext}
                </div>
              ) : (
                <div
                  style={{
                    width: "300px",
                    height: "20px",
                    color: "red",
                    fontSize: "13px",
                    marginTop: "3px",
                    marginLeft: "8px",
                  }}
                >
                  {passwordtext}
                </div>
              )}
            </div>
            <div style={{ marginLeft: "56px" }}>
              <div
                style={{
                  width: "106px",
                  height: "20px",
                  color: "#333",
                  fontSize: "14px",
                  fontWeight: "600",
                  fontStyle: "normal",
                  lineHeight: "20px",
                }}
              >
                비밀번호 확인
              </div>
              <input
                type="password"
                placeholder="비밀번호 입력"
                name="passwordConfirm"
                value={passwordConfirm}
                onChange={onChangePasswordSame}
              />

              {ispasswordSame ? (
                <div
                  style={{
                    width: "300px",
                    height: "20px",
                    color: "blue",
                    fontSize: "13px",
                    marginTop: "3px",
                    marginLeft: "8px",
                  }}
                >
                  {passwordSameText}
                </div>
              ) : (
                <div
                  style={{
                    width: "300px",
                    height: "20px",
                    color: "red",
                    fontSize: "13px",
                    marginTop: "3px",
                    marginLeft: "8px",
                  }}
                >
                  {passwordSameText}
                </div>
              )}
            </div>
          </div>
          <div>
            <div
              style={{
                width: "200px",
                height: "20px",
                color: "#333",
                fontSize: "14px",
                fontWeight: "600",
                fontStyle: "normal",
                marginTop: "6px",
                lineHeight: "20px",
              }}
            >
              전화번호(-없이 숫자만 입력)
            </div>
            <input
              type="text"
              placeholder="전화번호 입력"
              name="phone"
              value={phone}
              onChange={changePhone}
            />
            {isphone ? (
              <div
                style={{
                  width: "300px",
                  height: "20px",
                  color: "blue",
                  fontSize: "13px",
                  marginTop: "3px",
                  marginLeft: "8px",
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
                  marginLeft: "8px",
                }}
              >
                {phonetext}
              </div>
            )}
          </div>
          <div>
            <div
              style={{
                width: "80px",
                height: "20px",
                color: "#333",
                fontSize: "14px",
                fontWeight: "600",
                fontStyle: "normal",
                marginTop: "6px",
                lineHeight: "20px",
              }}
            >
              주 거주 지역
            </div>
            <select
              name="region"
              onChange={onChange}
              style={{
                width: "320px",
                height: "44px",
                flexShrink: "0",
                borderRadius: "8px",
                border: "1px solid #ccc",
                paddingLeft: "16px",
                marginTop: "6px",
              }}
            >
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
          <div style={{ marginTop: "20px" }}>
            <div
              style={{
                width: "200px",
                height: "20px",
                color: "#333",
                fontSize: "14px",
                fontWeight: "600",
                fontStyle: "normal",
                lineHeight: "20px",
              }}
            >
              나이
            </div>
            <input
              type="text"
              placeholder="나이 입력"
              name="age"
              value={age}
              onChange={changeAge}
            />
            <div
              style={{
                width: "300px",
                height: "20px",
                color: "red",
                fontSize: "13px",
                marginLeft: "8px",
                marginTop: "3px",
              }}
            >
              {agetext}
            </div>
          </div>

          <div style={{ display: "flex" }}>
            <div>
              <div
                style={{
                  width: "200px",
                  height: "20px",
                  color: "#333",
                  fontSize: "14px",
                  fontWeight: "600",
                  fontStyle: "normal",
                  lineHeight: "20px",
                  marginTop: "20px",
                }}
              >
                성별
              </div>
              <div style={{ marginTop: "6px" }}>
                <Button
                  className={signup.selectButton}
                  value="남"
                  onClick={changeGender}
                  data-checked={gendertext === "남"}
                >
                  남자
                </Button>
                <Button
                  style={{ marginLeft: "10px" }}
                  className={signup.selectButton}
                  value="여"
                  onClick={changeGender}
                  data-checked={gendertext === "여"}
                >
                  여자
                </Button>
              </div>
              <div
                style={{
                  width: "160px",
                  height: "20px",
                  color: "red",
                  fontSize: "13px",
                  marginLeft: "12px",
                  marginTop: "3px",
                }}
              >
                {gendertext === "" ? "*성별을 선택해주세요" : ""}
              </div>
            </div>
            <div style={{ marginLeft: "208px" }}>
              <div
                style={{
                  width: "200px",
                  height: "20px",
                  color: "#333",
                  fontSize: "14px",
                  fontWeight: "600",
                  fontStyle: "normal",
                  lineHeight: "20px",
                  marginTop: "20px",
                }}
              >
                멘토/멘티
              </div>
              <div style={{ marginTop: "6px" }}>
                <Button
                  className={signup.selectButton}
                  value="mentor"
                  onClick={changeRole}
                  data-checked={roletext === "mentor"}
                >
                  멘토
                </Button>
                <Button
                  style={{ marginLeft: "10px" }}
                  className={signup.selectButton}
                  value="mentee"
                  onClick={changeRole}
                  data-checked={roletext === "mentee"}
                >
                  멘티
                </Button>
              </div>
              <div
                style={{
                  width: "180px",
                  height: "20px",
                  color: "red",
                  fontSize: "13px",
                  marginLeft: "4px",
                  marginTop: "3px",
                }}
              >
                {roletext === "" ? "*본인의 역할을 선택해주세요" : ""}
              </div>
            </div>
          </div>

          <div style={{ marginTop: "30px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                onClick={onCheck2}
                data-checked={check2Text === "check"}
                className={signup.check}
              >
                <i class="fa-regular fa-circle-check"></i>
              </Button>
              <div
                style={{
                  width: "189px",
                  height: "24px",
                  fontSize: "16px",
                  fontWeight: "16px",
                  marginLeft: "4px",
                  display: "flex",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "500",
                }}
              >
                <div style={{ color: "#66c109" }}>[필수]</div>
                <div style={{ marginLeft: "4px" }}>홀로서기 이용약관</div>
              </div>
            </div>
            <div
              style={{
                width: "330px",
                height: "96px",
                borderRadius: "8px",
                color: "#555",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "20px",
                marginTop: "8px",
                overflowY: "scroll",
                paddingRight: "16px",
              }}
            >
              제1조 (목적) 본 약관은 홀로서기 회사(이하 “회사”라 칭함)에서
              운영하는 홀로서기 홈페이지 (이하 "홈페이지"라 칭함)의 서비스 이용
              및 제공에 관한 제반 사항의 규정을 목적으로 합니다. 제2조 (용어의
              정의) ① “홈페이지”란 회사가 컴퓨터 등 정보통신설비를 이용하여 재화
              또는 용역을 이용자에게 제공하고 거래할 수 있도록 설정한 가상의
              영업장을 말하며, 아울러 홈페이지를 운영하는 사업자의 의미로도
              사용합니다. ② “이용자”란 "홈페이지"에 접속하여 이 약관에 따라
              "홈페이지"가 제공하는 서비스를 받는 회원 및 비회원을 말합니다. ③
              “회원”이라 함은 "홈페이지"에 개인정보를 제공하여 회원등록을 한
              자로서, "홈페이지"의 정보를 지속적으로 제공받으며 "홈페이지"가
              제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다. ④
              “비회원”이라 함은 회원에 가입하지 않고 "홈페이지"가 제공하는
              서비스를 이용하는 자를 말합니다. ⑤ “게시물”이라 함은 회원이
              홈페이지를 이용함에 있어서 홈페이지에 게시한
              부호,문자,음성,음향,화상,동영상 등의 정보 형태의 글,사진,동영상 및
              각종 파일과 링크 등을 의미합니다. 제3조 (약관의 효력 및 변경) ① 본
              약관은 "홈페이지"의 서비스 화면(www.holoseogi.co.kr)에 게시하거나
              이용자에게 공지함으로써 효력이 발생합니다. ② 홈페이지는 불가피한
              여건이나 사정이 있을 경우 약관을 변경할 수 있으며 변경할 경우,
              적용일자 및 개정사유를 명시하여 현행약관과 함께 "홈페이지"의
              초기화면에 7일 이전부터 적용일자 전까지 공지합니다. 단, 회원에게
              불리한 약관의 개정인 경우에는 공지 외에 회사가 부여한 이메일
              주소로(회원이 "홈페이지"에 제출한 전자우편 주소) 개정약관을
              발송하여 통지해야 합니다. ③ "홈페이지"가 전항에 따라 개정약관을
              공지 또는 통지 하면서 회원에게 7일 기간 내에 의사표시를 하지
              않으면 의사표시가 표명된 것으로 본다는 뜻을 명확하게 따로 공지
              또는 통지 하였음에도 회원이 명시적으로 거부의사를 표시하지 아니한
              경우 회원이 개정 약관에 동의한 것으로 봅니다. 제4조 (회원가입)
              ①이용자는 "홈페이지"가 정한 양식에 따라 회원정보를 기입한 후 본
              약관에 동의함으로써 회원으로 가입됩니다. ②전자금융거래를
              이용하려는 회원은 반드시 본인의 이름과 주민등록번호 혹은 본인인증
              정보를 제공하여야만 서비스를 이용할 수 있으며, 실명으로 등록하지
              않을 경우에는 일체의 회원으로서의 권리를 주장할 수 없습니다. ③
              타인의 명의(이름 및 주민등록번호)를 도용하여 가입 신청을 한 회원의
              모든 ID는 삭제되며, 관계법령에 따라 처벌을 받을 수 있습니다. ④
              "홈페이지"는 회원가입신청 이용자 중 다음 각 호에 해당하지 않는 한
              회원으로 등록하여야 합니다. 1. 가입신청자가 본 약관 제5조 2항에
              의거 이전에 회원자격을 상실한 적이 있는 경우 2. 등록내용에 허위,
              기재누락, 오기가 있는 경우 3. 만 14세 미만인 경우 4. 기타 회원으로
              등록하는 것이 "홈페이지"의 기술상 현저히 지장이 있다고 판단되는
              경우 ⑤ 회원은 가입 시 등록한 회원정보의 변경이 발생한 경우, 즉시
              "홈페이지"에서 직접 수정 또는 전자우편, 기타 방법으로 "홈페이지"에
              그 변경 사실을 알려야 합니다. 제5조 (회원 탈퇴 및 자격 상실) ①
              회원은 "홈페이지"에 언제든지 탈퇴를 요청할 수 있으며, 이 경우
              "홈페이지"는 즉시 회원탈퇴를 처리를 합니다 ② 회원이 다음 각 호의
              사유에 해당하는 경우, "홈페이지"는 회원자격을 상실(제한?정지)시킬
              수 있습니다. 1. 가입 신청시 허위 내용을 기재한 경우 2.
              "홈페이지"를 통해 구입한 서비스 등의 대금, 기타 "홈페이지" 이용에
              관련하여 회원이 부담하는 채무를 기일 내에 지급하지 않는 경우 3.
              다른 사람의 "홈페이지" 이용을 방해하거나 그 정보를 도용하는 등
              전자거래질서를 위협하는 경우 4. "홈페이지"를 이용하여 법령과 이
              약관이 금지하거나 공서양속에 반하는 행위를 하는 경우 ③
              "홈페이지"가 회원자격을 상실시키는 경우에는 회원등록을 말소합니다.
              이 경우 회원에게 이를 통지하고, 회원 등록 말소 전에 소명할 기회를
              부여합니다. 제 6조 (회원에 대한 통지) ① "홈페이지"가 회원에 대한
              통지를 하는 경우, 회원이 "홈페이지"에 제출한 전자우편 주소로 할 수
              있습니다. ② "홈페이지"는 불특정다수 회원에 대한 통지의 경우 30일
              이상 "홈페이지"에 게시함으로써 개별 통지에 갈음 할 수 있습니다. 제
              7 조 (서비스 이용) ① "홈페이지"는 다음과 같은 업무를 수행합니다.
              단, "홈페이지"가 제공하는 서비스 이용을 위해 필요시 이용자에게
              전자금융거래 약관에 대한 동의를 추가로 요구할 수 있습니다. 1.
              보험서비스에 대한 정보 제공 및 전자금융거래 2. 기타 "홈페이지"가
              정하는 서비스 ② "홈페이지"는 보험상품의 변경 등의 경우에는 장차
              체결되는 계약에 의해 제공할 보험상품의 내용을 변경할 수 있습니다.
              이 경우에는 변경된 보험상품의 내용 및 제공일자를 명시하여 현재의
              보험상품의 내용을 게시한 곳에 그 제공일자 이전 7일부터 공지합니다.
              ③ "홈페이지"가 제공하기로 이용자와 계약을 체결한 내용을 변경할
              경우에 "홈페이지"는 이로 인하여 이용자가 입은 손해를 배상합니다.
              단, "홈페이지"에 고의 또는 과실이 없는 경우에는 그러하지
              아니합니다. ④ 서비스의 이용은 "홈페이지"의 업무상 또는 기술상
              특별한 지장이 없는 한 연중무휴를 원칙으로 합니다. 다만 정기점검
              등의 필요로 인하여 "홈페이지"가 정한 날 및 시간에 대해서는 예외로
              합니다. ⑤ "홈페이지"는 시스템 등의 보수, 점검, 교체, 시스템의
              고장, 통신의 두절, 기타 불가 항력적 사유가 발생한 경우에는
              서비스의 제공을 일시적으로 중단할 수 있습니다. 이 경우
              "홈페이지"는 제6조(회원에 대한 통지)에서 정한 방법으로 회원에게
              통지 합니다. 다만, "홈페이지"가 사전에 통지할 수 없는 부득이한
              사유가 있는 경우 사후에 통지 할 수 있습니다. ⑥ "홈페이지"는
              서비스의 제공에 필요한 경우 정기점검을 실시 할 수 있으며,
              정기점검시간은 서비스제공화면에 공지한 바에 따릅니다. ⑦
              "홈페이지"는 ⑤항 및 ⑥항의 사유로 서비스 제공이 일시적으로
              중단됨으로 인하여 이용자 또는 제3자가 입은 손해에 대해서는
              관련법에 특별한 규정이 없는 한 "회원"에게 별도의 보상을 하지
              않습니다. 제 8 조 (전자금융거래 신청방법) ① 인터넷상에서
              전자금융거래 신청하는 방법은 다음의 절차에 의하여야 합니다. 1. 본
              약관에 동의 2. 최초 이용 시 전자금융거래이용약관 동의 3. 보험상품
              및 서비스 제공시 요구하는 항목 입력 4. 공인인증서, 신용카드 등에
              "홈페이지"가 정한 방법에 따른 결제 제 9 조 (개인의 의무) ① ID와
              비밀번호에 관한 관리책임은 이용자에게 있으며, 이를 제3자가
              이용하도록 하여서는 안됩니다. ② 자신의 ID가 부정하게 이용된 것을
              발견한 경우 반드시 회사에 그 사실을 통보하여야 합니다. ③ 이용자는
              본 약관 및 관계법령에 규정한 사항을 준수하여야 합니다. 제 10 조
              (개인정보보호) ① 회사는 이용자의 정보수집시 원활한 서비스 제공을
              위해 필요한 최소한의 정보를 수집합니다. ② 회사가 이용자의
              개인식별이 가능한 개인정보를 수집하는 때에는 반드시 당해 이용자의
              동의를 받습니다. ③ 이용자는 언제든지 회사가 가지고 있는 자신의
              개인정보에 대해 열람 및 오류정정 또는 동의 철회를 요구할 수 있으며
              회사는 이에 대해 지체 없이 필요한 조치를 취할 의무를 집니다.
              이용자가 오류의 정정을 요구한 경우에는 그 오류를 정정할 때까지
              당해 개인정보를 이용하지 않습니다. ④ 기타 개인정보관련사항은
              홈페이지에 별도로 게시하는 개인정보처리방침에 의거합니다. 제 11 조
              (저작권의 귀속 및 이용제한) ① "홈페이지"가 작성한 저작물에 대한
              저작권 기타 지적재산권은 "홈페이지"에 귀속합니다. ② 이용자는
              "홈페이지"를 이용함으로써 얻은 정보를 "홈페이지"의 사전 승낙없이
              복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로
              이용하거나 제3자에게 이용하게 하여서는 안 됩니다. 제 12 조
              (게시물의 저작권 및 관리) ① 회원이 "홈페이지"내에 게시한 게시물의
              저작권은 해당 게시물의 저작권자에게 귀속 됩니다. ② 회원의 게시물이
              "정보통신망 이용촉진 및 정보보호 등에 관한 법률" 및 "저작권법"등
              관련법에 위반되는 내용을 포함하는 경우, 권리자는 관련법이 정한
              절차에 따라 해당 게시물의 게시중단 및 삭제 등을 요청할 수 있으며,
              홈페이지는 관련법에 따라 조치를 취하여야 합니다. ③ "홈페이지"는
              전항에 따른 권리자의 요청이 없는 경우라도 권리침해가 인정될 만한
              사유가 있거나 기타 홈페이지 정책 및 관련법에 위반되는 경우에는
              관련법에 따라 해당 게시물에 대해 임시조치 등을 취합니다. ④ 본 조에
              따른 세부절차는 " 정보통신망 이용촉진 및 정보보호 등에 관한 법률 "
              및 "저작권법"이 규정한 범위 내에서 회사가 정한
              "게시중단요청서비스"에 따릅니다. 제 13 조 (분쟁해결) ① 이용자가
              "홈페이지"의 이용과 관련하여 불만이 있거나 의견을 제시하고자 하는
              경우에는 "홈페이지" 메뉴 내 상담창구에 의견을 제출할 수 있습니다.
              ② "홈페이지"는 이용자로부터 제출되는 불만사항 및 의견이 정당하다고
              판단되는 경우 우선적으로 그 사항을 처리합니다. 다만, 신속한 처리가
              곤란한 경우에는 이용자에게 그 사유와 처리일정을 통보할 수
              있습니다. 제 14 조 (준거법 및 재판관할) ① 회사와 "회원" 간 제기된
              소송은 대한민국법을 준거법으로 합니다. ② 회사와 "회원"간 발생한
              분쟁에 관한 소송은 민사소송법 상의 관할법원에 제소합니다.
              회원가입약관 버전번호: v1.0 회원가입약관 시행일자: 2023-08-01
              회원가입약관 최종변경일자: 2023-08-16
            </div>
          </div>
        </div>
        <div style={{ margin: "46px auto 0px" }}>
          <Button
            style={{
              width: "320px",
              height: "48px",
              borderRadius: "8px",
              backgroundColor: "#66C109",
              color: "white",
              fontSize: "16px",
              fontWeight: "600",
              border: "none",
              cursor: "pointer",
            }}
            onClick={onSubmit}
          >
            {" "}
            회원가입하기
          </Button>
        </div>
        <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
          <div
            style={{
              width: "170px",
              margin: "20px auto 90px",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: "600",
              paddingBottom: "2px",
              borderBottom: "1px solid black",
              cursor: "pointer",
            }}
          >
            로그인 페이지로 돌아가기
          </div>
        </Link>
      </div>
      {/* 가장 아래 footer부분 */}
      <div className={home.footer}>
        <div className={home.footerLeft}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <h2>홀로서기</h2>
          </Link>
          <p>청소년 자립 지원 공공 서비스</p>
          <div>연락처 : 010-4470-2175</div>
          <div>이메일 : chandelier7642@gmail.com</div>
          <div>주소 : 세종대학교 학생회관 B123</div>
        </div>
        <div className={home.footerRight}>
          <div className={home.footerAgency}>
            <h4>협업 정부 기관</h4>
            <div>여성가족부</div>
            <div>청소년자립지원단</div>
            <div>한국청소년상담복지개발원</div>
            <div>한국청소년정책연구원</div>
            <div>한국청소년활동진흥원</div>
          </div>
          <div className={home.footerSponsor}>
            <h4>후원사</h4>
            <div>삼성재단</div>
            <div>LG재단</div>
            <div>카카오</div>
          </div>
          <div className={home.footerSpon}>
            <h4>후원</h4>
            <div>후원 문의</div>
            <div>1644-1211</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoardDetail;
