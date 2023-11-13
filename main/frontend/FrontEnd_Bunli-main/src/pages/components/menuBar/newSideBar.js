import { useNavigate } from "react-router-dom";
import recyclebinImg from "../../../assets/recylebinImg.png";
import storeImg from "../../../assets/제어판.png";
import userImg from "../../../assets/드라이브.png";
import folderImg from "../../../assets/폴더.png";
import { userGameApi } from "../../../apis/userApi";
import {useEffect, useState} from "react";


const NewSideBar = () => {
  const navigate = useNavigate();

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

  // 유저 아이콘 클릭 시
  const handleOnMypage = (e) => {
    // 마이페이지로 라우팅
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
  const handleOnStore = (e) => {
    //상점으로 라우팅
    navigate("/giftshop");
  };

    const handleOnFolder = () => {
        alert("미르톤 화이팅!!!!!");
    };

  return (
    <div id="iconBox">
      <img src={userImg} id="mypage" onClick={handleOnMypage}></img>
      <p id="font1">마이페이지</p>
      <img src={recyclebinImg} id="game" onClick={handleOnGame}></img>
      <p id="font2">휴지통</p>
      <img src={storeImg} id="store" onClick={handleOnStore}></img>
      <p id="font3">상점</p>
        <img src={folderImg} id="folder" onClick={handleOnFolder}></img>
        <p id="font4">미르톤</p>
        <img src={folderImg} id="folder" onClick={handleOnFolder}></img>
        <p id="font5">화이팅!</p>
    </div>
  );
};

export default NewSideBar;
