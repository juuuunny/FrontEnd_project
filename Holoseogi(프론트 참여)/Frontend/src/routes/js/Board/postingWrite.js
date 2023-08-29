import Navigation from "../../../components/js/navigation";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import menu from "../../../components/css/navigationMenu.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import write from "../../css/Board/postingWrite.module.css";
import { writeBoardApi } from "../../../apis/boardApi";
import { useSelector } from "react-redux";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useRef } from "react";

// 게시물 작성 페이지
function Write() {
  const navigate = useNavigate();

  // 로그인 한 사용자의 정보받기
  const token = useSelector((state) => state.persistedReducer.user.userToken);

  // post로 보내기 위하여 입력한 정보들 board에 저장하기
  const [board, setBoard] = useState({
    title: "",
    content: "",
    category: "자유",
  });

  const { title } = board;

  const onChange = (event) => {
    const { value, name } = event.target;
    setBoard({
      ...board,
      [name]: value,
    });
  };

  // content는 toast ui로 입력받는다.(엔터 적용되게 하기 위해)
  const editorRef = useRef();
  const toastUi = (e) => {
    setBoard({
      ...board,
      content: editorRef.current?.getInstance().getHTML(),
    });
  };

  // 글쓰기 함수
  const writeBoard = async () => {
    try {
      await writeBoardApi(board, token).then((res) => {
        alert("글이 등록되었습니다.");
        navigate("/posting");
      });
    } catch (err) {
      console.log(err);
    }
  };

  // 뒤로가기 함수
  const backBoard = () => {
    navigate("/posting");
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

      {/* 글쓰는 메인 부분 */}
      <div className={write.total}>
        <div
          style={{
            marginLeft: "6px",
            marginBottom: "16px",
            fontSize: "1.6rem",
            fontWeight: "bold",
            paddingBottom: "14px",
            borderBottom: "1px solid gray",
          }}
        >
          게시판 새 글 작성하기
        </div>

        <div className={write.totalTop}>
          <span>카테고리</span>
          {/* 카테고리 선택 부분 */}
          <div className={write.cate}>
            <div style={{ marginLeft: "540px" }}>
              <label htmlFor="자유">자유</label>
              <input
                id="자유"
                type="radio"
                name="category"
                value="자유"
                onChange={onChange}
                defaultChecked
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
          placeholder="내용을 입력해주세요."
          previewStyle="vertical"
          height="340px"
          initialEditType="wysiwyg"
          useCommandShortcut={false}
          onChange={toastUi}
        ></Editor>

        <div className={write.buttonDiv}>
          <Button onClick={writeBoard}>올리기</Button>
          <Button onClick={backBoard}>취소</Button>
        </div>
      </div>
    </div>
  );
}

export default Write;
