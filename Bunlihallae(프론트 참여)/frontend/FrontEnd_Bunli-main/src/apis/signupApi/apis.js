import axios from "axios";

// axios 인스턴스
// 수정 필요
const serverApi = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// 수정한 signup
export const createUser = async (navigate, name, id, password, address) => {
    await serverApi
        .post(`http://localhost:8080/user/signup`, {
            userName: name,
            userEmail: id,
            userPassword: password,
            userAddress: address,
        })
        .then((response) => {
            // 회원가입 성공 후 로그인
            authenticateUser(navigate, id, password);
        })
        .catch((error) => {
            if (error.response && error.response.status === 400) {
                alert("존재하는 이메일입니다."); // "존재하는 이메일 입니다." 메시지를 표시
            } else {
                alert("회원가입 에러입니다."); // "존재하는 이메일 입니다." 메시지를 표시
            }
        });
};


export const authenticateUser = async (navigate, id, password) => {
    await serverApi
        .post(`http://localhost:8080/user/login`, {
            userEmail: id,
            userPassword: password,
        })
        .then((response) => {
            // 로그인 성공 시 토큰 저장하고 홈페이지로 네비게이트
            localStorage.setItem("token", response.data.token);
            alert(id + "님 반갑습니다!!")
            navigate(`/home`);
        })
        .catch((error) => {
            // 오류 발생 시 경고 메시지 표시
            alert("계정 정보가 잘못 되었습니다. 다시 입력해주세요");
        });
};
