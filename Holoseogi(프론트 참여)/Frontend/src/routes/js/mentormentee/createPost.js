import Navigation from "../../../components/js/navigation";

import post from "../../css/createPost.module.css";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import home from "../../css/home.module.css";
import menu from "../../../components/css/navigationMenu.module.css";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { createPost } from "../../../apis/mentorMentee";
import { useEffect } from "react";
function CreatePost() {
  const accessToken = useSelector(
    (state) => state.persistedReducer.user.userToken
  );
  const registor = useSelector((state) => state.persistedReducer.user.userName);
  const [mainText, setMainText] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [recruit, setRecruit] = useState("");

  const today = new Date();
  const navigate = useNavigate();

  const registDay =
    today.getFullYear() + "." + (today.getMonth() + 1) + "." + today.getDate();

  const handleRecruit = (e) => {
    setRecruit(e.target.value);
  };
  const handleMainText = (e) => {
    setMainText(e.target.value);
    console.log(mainText);
  };
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const posting = () => {
    const contentsReplaceNewline = () => {
      return mainText.replaceAll("<br>", "\r\n");
    };

    if (title === "" || category === "" || recruit === "" || mainText === "") {
      alert("정보를 모두 기입 후 작성 완료버튼을 눌러주세요");
    } else {
      createPost(
        {
          title: title,
          description: contentsReplaceNewline(),
          category: category,
          limited: recruit,
        },
        accessToken
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
              onChange={handleTitle}
              placeholder="제목을 입력해주세요"
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
              onClick={handleCategory}
              className={post.subTitle}
              style={{ width: "270px" }}
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
              onClick={handleRecruit}
              className={post.subTitle}
              style={{ width: "270px" }}
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
              placeholder="글을 작성하세요"
              className={post.mainTextInput}
            ></textarea>
          </div>

          <button className={post.createBtn} onClick={posting}>
            작성하기
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
export default CreatePost;
