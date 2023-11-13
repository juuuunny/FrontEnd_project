import axios from "axios";

const url = "http://localhost:8080";


// 게임 종료 후 총마일리지와 현재시간 보내기
export const postGameResultApi = (totalMileage, token) => {
  return axios.post(
      `${url}/game/finish`, // 'url'을 백엔드 서버의 실제 URL로 대체하세요.
      {
        userMileage: totalMileage
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
  );
};

