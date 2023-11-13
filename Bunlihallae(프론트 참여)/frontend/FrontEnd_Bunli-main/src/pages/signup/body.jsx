import { authenticateUser, createUser } from "../../apis/signupApi/apis";
import useInput from "../../hooks/useInput";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Body() {
  //form 내의 변수들
  const [id, onChangeId, setId] = useInput("");
  const [password, onChangePassword, setPassword] = useInput("");
  const [name, onChangeName, setName] = useInput("");
  const [address, onChangeAddress, setAddress] = useInput("");

  // 로그인 버튼 누를 시
  // 맞으면 authentivateUser 함수를 호출해서 메인페이지로 넘어가고
  const navigate = useNavigate();
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!id) {
      alert("이메일을 입력해주세요");
    } else if (!password) {
      alert("비밀번호를 입력해 주세요");
    } else {
      //그 유저인지 확인하는 함수
      authenticateUser(navigate, id, password);
    }
  };

  // 로그인 버튼 활성화 구현
  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) {
    if (id && password) {
      loginBtn.style.color = `#fff`;
    } else if (id || password) {
      loginBtn.style.color = `red`;
    }
  }

  // modal
  let [modal, setModal] = useState(false);

  // (회원가입) 완료 버튼 누를 시
  const handleOnComplete = (e) => {
    e.preventDefault();
    if (!name) {
      alert("이름을 입력해주세요");
    } else if (!id) {
      alert("이메일을 입력해 주세요");
    } else if (!password) {
      alert("비밀번호를 입력해 주세요");
    } else if (!address) {
      alert("주소를 입력해주세요");
    } else {
      // 유저 생성
      createUser(navigate, name, id, password, address);
    }
  };

  // 완료 버튼 활성화 구현
  const signupBtn = document.getElementById("signupBtn");
  if (signupBtn) {
    if (name && id && password && address) {
      signupBtn.style.color = `#fff`;
    } else if (name || id || password || address) {
      signupBtn.style.color = `red`;
    }
  }

  return (
    <div id="container">
      {modal ? (
        <form id="form" onSubmit={handleOnComplete}>
          <input
            type="text"
            id="nameInput"
            placeholder="이름"
            onChange={onChangeName}
          />
          <input
            type="text"
            id="idInput"
            placeholder="이메일"
            onChange={onChangeId}
          />
          <input
            type="password"
            id="passwordInput"
            placeholder="비밀번호"
            onChange={onChangePassword}
          />
          <input
            type="text"
            id="addressInput"
            placeholder="주소"
            onChange={onChangeAddress}
          />
          <button type="submit" id="signupBtn">
            완료
          </button>
        </form>
      ) : (
        <form id="form" onSubmit={handleOnSubmit}>
          <input
            type="text"
            id="idInput"
            placeholder="이메일"
            onChange={onChangeId}
          />
          <input
            type="password"
            id="passwordInput"
            placeholder="비밀번호"
            onChange={onChangePassword}
          />
          <button type="submit" id="loginBtn">
            로그인
          </button>
          <p
            id="signup"
            onClick={() => {
              setModal(!modal);
            }}
          >
            회원가입
          </p>
        </form>
      )}
    </div>
  );
}

export default Body;
