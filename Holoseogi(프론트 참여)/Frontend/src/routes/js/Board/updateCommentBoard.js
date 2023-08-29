import Navigation from "../../../components/js/navigation";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import menu from "../../../components/css/navigationMenu.module.css";
import { useEffect, useState } from "react";
import UpdateCommentBoard from "../../../components/js/Board/updateComment";
import { getBoardDetailApi } from "../../../apis/boardApi";

// 댓글 수정 페이지
function Modifycomment() {
  const { postId, commentId } = useParams();

  // 게시물 정보 받기
  const [board, setBoard] = useState({});

  const getBoard = async () => {
    try {
      const resp = await getBoardDetailApi(postId);
      setBoard(resp.data);
    } catch (err) {
      console.log(err);
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

      {/* 수정페이지의 게시물 부분 */}
      <div
        style={{ marginTop: "50px", display: "flex", justifyContent: "center" }}
      >
        {board.id ? (
          <UpdateCommentBoard
            id={board.id}
            title={board.title}
            boardContent={board.content}
            creatorId={board.creatorId}
            createDate={board.createDate}
            category={board.category}
            commentId={commentId}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Modifycomment;
