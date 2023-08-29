import Navigation from "../../../components/js/navigation";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import menu from "../../../components/css/navigationMenu.module.css";
import home from "../../css/home.module.css";
import mypage from "../../css/mypage.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NullUserImg from "../../../components/img/user_img.png";
import passwordImg from "../../../components/img/Password.png";
import axios from "axios";

import {
  DeleteUser,
  UserInfo,
  menteeScroll,
  mentoScroll,
} from "../../../apis/UserApi";

import MentorPost from "../../../components/js/Mypage/MentorPost";
import MenteePost from "../../../components/js/Mypage/MenteePost";
import { logout } from "../../../redux/slices/userSlice";

// 첫 웹사이트 메인페이지
function Mypage() {
  const token = useSelector((state) => state.persistedReducer.user.userToken);
  const [user, setUser] = useState({});

  const userRole = useSelector((state) => state.persistedReducer.user.userRole);
  const [MentoringPost, setMentoringPost] = useState([]);
  console.log(MentoringPost);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getUserInfo = async () => {
    try {
      const resp = await UserInfo(token);
      setUser(resp.data);
    } catch (err) {
      console.error(err);
    }
  };
  const deleteUser = async () => {
    let deleteAlert = window.confirm("회원탈퇴를 하시겠습니까?");
    if (deleteAlert) {
      try {
        await DeleteUser(user.id).then((res) => {
          sessionStorage.removeItem("token");
          dispatch(logout());
          alert("회원탈퇴가 되었습니다.");
          navigate("/");
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (token === "") {
      alert("로그인 후 이용 가능한 서비스입니다.");
      navigate("/login");
    }
    if (userRole === "mentor") {
      mentoScroll(token)
        .then((res) => {
          console.log(res.data.content, "in axios");
          setMentoringPost(res.data.content);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      menteeScroll(token)
        .then((res) => {
          console.log(res.data.content, "in axios");
          setMentoringPost(res.data.content);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div style={{ width: "100%" }}>
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
              <Button>멘토멘티</Button>
            </Link>
          </div>
          <div>
            <Link to="/inquire" style={{ textDecoration: "none" }}>
              <Button>문의</Button>
            </Link>
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: "270px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div>
          <div className={mypage.profile}>
            <div className={mypage.profileTop}>프로필</div>
            <div style={{ display: "flex", marginTop: "54px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "34px",
                  width: "120px",
                  height: "120px",
                  borderRadius: "16px",
                  background: "#F1F1F1",
                  boxShadow: "0px 4px 10px 0px rgba(102, 193, 9, 0.20)",
                }}
              >
                <img
                  src={user.img !== "null" ? user.img : NullUserImg}
                  alt="User"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "20px",
                  }}
                />
              </div>
              <div className={mypage.userBox}>
                <div style={{ fontSize: "18px" }}>{user.name}</div>

                <div style={{ marginTop: "14px" }}>나이 : {user.age}세</div>
                <div>전화 번호 : {user.phone}</div>
                <div>E-mail : {user.email}</div>
                <div>주 거주 지역 : {user.region}</div>
              </div>
            </div>
          </div>
          <div className={mypage.profile} style={{ marginTop: "43px" }}>
            <div className={mypage.profileSelect}>내 정보관리</div>
            <div style={{ display: "flex", marginTop: "54px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "34px",
                  width: "120px",
                  height: "120px",
                  borderRadius: "16px",
                  background: "white",
                }}
              >
                <img
                  src={passwordImg}
                  alt="passwordImg"
                  style={{
                    width: "110px",
                    height: "110px",
                    borderRadius: "20px",
                  }}
                />
              </div>
              <div className={mypage.userBox} style={{ marginTop: "16px" }}>
                <Link
                  to="/changeInfo"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div style={{ cursor: "pointer", fontWeight: "600" }}>
                    개인정보변경
                  </div>
                </Link>
                <Link
                  to="/changeInfo"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div
                    style={{
                      marginTop: "12px",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    비밀번호변경
                  </div>
                </Link>
                <div
                  style={{
                    marginTop: "12px",

                    fontWeight: "600",
                  }}
                >
                  <Button
                    style={{
                      border: "none",
                      backgroundColor: "inherit",
                      fontWeight: "600",
                      fontSize: "14px",
                      marginLeft: "-4px",
                      cursor: "pointer",
                    }}
                    onClick={deleteUser}
                  >
                    회원탈퇴
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={mypage.mento}>
          {console.log("멘토리", MentoringPost)}

          {userRole == "mentor" ? (
            <div>
              <h3 style={{ marginLeft: "20px" }}>내가 쓴 멘토링 글</h3>
              <div style={{ overflowY: "scroll", height: "536px" }}>
                {MentoringPost.map((e) => {
                  return <MentorPost postingInfo={e} />;
                })}
              </div>
            </div>
          ) : (
            <div>
              <h3 style={{ marginLeft: "20px" }}>내가 참여한 멘티 프로그램</h3>
              <div style={{ overflowY: "scroll", height: "536px" }}>
                {MentoringPost.map((e) => {
                  return <MenteePost postingInfo={e} />;
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 가장 아래 footer부분 */}
      <div className={home.footer}>
        <div className={home.footerLeft}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <h2>홀로서기</h2>
          </Link>
          <p>청소년f 자립 지원 공공 서비스</p>
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

export default Mypage;
