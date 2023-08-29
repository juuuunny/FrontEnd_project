import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import write from "../../css/Board/postingWrite.module.css";
import Navigation from "../../../components/js/navigation";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import menu from "../../../components/css/navigationMenu.module.css";
import { getBoardDetailApi } from "../../../apis/boardApi";
import { updateBoardApi } from "../../../apis/boardApi";

import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useRef } from "react";
import { useSelector } from "react-redux";

// 게시물 수정 페이지
function Update() {
  const navigate = useNavigate();
  const { postingId } = useParams();
  const editorRef = useRef();

  // 토큰이 있어야 수정이 가능하도록 설정
  const token = useSelector((state) => state.persistedReducer.user.userToken);

  // 해당 게시물 정보 받기
  const [board, setBoard] = useState({});

  const getBoard = async () => {
    try {
      const resp = await getBoardDetailApi(postingId);
      setBoard(resp.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getBoard();
  }, []);

  const { title } = board;

  const onChange = (event) => {
    const { value, name } = event.target;
    setBoard({
      ...board,
      [name]: value,
    });
  };

  // toast ui로 수정
  const toastUi = (e) => {
    setBoard({
      ...board,
      content: editorRef.current?.getInstance().getHTML(),
    });
  };

  // 수정 함수
  const updateBoard = async () => {
    try {
      let editConfirm = window.confirm("게시글을 수정 하시겠습니까?");
      if (editConfirm) {
        await updateBoardApi(board, token).then((res) => {
          alert("글이 수정되었습니다.");
          navigate("/posting/" + postingId);
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 뒤로가기 함수
  const backDetail = () => {
    navigate("/posting/" + postingId);
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
      {board.id ? (
        <div className={write.total}>
          <div
            style={{
              marginLeft: "5px",
              marginBottom: "15px",
              fontSize: "1.6rem",
              fontWeight: "bold",
              paddingBottom: "13px",
              borderBottom: "1px solid gray",
            }}
          >
            글 수정하기
          </div>

          <div className={write.totalTop}>
            <span>카테고리</span>
            <div className={write.cate} style={{ marginLeft: "180px" }}>
              <div style={{ marginLeft: "330px" }}>
                <label htmlFor="자유">자유</label>
                <input
                  id="자유"
                  type="radio"
                  name="category"
                  value="자유"
                  onChange={onChange}
                  checked={board.category === "자유"}
                ></input>
              </div>
              <div>
                <label htmlFor="질문">질문</label>
                <input
                  id="질문"
                  type="radio"
                  name="category"
                  value="질문"
                  onChange={onChange}
                  checked={board.category === "질문"}
                ></input>
              </div>
              <div>
                <label htmlFor="정보">정보</label>
                <input
                  id="정보"
                  type="radio"
                  name="category"
                  value="정보"
                  onChange={onChange}
                  checked={board.category === "정보"}
                ></input>
              </div>
              <div>
                <label htmlFor="구인/구직">구인/구직</label>
                <input
                  id="구인/구직"
                  type="radio"
                  name="category"
                  value="구인구직"
                  onChange={onChange}
                  checked={board.category === "구인구직"}
                ></input>
              </div>
            </div>
          </div>

          <input
            name="title"
            type="text"
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={onChange}
            className={write.title}
          />

          <Editor
            ref={editorRef}
            previewStyle="vertical"
            height="340px"
            initialEditType="wysiwyg"
            placeholder="내용을 작성해줴요."
            initialValue={board.content}
            useCommandShortcut={false}
            onChange={toastUi}
          ></Editor>

          <div className={write.buttonDiv}>
            <Button onClick={updateBoard}>수정</Button>
            <Button onClick={backDetail}>취소</Button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Update;
