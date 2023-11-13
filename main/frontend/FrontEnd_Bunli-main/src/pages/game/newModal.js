import { useState } from 'react';
import { postGameResultApi } from "../../apis/gameApi/gameApi";
import { Link } from 'react-router-dom';
import RubberGloves from "../../assets/gameImg/RubberGloves.png";
import Tumbler from "../../assets/gameImg/Tumbler.png";
import Lipstick from "../../assets/gameImg/Lipstick.png";
import BodyWash from "../../assets/gameImg/BodyWash.png";
import Toothpaste from "../../assets/gameImg/Toothpaste.png";
import Cosmetic1 from "../../assets/gameImg/Cosmetic1.png";
import Cosmetic2 from "../../assets/gameImg/Cosmetic2.png";
import Cosmetic3 from "../../assets/gameImg/Cosmetic3.png";
import Cosmetic4 from "../../assets/gameImg/Cosmetic4.png";
import Cosmetic5 from "../../assets/gameImg/Cosmetic5.png";
import Cosmetic6 from "../../assets/gameImg/Cosmetic6.png";



function NewModal() {
  // 쓰레기 이미지와 이름을 배열로 관리
  const trashItems = [
    { id: 1, name: 'RubberGloves', image: RubberGloves, isRecyleAvailable: true },
    { id: 2, name: 'Tumbler', image: Tumbler, isRecyleAvailable: false },
    { id: 3, name: 'Lipstick', image: Lipstick, isRecyleAvailable: true },
    { id: 4, name: 'BodyWash', image: BodyWash, isRecyleAvailable: false },
    { id: 5, name: 'Toothpaste', image: Toothpaste, isRecyleAvailable: true },
    { id: 6, name: 'Cosmetic1', image: Cosmetic1, isRecyleAvailable: false },
    { id: 7, name: 'Cosmetic2', image: Cosmetic2, isRecyleAvailable: false },
    { id: 8, name: 'Cosmetic3', image: Cosmetic3, isRecyleAvailable: false },
    { id: 9, name: 'Cosmetic4', image: Cosmetic4, isRecyleAvailable: false },
    { id: 10, name: 'Cosmetic5', image: Cosmetic5, isRecyleAvailable: false },
    { id: 11, name: 'Cosmetic6', image: Cosmetic6, isRecyleAvailable: false }
  ];

  const [selected, setSelected] = useState({});

  const token = localStorage.getItem("token");

  const handleItemClick = (id, isRecyleAvailable) => {
    setSelected(prev => ({
      ...prev,
      [id]: { checked: !prev[id]?.checked, isRecyleAvailable }
    }));
  };

  const handleSubmit = () => {
    let score = 0;
    let wrongItems = []; // 잘못 선택된 항목들을 저장할 배열

    trashItems.forEach(item => {
      const selectedItem = selected[item.id];
      const isSelected = selectedItem?.checked;
      const isRecyleAvailable = item.isRecyleAvailable;

      // 재활용 가능하며 선택된 경우 점수 추가
      if (isSelected && isRecyleAvailable) {
        score += 10;
      }

      // 재활용 가능하지만 선택되지 않았거나, 재활용 불가능하면서 선택된 경우
      if ((isRecyleAvailable && !isSelected) || (!isRecyleAvailable && isSelected)) {
        wrongItems.push(item.name); // 잘못 선택된 항목 이름 추가
      }
    });

    console.log("Final Score:", score);

    if (wrongItems.length > 0) {
      alert("다음 쓰레기들이 잘못 선택되었습니다: " + wrongItems.join(", ") + "\n" + "총 획득 마일리지: " + score); // 잘못된 선택들을 알림
    } else {
      alert("모든 선택이 올바릅니다!");
    }

    const todayTime = new Date().toISOString();

    postGameResultApi(score, todayTime, token)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error('Game result submission failed', error);
        });
  };


  const isSelected = id => selected[id]?.checked;

  return (
      <div className="myPageModalFirstClass">
        <div className="ModalBorder">
          <div className="modalTop">재활용 가능한 쓰레기는?</div>
          <div style={myPageBoxStyle}>
            <Link to="/home" style={{ textDecoration: "none", color: "black" }}>
              <button className="toHome">X</button>
            </Link>
            {trashItems.map(item => (
                <div
                    key={item.id}
                    style={{ ...trashItemStyle, ...(isSelected(item.id) ? selectedStyle : {}) }}
                    onClick={() => handleItemClick(item.id, item.isRecyleAvailable)}
                    className={`trashItem ${isSelected(item.id) ? 'selected' : ''}`}>
                  <img
                      src={item.image}
                      alt={item.name}
                      style={trashImageStyle}
                  />
                  {/*<div className="trashName">{item.name}</div>*/}
                </div>
            ))}
          </div>
          <div className="OKbutton">
            <Link to="/home" style={{ textDecoration: "none", color: "black" }}>
              <button onClick={handleSubmit}>제출하기</button>
            </Link>
          </div>
        </div>
      </div>
  );
}

// CSS 스타일 정의
const myPageBoxStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around'
};

const trashItemStyle = {
  flexBasis: '30%',
  marginBottom: '20px',
  cursor: 'pointer',
  border: '2px solid transparent',
  boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
  transition: 'all 0.3s ease-in-out',
  display: 'flex', // Flexbox 디스플레이 설정
  justifyContent: 'center', // 수평 중앙 정렬
  alignItems: 'center', // 수직 중앙 정렬
};

const selectedStyle = {
  border: '2px solid blue', // 선택된 항목의 테두리 색
  boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)' // 더 강한 그림자 효과
};


const trashImageStyle = {
  width: '30px',
  height: 'auto'
};

export default NewModal;