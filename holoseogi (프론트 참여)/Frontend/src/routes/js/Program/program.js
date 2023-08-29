import Navigation from "../../../components/js/navigation";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import menu from "../../../components/css/navigationMenu.module.css";
import { useState } from "react";
import post from "../../css/Program/program.module.css";
import ProgramTotal from "../../../components/js/Program/programTotal";
import ProgramPub from "../../../components/js/Program/programPub";
import ProgramPrivate from "../../../components/js/Program/programPrivate";
import ProgramHouse from "../../../components/js/Program/house";
import ProgramCash from "../../../components/js/Program/cash";
import ProgramJob from "../../../components/js/Program/job";
import ProgramFurEducation from "../../../components/js/Program/furEducation";
import ProgramEtc from "../../../components/js/Program/etc";

// 지원 프로그램 페이지
function Program() {
  // 해당 항목의 프로그램들을 가져오기 위해서 number 변수를 설정해준다.
  const [number, setNumber] = useState("0");
  const totalButton = () => {
    setNumber("0");
  };
  const publicButton = () => {
    setNumber("1");
  };
  const privateButton = () => {
    setNumber("2");
  };
  const number3 = () => {
    setNumber("3");
  };
  const number4 = () => {
    setNumber("4");
  };
  const number5 = () => {
    setNumber("5");
  };
  const number6 = () => {
    setNumber("6");
  };
  const number7 = () => {
    setNumber("7");
  };

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
            <Button style={{ color: "#66c109" }}>프로그램</Button>
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

      {/* 프로그램의 주관사 선택 부분 */}
      <div className={post.firstButton}>
        <span>주관사</span>
        <Button onClick={totalButton} data-checked={number === "0"}>
          전체
        </Button>
        <Button onClick={publicButton} data-checked={number === "1"}>
          공공
        </Button>
        <Button onClick={privateButton} data-checked={number === "2"}>
          민간
        </Button>
      </div>
      {/* 프로그램의 카테고리 선택 부분 */}
      <div className={post.secondButton}>
        <span>카테고리</span>
        <Button onClick={number3} data-checked={number === "3"}>
          주거
        </Button>
        <Button onClick={number4} data-checked={number === "4"}>
          취업
        </Button>
        <Button onClick={number5} data-checked={number === "5"}>
          금융
        </Button>
        <Button onClick={number6} data-checked={number === "6"}>
          진학
        </Button>
        <Button onClick={number7} data-checked={number === "7"}>
          기타
        </Button>
      </div>

      {/* 해당하는 프로그램들 나오도록 하기 */}
      <div
        style={{
          borderRadius: "16px",
          margin: "20px",
          width: "1180px",
          height: "1262px",
          backgroundColor: "white",
          overflowY: "scroll",
        }}
      >
        <div
          style={{
            marginLeft: "100px",
            width: "980px",
            borderBottom: "1px solid #444",
            paddingBottom: "10px",
          }}
        >
          <div
            style={{
              color: "#444",
              fontSize: "26px",
              fontStyle: "normal",
              fontWeight: "700",
              lineHeight: "normal",
              marginTop: "26px",
            }}
          >
            지원 프로그램
          </div>
          <div
            style={{
              marginTop: "5px",
              color: "#ADADAD",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: "700",
              lineHeight: "normal",
            }}
          >
            정부 기관에서 주관하는 자립 지원 정보들을 확인하실 수 있습니다.
          </div>
        </div>
        {number === "0" ? (
          <ProgramTotal />
        ) : number === "1" ? (
          <ProgramPub />
        ) : number === "2" ? (
          <ProgramPrivate />
        ) : number === "3" ? (
          <ProgramHouse />
        ) : number === "4" ? (
          <ProgramJob />
        ) : number === "5" ? (
          <ProgramCash />
        ) : number === "6" ? (
          <ProgramFurEducation />
        ) : (
          <ProgramEtc />
        )}
      </div>
    </div>
  );
}

export default Program;
