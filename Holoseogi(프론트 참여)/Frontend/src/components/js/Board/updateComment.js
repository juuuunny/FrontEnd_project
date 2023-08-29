import React, { useEffect, useState } from "react";
import user_img from "../../img/user_img.png";
import update from "../../css/Board/updateComment.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { getCommentApi } from "../../../apis/boardApi";
import { updateCommentApi } from "../../../apis/boardApi";
import { useSelector } from "react-redux";
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

// 댓글 수정시 해당 게시물 보이기 및 댓글 수정(update_comment_board 아래)
function Update_caption({
  id,
  title,
  boardContent,
  creatorId,
  createDate,
  category,
  commentId,
}) {
  const navigate = useNavigate();

  // 로그인 한 user의 정보 저장
  const state_userid = useSelector(
    (state) => state.persistedReducer.user.userId
  );
  const token = useSelector((state) => state.persistedReducer.user.userToken);

  // 해당 댓글 수정을 위해 new_comment 오브젝트 선언
  const [new_comment, setNew_comment] = useState({
    id: commentId,
    postId: id,
    creatorId: state_userid,
    content: "",
  });

  const getComment = async () => {
    try {
      const resp = await getCommentApi(id, commentId);
      setNew_comment(resp.data);
    } catch (err) {
      console.log(err);
    }
  };

  const { content } = new_comment;

  const onChange = (event) => {
    const { value, name } = event.target;
    setNew_comment({
      ...new_comment,
      [name]: value,
    });
  };

  useEffect(() => {
    getComment();
  }, []);

  // 댓글 수정 함수
  const updateComment = async () => {
    try {
      let updateConfirm = window.confirm("댓글을 수정 하시겠습니까?");

      if (updateConfirm) {
        await updateCommentApi(new_comment, token).then((res) => {
          alert("댓글이 수정되었습니다.");
          navigate(`/posting/${id}`);
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 수정취소 부분
  const backDetail = () => {
    navigate("/posting/" + id);
  };

  return (
    <div
      style={{
        marginTop: "220px",
        width: "1180px",
        height: "760px",
        background: "#fff",
        boxShadow: "0px 4px 4px 0px rgba(102, 193, 9, 0.2)",
        borderRadius: "16px",
        marginBottom: "100px",
      }}
    >
      {/* 게시판 카테고리 보여주는 부분 */}
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
              {createDate.substring(0, 10)} {createDate.substring(11, 19)}
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
      </div>

      <div
        style={{
          margin: "16px 10px 10px 100px",
          fontWeight: "bold",
          fontSize: "1.1rem",
          width: "980px",
          paddingLeft: "12px",
        }}
      >
        댓글 수정
      </div>

      {/* 댓글 수정하는 부분 */}
      <div
        style={{
          borderBottom: "1px solid lightgray",
          paddingTop: "20px",
          borderTop: "1px solid gray",
          marginLeft: "100px",
          width: "980px",
        }}
      >
        <div style={{ display: "flex" }}>
          <div>
            <img style={{ width: "30px" }} src={user_img} alt="user" />
          </div>
          <div style={{ marginLeft: "8px", marginTop: "2px" }}>익명</div>
        </div>
        <div style={{ marginTop: "8px" }}>
          <input
            name="content"
            type="text"
            placeholder="댓글 수정을 해주세요"
            value={content}
            onChange={onChange}
            className={update.comment}
          />
        </div>
        <div
          style={{
            display: "flex",
            position: "relative",
            marginBottom: "20px",
          }}
        >
          <div style={{ marginTop: "12px", fontSize: "0.9rem" }}></div>
          <div className={update.caption_btn}>
            <Button
              onClick={updateComment}
              style={{
                marginLeft: "830px",
                backgroundColor: "#66c109",

                borderRadius: "6px",
                border: " none",
                height: "25px",
                width: "55px",
                cursor: "pointer",
              }}
            >
              저장
            </Button>
            <Button
              style={{
                marginLeft: "10px",
                width: "55px",
                height: "25px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
              }}
              onClick={backDetail}
            >
              취소
            </Button>
          </div>
        </div>
      </div>

      <div style={{ paddingBottom: "80px" }}></div>
    </div>
  );
}

export default Update_caption;
