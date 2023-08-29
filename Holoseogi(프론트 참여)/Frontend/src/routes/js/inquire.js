import Navigation from "../../components/js/navigation";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import menu from "../../components/css/navigationMenu.module.css";
import { useEffect, useState } from "react";
import homeMap from "../../components/img/homemap.png";

// 게시물 상세 페이지
function Inquire() {
  return (
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

      {/* 메뉴 부분 */}
      <div className={menu.menu}>
        <div>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button>홈</Button>
          </Link>
        </div>
        <div className={menu.post}>
          <Link to="/posting" style={{ textDecoration: "none" }}>
            <Button>게시판</Button>
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
            <Button style={{ color: "#66c109" }}>문의</Button>
          </Link>
        </div>
      </div>
      <div
        style={{
          width: "1180px",
          height: "4px",
          borderBottom: "1px solid #d9d9d9",
          marginTop: "290px",
        }}
      ></div>
      <div
        style={{
          width: "980px",
          height: "1003px",
          display: "flex",
          margin: "44px auto 262px",
          backgroundColor: "white",
          diplay: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ marginTop: "93px", marginLeft: "620px" }}>
          <Link
            to="http://map.naver.com/v5/search/%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EA%B4%91%EC%A7%84%EA%B5%AC%20%EB%8A%A5%EB%8F%99%EB%A1%9C%20209/address/14145800.060003486,4516255.989162069,%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EA%B4%91%EC%A7%84%EA%B5%AC%20%EB%8A%A5%EB%8F%99%EB%A1%9C%20209,new?c=16,0,0,0,dh&isCorrectAnswer=true"
            target="_blank"
          >
            <Button
              style={{
                width: "129px",
                height: "30px",
                backgroundColor: "#66C109",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              네이버 지도보기
            </Button>
          </Link>{" "}
          <Link
            to="http://www.google.co.kr/maps/place/%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C+%EA%B4%91%EC%A7%84%EA%B5%AC+%EB%8A%A5%EB%8F%99%EB%A1%9C+209/data=!4m6!3m5!1s0x357ca4d0480e0b61:0xa888e407e45da527!8m2!3d37.5507345!4d127.0741314!16s%2Fg%2F11bzl0pqq4?hl=ko&entry=ttu"
            target="_blank"
          >
            <Button
              style={{
                width: "129px",
                height: "30px",
                backgroundColor: "#66C109",
                color: "white",
                border: "none",
                cursor: "pointer",
                marginLeft: "10px",
              }}
            >
              구글 지도보기
            </Button>
          </Link>
        </div>
        <div
          style={{ display: "flex", marginLeft: "124px", marginTop: "22px" }}
        >
          <div
            style={{
              color: "#444",
              fontSize: "18px",
              fontWeight: "700",
              fontStyle: "normal",
              lineHeight: "normal",
            }}
          >
            찾아오시는 길
          </div>
          <img
            src={homeMap}
            alt="세종대 총학생회관"
            style={{
              marginLeft: "18px",
              width: "649px",
              height: "418px",
              boxShadow: " 0px 4px 4px 0px rgba(102, 193, 9, 0.20)",
            }}
          />
        </div>
        <div
          style={{
            marginLeft: "120px",
            marginTop: "57px",
            color: "#444",
            fontSize: "16px",
            fontWeight: "700",
            fontStyle: "normal",
          }}
        >
          <div>주소</div>
          <div
            style={{
              width: "254px",
              height: "38px",
              textAlign: "center",
              marginTop: "4px",
            }}
          >
            05006 서울특별시 광진구 능동로 209 세종대학교 학생회관 304B
          </div>
        </div>
        <div style={{ marginTop: "18px", marginLeft: "120px" }}>
          <div
            style={{
              color: "#444",
              fontSize: "16px",
              fontWeight: "700",
              fontStyle: "normal",
            }}
          >
            대표전화
          </div>
          <div
            style={{
              marginTop: "10px",
              color: "#444",
              fontSize: "14px",
              fontWeight: "500",
              fontStyle: "normal",
            }}
          >
            02)2000-0000
          </div>
        </div>
        <div style={{ marginTop: "22px", marginLeft: "120px" }}>
          <div
            style={{
              color: "#444",
              fontSize: "16px",
              fontWeight: "700",
              fontStyle: "normal",
            }}
          >
            지하철 노선 안내
          </div>
          <div style={{ marginTop: "10px", display: "flex" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "12px",
                padding: "2px 6px",
                fontWeight: "500",
                width: "37px",
                height: "18px",
                backgroundColor: "#3F6043",
                color: "white",
              }}
            >
              7호선
            </div>
            <div
              style={{
                marginLeft: "8px",
                color: "#444",
                fontSize: "14px",
                fontWeight: "500",
                fontStyle: "normal",
              }}
            >
              어린이대공원 6번 출구
            </div>
          </div>
        </div>
        <div
          style={{
            marginLeft: "120px",
            marginTop: "25px",
          }}
        >
          <div
            style={{
              color: "#444",
              fontSize: "16px",
              fontWeight: "700",
              fontStyle: "normal",
            }}
          >
            이메일
          </div>
          <div
            style={{
              color: "#444",
              fontSize: "14px",
              fontWeight: "500",
              fontStyle: "normal",
            }}
          >
            chandelier7642@gmail.com
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inquire;
