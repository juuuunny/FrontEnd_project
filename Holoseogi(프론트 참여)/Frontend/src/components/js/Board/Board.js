import React, { useEffect, useState } from "react";
import user_img from "../../img/user_img.png";
import board from "../../css/Board/board.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import Comment from "./Comment.js";
import { deleteBoardApi } from "../../../apis/boardApi";
import { writeCommentApi } from "../../../apis/boardApi";
import { getCommentListApi } from "../../../apis/boardApi";
import { useSelector } from "react-redux";
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import Pagination from "react-js-pagination";

// 게시물 정보 보여주는 부분 (posting_detail아래)
function Board({ id, title, boardContent, creatorId, createDate, category }) {
  const navigate = useNavigate();
  // 로그인한 사용자의 userid와 게시물의 작성자 userid가 갔을 경우에만 수정,삭제 가능하게
  const state_userid = useSelector(
    (state) => state.persistedReducer.user.userId
  );
  const token = useSelector((state) => state.persistedReducer.user.userToken);

  // 페이지네이션을 위한 페이지 처리
  const [page, setPage] = useState(1);
  // 페이지 이동함수
  const handlePageChange = (page) => {
    setPage(page);
  };
  // 수정하는 부분
  const moveToupdate = () => {
    navigate(`/update/${id}`);
  };

  // 삭제하는 부분
  const deleteBoard = async () => {
    try {
      let DeleteConfirm = window.confirm("게시글을 삭제 하시겠습니까?");
      if (DeleteConfirm) {
        await deleteBoardApi(id, token).then((res) => {
          alert("삭제되었습니다.");
          navigate("/posting");
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 새롭게 쓰는 댓글 정보
  const [newComment, setNewComment] = useState({
    postId: id,
    content: "",
  });

  const { content } = newComment;

  const onChange = (event) => {
    const { value, name } = event.target;
    setNewComment({
      ...newComment,
      [name]: value,
    });
  };

  // 댓글 수 number 변수
  const [number, setNumber] = useState(0);

  // 댓글 작성 함수
  const writeComment = async () => {
    try {
      token === ""
        ? alert("로그인을 진행해주세요.")
        : await writeCommentApi(newComment, token).then((res) => {
            alert("댓글이 작성되었습니다.");

            setNewComment({
              ...newComment,
              content: "",
            });

            navigate(`/posting/${id}`);
          });
    } catch (err) {
      console.log(err);
    }
  };

  const [commentlist, setCommentlist] = useState([]);
  const [totalitemComment, setTotalitemComment] = useState();
  // 모든 댓글들 가져오기
  const getCommentlist = async () => {
    try {
      const resp = await getCommentListApi(id, page);
      setCommentlist(resp.data.content);
      setTotalitemComment(resp.data.totalElements);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCommentlist();
  }, [page, writeComment]);

  return (
    <div
      style={{
        position: "relative",
        marginTop: "-30px",
        width: "1180px",

        height: "1500px",

        background: "#fff",
        boxShadow: "0px 4px 4px 0px rgba(102, 193, 9, 0.2)",
        borderRadius: "16px",
        marginBottom: "100px",
      }}
    >
      {/* 어떤 게시판인지 보여주는 부분 */}
      <div
        style={{
          marginTop: "20px",
          marginLeft: "100px",
          width: "970px",
          fontSize: "1.5rem",
          height: "36px",
          border: "1px solid gray",
          padding: "12px 0px 12px 20px",
          borderRadius: "6px",
          fontWeight: "bold",
          marginBottom: "14px",
        }}
      >
        {category} 게시판
      </div>
      {/* 게시물 정보 보여주는 부분 */}
      <div
        style={{
          width: "980px",
          height: "366px",
          paddingLeft: "10px",
          border: "1px solid gray",
          marginLeft: "100px",
          borderRadius: "6px",
        }}
      >
        <div
          style={{
            display: "flex",
            marginTop: "20px",
            borderBottom: "1px solid lightgray",
            paddingBottom: "10px",
            marginLeft: "12px",
            width: "940px",
          }}
        >
          <div>
            <img src={user_img} alt="user_img" style={{ width: "40px" }} />
          </div>
          <div style={{ marginLeft: "14px" }}>
            <div style={{ fontWeight: "700", fontSize: "1rem" }}>익명</div>
            <div style={{ fontSize: "0.9rem" }}>
              {(createDate + "").substring(0, 10)}{" "}
              {(createDate + "").substring(11, 19)}
            </div>
          </div>
        </div>
        <div
          style={{
            borderBottom: "1px solid lightgray",
            width: "920px",
            padding: "14px 10px",
            fontSize: "1.4rem",
            fontWeight: "bold",
            marginLeft: "10px",
          }}
        >
          {title}
        </div>

        <div
          style={{
            marginLeft: "28px",
            marginTop: "10px",
            height: "170px",
            overflowY: "scroll",
            marginRight: "30px",
          }}
        >
          {boardContent && <Viewer initialValue={boardContent} />}
        </div>

        {/* 자기가 쓴 게시물인 것이 확인 될 시 보이도록 설정 */}
        {state_userid === creatorId && totalitemComment === 0 ? (
          <div className={board.btn}>
            {/* 수정삭제는 게시글의 user이름과 사용자의 user이름이 같을 경우만 */}
            <Button onClick={moveToupdate}>수정</Button>
            <Button onClick={deleteBoard}>삭제</Button>
          </div>
        ) : (
          <div className={board.btn}></div>
        )}
      </div>
      {/* 전체 댓글 수 */}
      <div
        style={{ margin: "16px 106px", fontWeight: "bold", fontSize: "1.1rem" }}
      >
        댓글 {totalitemComment}
      </div>
      {/* 댓글 작성 부분 */}
      <div
        style={{ marginLeft: "100px", position: "relative", width: "980px" }}
      >
        <input
          name="content"
          type="text"
          placeholder="댓글을 입력해주세요."
          value={content}
          onChange={onChange}
          className={board.comment}
          style={{ marginLeft: "8px", width: "840px" }}
        />
        <Button
          onClick={writeComment}
          style={{
            position: "absolute",
            right: "4px",
            top: "16px",
            width: "76px",
            height: "36px",
            backgroundColor: "#66c109",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          등록
        </Button>
      </div>
      <div style={{ height: "740px" }}>
        {/* 해당 게시물의 작성된 댓글들 보여주는 부분 */}

        {commentlist.map((event) => {
          return (
            <Comment
              id={event.id}
              content={event.content}
              postId={event.postId}
              creatorId={event.creatorId}
              createDate={event.createDate}
            />
          );
        })}
      </div>

      {/* 페이지네이션 처리 */}
      <div
        style={{
          display: "flex",
          margin: "0px auto",
          width: "450px",
          height: "60px",
          justifyContent: "center",
          marginTop: "84px",
        }}
      >
        <Pagination
          activePage={page}
          itemsCountPerPage={6}
          totalItemsCount={totalitemComment}
          pageRangeDisplayed={5}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={handlePageChange}
        />
      </div>
      <div style={{ paddingBottom: "80px" }}></div>
    </div>
  );
}

export default Board;
