import Navigation from "../../../components/js/navigation";

import post from "../../css/createPost.module.css";
import { useState } from "react";
import { viewPostDetail } from "../../../apis/mentorMentee";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import home from "../../css/home.module.css";
import menu from "../../../components/css/navigationMenu.module.css";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { editPost } from "../../../apis/mentorMentee";
function EditPost() {
  const navigate = useNavigate();
  const accessToken = useSelector(
    (state) => state.persistedReducer.user.userToken
  );
  const registor = useSelector((state) => state.persistedReducer.user.userName);
  const [mainText, setMainText] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [recruit, setRecruit] = useState("");
  const [postInfo, setPostInfo] = useState({});
  const today = new Date();
  const postingId = useParams().postingId;
  const registDay =
    today.getFullYear() + "." + (today.getMonth() + 1) + "." + today.getDate();
  const handleRecruit = (e) => {
    setRecruit(e.target.value);
  };
  const handleMainText = (e) => {
    setMainText(e.target.value);
  };
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleCategory = (e) => {
    setCategory(e.target.value);
    console.log(title, category, recruit, mainText);
  };
  useEffect(() => {
    viewPostDetail(postingId, accessToken)
      .then(function (res) {
        setPostInfo(res.data);
        setTitle(res.data.title);
        setCategory(res.data.category);
        setRecruit(res.data.limited);
        setMainText(res.data.description);
        console.log(postInfo, "포스트 정보");
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);
  const editRequest = () => {
    if (title === "" || category === "" || recruit === "" || mainText === "") {
      alert("정보를 모두 기입 후 수정하기 버튼을 눌러주세요");
    } else {
      editPost(
        {
          title: title,
          description: mainText,
          category: category,
          limited: recruit,
        },
        accessToken,
        postingId
      )
        .then(function (res) {
          console.log(res);
          navigate("/postlist");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  function subTitleBack(input, flag) {
    return flag == "1" ? (
      <div className={post.subTitle}>{input}</div>
    ) : (
      <div className={post.subTitle} style={{ background: "#EAEAEA" }}>
        {input}
      </div>
    );
  }

  const [isPopup, setIsPopup] = useState(false);

  return (
    <div>
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
              <Button style={{ color: "none" }}>홈</Button>
            </Link>
          </div>
          <div>
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
              <Button style={{ color: "#66c109" }}>멘토멘티</Button>
            </Link>
          </div>
          <div>
            <Link to="/inquire" style={{ textDecoration: "none" }}>
              <Button>문의</Button>
            </Link>
          </div>
        </div>

        <div className={post.postBox}>
          <div className={post.postTitle}>
            <input
              defaultValue={postInfo.title}
              onChange={handleTitle}
              className={post.titleText}
            ></input>
          </div>
          <hr className={post.line}></hr>
          <div className={post.subTitleBox}>
            {subTitleBack("등록자명", 0)} {subTitleBack(registor, 1)}
            {subTitleBack("등록일", 0)} {subTitleBack(registDay, 1)}
          </div>
          <hr className={post.line}></hr>
          <div className={post.subTitleBox}>
            {subTitleBack("분류", 0)}
            <select
              onChange={handleCategory}
              className={post.subTitle}
              style={{ width: "270px" }}
              value={postInfo.category}
            >
              <option value="" disabled selected>
                분류 선택
              </option>
              <option value={"법률"}>법률</option>
              <option value={"상담"}>상담</option>
              <option value={"기타"}>기타</option>
            </select>
            {subTitleBack("모집 ", 0)}
            <select
              onChange={handleRecruit}
              className={post.subTitle}
              style={{ width: "270px" }}
              value={postInfo.limited}
            >
              <option value="" disabled selected>
                인원 선택
              </option>
              <option value={"1"}>1</option>
              <option value={"2"}>2</option>
              <option value={"3"}>3</option>
              <option value={"4"}>4</option>
              <option value={"5"}>5</option>
            </select>
          </div>
          <hr className={post.line}></hr>

          <div className={post.mainText}>
            <textarea
              onChange={handleMainText}
              defaultValue={postInfo.description}
              className={post.mainTextInput}
            ></textarea>
          </div>

          <button className={post.createBtn} onClick={editRequest}>
            수정하기
          </button>
        </div>

        {isPopup ? "POPUP" : ""}
      </div>
      {/* <Footer /> */}

      <div className={home.footer}>
        <div className={home.footerLeft}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <h2>홀로서기</h2>
          </Link>
          <p>청소년 자립 지원 공공 서비스</p>
          <div>연락처 : 010-4470-2175</div>
          <div>이메일 : chandelier7642@gmail.com</div>
          <div>주소 : 세종대학교 학생회관 B123</div>
        </div>
        <div className={home.footerRight}>
          <div className={home.footerAgency}>
            <h4>협업 정부 기관</h4>
            <div>여성가족부</div>
            <div>청소년자립지원단</div>
            <div>한국청소년상담복지개발원</div>
            <div>한국청소년정책연구원</div>
            <div>한국청소년활동진흥원</div>
          </div>
          <div className={home.footerSponsor}>
            <h4>후원사</h4>
            <div>삼성재단</div>
            <div>LG재단</div>
            <div>카카오</div>
          </div>
          <div className={home.footerSpon}>
            <h4>후원</h4>
            <div>후원 문의</div>
            <div>1644-1211</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditPost;
