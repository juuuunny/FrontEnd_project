import Navigation from "../../../components/js/navigation";
import nullImg from "../../../components/img/user_img.png";
import home from "../../css/home.module.css";
import post from "../../css/post.module.css";
import { useEffect, useState } from "react";
import apply from "../../css/mentorMentee/menteeApply.module.css";
import { Link, useParams } from "react-router-dom";
import menu from "../../../components/css/navigationMenu.module.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  applyMentee,
  applyMentoring,
  deletePost,
  endMentoring,
  viewPostDetail,
} from "../../../apis/mentorMentee";
import { useSelector } from "react-redux";
function ViewPost() {
  const userRole = useSelector((state) => state.persistedReducer.user.userRole);
  const mentee = useSelector((state) => state.persistedReducer.user);
  const userId = useSelector((state) => state.persistedReducer.user.userId);
  const navigate = useNavigate();
  const accessToken = useSelector(
    (state) => state.persistedReducer.user.userToken
  );
  const postingId = useParams().postingId;
  const [description, setDescription] = useState("");
  const [isPopup, setIsPopup] = useState(false);
  const [menteePopup, setMenteePopup] = useState(false);
  const [mentees, setMentees] = useState([]);
  const [popupMentee, setPopupMentee] = useState({});

  const [info, setInfo] = useState({
    mentorInfo: "",
    isReceipt: "",
    title: "",
    description: "",
    category: "",
    limited: "",
    name: "",
    count: "",
    createDate: "",
  });

  useEffect(() => {
    if (accessToken === "") {
      alert("로그인을 진행해주세요!");
      navigate("/login");
    } else {
      viewPostDetail(postingId, accessToken)
        .then(function (res) {
          console.log(res.data);
          setMentees(res.data.menteees);
          setInfo({
            mentorInfo: res.data.mentorInfo,
            isReceipt: res.data.isReceipt,
            title: res.data.title,
            description: res.data.description,
            category: res.data.category,
            limited: res.data.limited,
            name: res.data.mentorInfo.name,
            count: res.data.count,
            createDate: res.data.createDate.slice(0, 10),
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  }, []);

  function subTitleBack(input, flag) {
    return flag == "1" ? (
      <div className={post.subTitle}>{input}</div>
    ) : (
      <div className={post.subTitle} style={{ background: "#EAEAEA" }}>
        {input}
      </div>
    );
  }
  const handlePopup = () => {
    if (accessToken === undefined) {
      alert("로그인 해주세요.");
      navigate("/login");
    } else setIsPopup(!isPopup);
  };
  const handleMenteePopup = () => {
    setMenteePopup(!menteePopup);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const deleteRequest = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deletePost(postingId).then((res) => {
        navigate("/postlist");
        alert("삭제되었습니다.");
      });
    } else {
      alert("취소합니다.");
    }
  };
  const endRequest = () => {
    endMentoring(postingId).then(() => {
      setInfo({ isReceipt: false });
      navigate("/postlist");
      alert("마감되었습니다.");
    });
  };

  const applyRequest = () => {
    if (info.isReceipt === false) {
      alert("마감되었습니다.");
      navigate("/postlist");
    } else if (description === "") {
      alert("지원동기를 입력하십시오.");
    } else {
      applyMentoring(postingId, description, accessToken)
        .then((res) => {
          alert("지원이 완료되었습니다!");
          navigate("/postlist");
        })
        .catch((err) => {
          alert(err.response.data.message);
          navigate("/postlist");
        });
    }
  };

  const handleMenteePopupCancel = () => {
    setMenteePopup(false);
  };
  const handlePopupCancel = () => {
    setIsPopup(false);
  };

  return (
    <div>
      {isPopup ? (
        <div>
          <div className={post.applyPopup}>
            <button onClick={handlePopupCancel} className={post.popupCancel}>
              x
            </button>
            <p className={post.applyTitle}>멘티 지원</p>
            <div className={apply.applyInputBox}>
              <div
                style={{
                  display: "flex",
                  width: "428px",
                  margin: "0 auto",
                }}
              >
                <div style={{ width: "200px" }}>
                  <p className={post.popupText}>성함</p>
                  <div className={apply.applyInput} style={{ width: "200px" }}>
                    <p className={apply.text}> {mentee.userName}</p>
                  </div>
                </div>
                <div style={{ width: "100px", marginLeft: "26px" }}>
                  <p className={post.popupText}>성별</p>
                  <div style={{ width: "100px" }} className={apply.applyInput}>
                    <p className={apply.text}> {mentee.userGender}</p>
                  </div>
                </div>
              </div>

              <div className={post.inputDiv}>
                <p className={post.popupText}>이메일</p>
                <br />
                <div className={apply.applyInput}>
                  {" "}
                  <p className={apply.text}>{mentee.userEmail} </p>
                </div>
              </div>
              <div className={post.inputDiv}>
                <p className={post.popupText}>나이</p>
                <div className={apply.applyInput}>
                  <p className={apply.text}>{mentee.userAge}</p>
                </div>
              </div>
              <div className={post.inputDiv}>
                <p className={post.popupText}>주 거주 지역</p>
                <div className={apply.applyInput}>
                  <p className={apply.text}>{mentee.userRegion}</p>
                </div>
              </div>
              <div className={post.inputDiv}>
                <p className={post.popupText}>지원 동기</p>
                <textarea
                  onChange={handleDescription}
                  className={apply.applyInput}
                  style={{ height: "182px", resize: "none", fontSize: "15px" }}
                ></textarea>
              </div>
            </div>
            <button onClick={applyRequest} className={post.applyBtn}>
              지원하기
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

      {menteePopup ? (
        <div>
          <div className={post.popupBackground}></div>
          <div className={post.applyPopup}>
            <button
              onClick={handleMenteePopupCancel}
              className={post.popupCancel}
            >
              x
            </button>
            <p className={post.applyTitle}>멘티 정보</p>
            <div className={apply.applyInputBox}>
              <div
                style={{
                  display: "flex",
                  width: "428px",
                  margin: "0 auto",
                }}
              >
                <div style={{ width: "200px" }}>
                  <p className={post.popupText}>성함</p>
                  <div className={apply.applyInput} style={{ width: "200px" }}>
                    <p className={apply.text}> {popupMentee.applicantName}</p>
                  </div>
                </div>
                <div style={{ width: "100px", marginLeft: "26px" }}>
                  <p className={post.popupText}>성별</p>
                  <div style={{ width: "100px" }} className={apply.applyInput}>
                    <p className={apply.text}> {popupMentee.applicantGender}</p>
                  </div>
                </div>
              </div>

              <div className={post.inputDiv}>
                <p className={post.popupText}>이메일</p>
                <br />
                <div className={apply.applyInput}>
                  {" "}
                  <p className={apply.text}>{popupMentee.applicantEmail} </p>
                </div>
              </div>
              <div className={post.inputDiv}>
                <p className={post.popupText}>나이</p>
                <div className={apply.applyInput}>
                  <p className={apply.text}>{popupMentee.applicantAge}</p>
                </div>
              </div>
              <div className={post.inputDiv}>
                <p className={post.popupText}>주 거주 지역</p>
                <div className={apply.applyInput}>
                  <p className={apply.text}>{popupMentee.applicantRegion}</p>
                </div>
              </div>
              <div className={post.inputDiv}>
                <p className={post.popupText}>지원 동기</p>
                <div
                  className={apply.applyInput}
                  style={{
                    height: "182px",
                    resize: "none",
                    fontSize: "15px",
                  }}
                >
                  <p className={apply.text}> {popupMentee.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          width: "1180px",
          // marginLeft: "230px",
          // marginRight: "230px",
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
            <p className={post.titleText}>{info.title}</p>
            {info.isReceipt === true ? (
              <div className={post.recruitmentMentee}>
                모집인원 {info.count} / {info.limited}
              </div>
            ) : (
              ""
            )}
          </div>
          <hr className={post.line}></hr>
          <div className={post.subTitleBox}>
            {subTitleBack("등록자명", 0)} {subTitleBack(info.name, 1)}
            {subTitleBack("등록일", 0)} {subTitleBack(info.createDate, 1)}
          </div>
          <hr className={post.line}></hr>
          <div className={post.subTitleBox}>
            {subTitleBack("분류", 0)} {subTitleBack(info.category, 1)}
            {subTitleBack("마감여부", 0)}{" "}
            {subTitleBack(info.isReceipt === true ? "모집중" : "마감", 1)}
          </div>
          <hr className={post.line}></hr>

          <div className={post.mainText}>{info.description}</div>
          {console.log(userRole, "userRole")}
          {console.log(info.mentorInfo.id, userId, "확인")}
          <div style={{ marginTop: "58px" }}>
            <div className={post.mentoringEditDeleteBox}>
              {/* //수정버튼 */}

              {accessToken === undefined ||
              userRole === "mentee" ||
              info.mentorInfo.id !== userId ? (
                ""
              ) : info.count !== 0 ? (
                ""
              ) : (
                <Link
                  to={`/editpost/${postingId}`}
                  style={{ textDecoration: "none" }}
                >
                  <button className={post.mentoringEditDeleteBtn}>수정</button>
                </Link>
              )}
              {/* //삭제버튼 */}
              {accessToken === undefined ||
              userRole === "mentee" ||
              info.mentorInfo.id !== userId ? (
                ""
              ) : info.count !== 0 ? (
                ""
              ) : (
                <button
                  className={post.mentoringEditDeleteBtn}
                  onClick={deleteRequest}
                  style={{ marginRight: "20px" }}
                >
                  삭제
                </button>
              )}
            </div>
            {userRole === "mentor" && info.mentorInfo.id === userId ? (
              <div className={post.appliedMenteeBox}>
                <div className={post.appliedMenteeTitleBox}>
                  <p className={post.appliedMenteeTitle}>신청한 멘티 목록</p>
                  {info.isReceipt === true ? (
                    <div className={post.recruitment}>
                      모집인원 {info.count} / {info.limited}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className={post.appliedMenteeListBox}>
                  {mentees === undefined
                    ? ""
                    : mentees.map((ele) => {
                        return (
                          <div
                            className={post.appliedMenteeButton}
                            onClick={() => {
                              applyMentee(ele.applyMenteeId)
                                .then((res) => {
                                  console.log(res.data, "신청한 멘티");
                                  setPopupMentee(res.data);
                                  console.log(popupMentee);
                                })
                                .catch((err) => console.log(err));

                              setMenteePopup(true);
                            }}
                          >
                            {ele.menteeImg === "null" ? (
                              <img
                                className={post.appliedMenteeImg}
                                src={nullImg}
                              ></img>
                            ) : (
                              <img
                                className={post.appliedMenteeImg}
                                src={ele.menteeImg}
                              ></img>
                            )}

                            <div className={post.appliedMenteeName}>
                              {ele.menteeName}
                            </div>
                          </div>
                        );
                      })}
                </div>
              </div>
            ) : (
              ""
            )}

            {userRole === "mentee" ? (
              <div
                className={post.mentoringEndBox}
                style={{ marginTop: "20px" }}
              >
                <p className={post.mentoringText}>멘토링 연결 신청</p>
                <button className={post.mentoringBtn} onClick={handlePopup}>
                  신청하러가기
                </button>
              </div>
            ) : info.mentorInfo.id !== userId ? (
              ""
            ) : (
              <div className={post.mentoringEndBox}>
                <p className={post.mentoringText}>멘토링 연결 마감</p>
                <button className={post.mentoringBtn} onClick={endRequest}>
                  마감하기
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <Footer /> */}
      <div className={home.footer} style={{ marginTop: "330px" }}>
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
export default ViewPost;
