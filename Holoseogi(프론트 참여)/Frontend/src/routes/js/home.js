import Navigation from "../../components/js/navigation";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import menu from "../../components/css/navigationMenu.module.css";
import home from "../css/home.module.css";
import { useEffect, useState } from "react";
import { getBoardListApi } from "../../apis/boardApi";
import { useSelector } from "react-redux";

// 첫 웹사이트 메인페이지
function Home() {
  // 홈화면에 보이기 위한 조건에 맞는 게시물 리스트 가져오기
  const [boardlist, setBoardlist] = useState([]);
  const [boardlistFree, setBoardlistFree] = useState([]);
  const [boardlistInformation, setBoardlistInformation] = useState([]);
  const [boardlistQuestion, setBoardlistQuestion] = useState([]);
  const [boardlistJob, setBoardlistJob] = useState([]);

  const getboardlist = async () => {
    try {
      const resp = await getBoardListApi(`1`);
      setBoardlist(resp.data.content);
    } catch (err) {
      console.error(err);
    }
  };

  const getboardlistFree = async () => {
    try {
      const resp = await getBoardListApi(`1&category=자유`);
      setBoardlistFree(resp.data.content);
    } catch (err) {
      console.error(err);
    }
  };
  const getboardlistInformation = async () => {
    try {
      const resp = await getBoardListApi(`1&category=정보`);
      setBoardlistInformation(resp.data.content);
    } catch (err) {
      console.error(err);
    }
  };
  const getboardlistQuestion = async () => {
    try {
      const resp = await getBoardListApi(`1&category=질문`);
      setBoardlistQuestion(resp.data.content);
    } catch (err) {
      console.error(err);
    }
  };
  const getboardlistJob = async () => {
    try {
      const resp = await getBoardListApi(`1&category=구인구직`);
      setBoardlistJob(resp.data.content);
    } catch (err) {
      console.error(err);
    }
  };

  const name = useSelector((state) => state.persistedReducer.user.userName);

  useEffect(() => {
    getboardlist();
    getboardlistFree();
    getboardlistInformation();
    getboardlistQuestion();
    getboardlistJob();
    console.log(name);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          width: "1180px",
          margin: "0 auto",
        }}
      >
        {/* 제일 위 로고 부분 */}
        <Navigation />

        {/* 메뉴 부분 */}
        <div className={menu.menu}>
          <div>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button style={{ color: "#66c109" }}>홈</Button>
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

        {/* 지원 프로그램 부분 */}
        <div className={home.program}>
          <div className={home.programTop}>
            <div className={home.programTopParagraph}>
              <p>정부 지원 프로그램</p>
              <div>
                정부 기관에서 주관하는 자립 지원 정보들을 확인하실 수 있습니다.
              </div>
            </div>
            <Link to="/program" style={{ textDecoration: "none" }}>
              <Button>더보기</Button>
            </Link>
          </div>
          <div className={home.programPro}>
            <a
              href="http://jaripon.ncrc.or.kr/home/kor/support/projectMng/edit.do?menuPos=1&idx=374&act=&searchValueList2=1&searchValue5=&searchValue6=0&searchKeyword=&searchValue1=A&pageIndex=2"
              target="_blank"
              style={{ textDecoration: "none", color: "black" }}
            >
              <div
                style={{
                  padding: "16px 10px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    paddingBottom: "10px",
                    borderBottom: "1px solid lightgray",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      fontSize: "12px",
                      fontWeight: "700",
                      lineHeight: "14px",
                      marginLeft: "14px",
                      border: "2px solid #B7F153",
                      backgroundColor: "white",
                      color: "#66C109",
                      fontSize: "0.8rem",
                      width: "128px",
                      height: "24px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    자립 지원 / 기타
                  </div>
                  <div
                    style={{
                      width: "114px",
                      height: "14px",
                      color: "#ADADAD",
                      fontSize: "12px",
                      marginRight: "10px",
                    }}
                  >
                    마감일자 2023.08.10
                  </div>
                </div>

                <div
                  style={{
                    width: "400px",
                    height: "50px",
                    padding: "22px 20px 0px",
                    fontSize: "20px",
                    fontWeight: "700",
                    lineHeight: "24px",
                    letterSpacing: "0em",
                    textAlign: "left",
                  }}
                >
                  바람개비서포터즈 14기 3차모집
                </div>
                <div
                  style={{
                    width: "320px",
                    height: "40px",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    fontSize: "1rem",
                    padding: "0px 20px",
                  }}
                >
                  직종별 전문가 멘토링 및 지역별 모임, 방문교육이 있습니다.
                </div>
                <div
                  style={{
                    display: "flex",
                    position: "absolute",
                    fontSize: "0.8rem",
                    top: "208px",
                  }}
                >
                  <div
                    style={{
                      paddingLeft: "18px",
                      borderRight: "2px solid gray",
                      paddingRight: "10px",
                    }}
                  >
                    서울 자립지원 전담기관
                  </div>
                  <div style={{ marginLeft: "7px" }}>전국</div>
                </div>
              </div>
            </a>
            <a
              href="http://jaripon.ncrc.or.kr/home/kor/support/projectMng/edit.do?menuPos=1&idx=377&act=&searchValueList2=1&searchValue5=&searchValue6=0&searchKeyword=&searchValue1=A&pageIndex=1"
              target="_blank"
              style={{ textDecoration: "none", color: "black" }}
            >
              <div
                style={{
                  padding: "16px 10px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    paddingBottom: "10px",
                    borderBottom: "1px solid lightgray",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      fontSize: "12px",
                      fontWeight: "700",
                      lineHeight: "14px",
                      marginLeft: "14px",
                      border: "2px solid #B7F153",
                      backgroundColor: "white",
                      color: "#66C109",
                      fontSize: "0.8rem",
                      width: "128px",
                      height: "24px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    자립 지원 / 진학
                  </div>
                  <div
                    style={{
                      width: "118px",
                      height: "14px",
                      color: "#ADADAD",
                      fontSize: "12px",
                      marginRight: "12px",
                    }}
                  >
                    마감 일자 2023.08.13
                  </div>
                </div>

                <div
                  style={{
                    width: "400px",
                    height: "50px",
                    padding: "22px 20px 0px",
                    fontSize: "20px",
                    fontWeight: "700",
                    lineHeight: "24px",
                    letterSpacing: "0em",
                    textAlign: "left",
                  }}
                >
                  IBK 자립준비청년 장학금취업지원
                </div>
                <div
                  style={{
                    width: "320px",
                    height: "40px",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    fontSize: "1rem",
                    padding: "0px 20px",
                  }}
                >
                  장학금 및 금융경제교육, 취업 컨설팅, 생활법률교육 등의
                  지원사업을 하고있습니다.
                </div>
                <div
                  style={{
                    display: "flex",
                    position: "absolute",
                    fontSize: "0.8rem",
                    top: "208px",
                  }}
                >
                  <div
                    style={{
                      paddingLeft: "18px",
                      borderRight: "2px solid gray",
                      paddingRight: "10px",
                    }}
                  >
                    IBK 기업은행
                  </div>
                  <div style={{ marginLeft: "7px" }}>전국</div>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* 게시판 부분 */}
        <div className={home.boardTotal}>
          <div className={home.boardTop}>
            <div className={home.boardTopParagraph}>
              <p>소통 게시판</p>
              <div>소통하며 정보들을 얻을 수 있습니다.</div>
            </div>
            <Link to="/posting" style={{ textDecoration: "none" }}>
              <Button>더보기</Button>
            </Link>
          </div>
          <div className={home.board}>
            {/* 전체 글 부분 */}
            <div className={home.fullBoard}>
              <div style={{ fontSize: "16px", fontWeight: "700" }}>전체글</div>
              {boardlist.map((v) => {
                return (
                  <Link
                    to={`/posting/${v.id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <div
                      key={v.id}
                      style={{
                        paddingLeft: "10px",
                        width: "320px",
                        Left: "4px",

                        height: "36px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {v.title}
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className={home.separateBoard}>
              <div className={home.separateBoardFirstline}>
                {/* 자유게시판 */}
                <div className={home.separateBoardPart}>
                  <Link to="/posting" style={{ textDecoration: "none" }}>
                    <p
                      style={{
                        paddingLeft: "4px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ marginLeft: "10px" }}>자유 게시판</span>
                    </p>
                  </Link>

                  {boardlistFree.slice(0, 4).map((v) => {
                    return (
                      <div key={v.id}>
                        <Link
                          to={`/posting/${v.id}`}
                          style={{
                            textDecoration: "none",
                            color: "black",
                          }}
                        >
                          <div
                            style={{
                              paddingLeft: "10px",
                              marginTop: "8px",
                              whiteSpace: "nowrap",

                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {v.title}
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
                {/* 질문게시판 */}
                <div className={home.separateBoardPart}>
                  <Link to="/posting" style={{ textDecoration: "none" }}>
                    <p
                      style={{
                        paddingLeft: "4px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ marginLeft: "10px" }}>질문 게시판</span>
                    </p>
                  </Link>

                  {boardlistQuestion.slice(0, 4).map((v) => {
                    return (
                      <div key={v.id}>
                        <Link
                          to={`/posting/${v.id}`}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <div
                            style={{
                              paddingLeft: "10px",
                              marginTop: "8px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",

                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {v.title}
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className={home.separateBoardSecondline}>
                {/* 정보게시판 */}
                <div className={home.separateBoardPart}>
                  <Link to="/posting" style={{ textDecoration: "none" }}>
                    <p
                      style={{
                        paddingLeft: "4px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ marginLeft: "10px" }}>정보 게시판</span>
                    </p>
                  </Link>

                  {boardlistInformation.slice(0, 4).map((v) => {
                    return (
                      <div key={v.id}>
                        <Link
                          to={`/posting/${v.id}`}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <div
                            style={{
                              paddingLeft: "10px",
                              marginTop: "8px",
                              whiteSpace: "nowrap",

                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {v.title}
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
                {/* 구인구직게시판 */}
                <div className={home.separateBoardPart}>
                  <Link to="/posting" style={{ textDecoration: "none" }}>
                    <p
                      style={{
                        paddingLeft: "4px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ marginLeft: "10px" }}>
                        구인/구직 게시판
                      </span>
                    </p>
                  </Link>

                  {boardlistJob.slice(0, 4).map((v) => {
                    return (
                      <div key={v.id}>
                        <Link
                          to={`/posting/${v.id}`}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <div
                            style={{
                              paddingLeft: "10px",
                              marginTop: "8px",
                              whiteSpace: "nowrap",

                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {v.title}
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 가장 아래 footer부분 */}
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

export default Home;
