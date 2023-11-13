import { HomeBody } from "./style";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userGameApi } from "../../apis/userApi.js";

function Body() {
  const token = localStorage.getItem("token");
  const [userInfo, setUserInfo] = useState({});


  const getUserGame = async (token) => {
    try {
      const response = await userGameApi(token);
      const userData = response.data;
      setUserInfo({
        user_id: userData.userMyPageDto.userId,
        user_name: userData.userMyPageDto.userName,
        user_mileage: userData.userMyPageDto.userMileage,
        user_address: userData.userMyPageDto.userAddress,
        user_gameDisabledDuration: userData.userMyPageDto.gameDisabledDuration
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserGame(token);
  }, [token]);

  const navigate = useNavigate();

  // 유저 아이콘 클릭 시
  const handleOnMypage = () => {
    navigate("/mypage");
  };

  // 휴지통 아이콘 클릭 시
  const handleOnGame = () => {
    if (userInfo.user_gameDisabledDuration > 0) {
      alert(`게임까지 ${userInfo.user_gameDisabledDuration}분 남았습니다.`);
    } else {
      navigate("/game");
    }
  };

  // 상점 아이콘 클릭 시
  const handleOnStore = () => {
    navigate("/giftshop");
  };

  const handleOnFolder = () => {
    alert("미르톤 화이팅!!!!!");
  };

  return (
      <HomeBody>
        <div id="background">
          <div id="trashBox"></div>
          <div id="iconBox">
            <p id="mypage" onClick={handleOnMypage}></p>
            <p id="font1">마이페이지</p>
            <p id="game" onClick={handleOnGame}></p>
            <p id="font2">휴지통</p>
            <p id="store" onClick={handleOnStore}></p>
            <p id="font3">상점</p>
            <p id="folder" onClick={handleOnFolder}></p>
            <p id="font4">미르톤</p>
            <p id="folder" onClick={handleOnFolder}></p>
            <p id="font5">화이팅!</p>
          </div>
        </div>
      </HomeBody>
  );
}

export default Body;
