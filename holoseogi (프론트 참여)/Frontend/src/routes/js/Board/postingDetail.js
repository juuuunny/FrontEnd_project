import Navigation from "../../../components/js/navigation";
import { Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import menu from "../../../components/css/navigationMenu.module.css";
import axios from "axios";
import Board from "../../../components/js/Board/Board";
import { useEffect, useState } from "react";
import { getBoardDetailApi } from "../../../apis/boardApi";

// 게시물 상세 페이지
function BoardDetail() {
  const { postingId } = useParams();
  const navigate = useNavigate();
  // 해당 postingId에 해당하는 게시물의 정보 가져오기
  const [board, setBoard] = useState({});

  const getBoard = async () => {
    try {
      const resp = await getBoardDetailApi(postingId);
      setBoard(resp.data);
      console.log(resp.data);
    } catch (err) {
      console.log(err.response.data.message);
      if (err.response.data.message === "객체를 찾을 수 없습니다.") {
        alert("회원탈퇴한 유저의 게시물입니다.");
        navigate("/posting");
      }
    }
  };
  useEffect(() => {
    getBoard();
  }, []);

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
          width: "1180px",
          marginTop: "300px",
          display: "flex",
        }}
      >
        {board.id ? (
          <Board
            id={board.id}
            title={board.title}
            boardContent={board.content}
            creatorId={board.creatorId}
            createDate={board.createDate}
            category={board.category}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default BoardDetail;
