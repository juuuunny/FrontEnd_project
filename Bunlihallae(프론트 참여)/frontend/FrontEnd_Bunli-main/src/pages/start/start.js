import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import "./start.css";
import icon from "../components/img/icon.png";
import loadingGif from "../components/img/loading.gif"; // 가정한 GIF 경로

function Start() {
    const [showGif, setShowGif] = useState(false);
    const movePage = useNavigate();

    const onButtonClick = () => {
        setShowGif(true);
        setTimeout(() => {
            movePage("/signup");
        }, 5000); // 5초 후 페이지 이동
    };

    return (
        <Container className="container">
            <img className="logo" src={icon} alt="logo"></img>
            <H1 id="font">분리할래?</H1>

            {showGif && (
                <FullScreenGif>
                    <img src={loadingGif} alt="Loading..." />
                </FullScreenGif>
            )}

            <Button className="button" onClick={onButtonClick}>
                START
            </Button>
        </Container>
    );
}

const FullScreenGif = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); // 반투명 배경
  z-index: 1000; // 다른 요소보다 상위에 위치

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; // 화면에 꽉 차게
  }
`;

const Container = styled.div`
  height: 100vh; // 높이
  background-color: #5882fa;
  color: black; // 글자 색
  text-align: center; // 텍스트 정렬
  display: flex; //
  // ..
  flex-direction: column; // ..
  justify-content: ; // 중앙 정렬 1
  align-items: center; // 중앙 정렬 2
  font-family: "Galmuri14"; // 폰트 종류
`;

const H1 = styled.h1`
  margin: 0; // 주변 마진
  font-size: 80px;
  font-family: "Galmuri14";
  font-weight: bold;
  color: #0431b4;
  letter-spacing: 1px;
  overflow: hidden;
  white-space: nowrap;

  animation: typewriter 3s steps(44) 1s infinite normal both,
    blinkTextCursor 500ms infinite;

  @keyframes typewriter {
    from {
      width: 0;
    }
    to {
      width: 1000px;
    }
  }
  @keyframes blinkTextCursor {
    from {
      border-right-color: hsl(0, 0%, 80%);
    }
    to {
      border-right-color: transparent;
    }
  }
`;

const Button = styled.button`
  all: unset; // 초기화
  background-color: #2e64fe;
  color: white;
  width: 300px;
  height: 100px;
  border-radius: 50px; // 모서리 곡률
  margin-top: 7.5rem;
  font-size: 30px;

  cursor: pointer; // 커서 변경

  &:hover {
    // 마우스가 요소 위에 올라갔을 때
    transform: scale(1.25); // 전체 비율 1.25배
    background-color: #fff;
    color: #2e64fe;
  }
`;

export default Start;


