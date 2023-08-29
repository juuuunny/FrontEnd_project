import Navigation from "../../../components/js/navigation";
import menu from "../../../components/css/navigationMenu.module.css";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import post from "../../css/Board/posting.module.css";
import { useEffect, useState } from "react";
import home from "../../../routes/css/home.module.css";
import { getBoardListApi } from "../../../apis/boardApi";
import Pagination from "react-js-pagination";
import { useSelector } from "react-redux";
import "../../css/Board/paging.css";
// 게시판 페이지
function Posting() {
  const navigate = useNavigate();

  const token = useSelector((state) => state.persistedReducer.user.userToken);

  //페이징을 위한 page 변수선언
  const [page, setPage] = useState(1);
  // 페이지 이동함수
  const handlePageChange = (page) => {
    setPage(page);
  };

  //검색한 게시물 가져오기
  const [boardlistSearch, setBoardlistSearch] = useState([]);
  const [totalitemSearch, setTotalitemSearch] = useState();
  const getboardlistSearch = async () => {
    try {
      const resp = await getBoardListApi(`${page}&title=${search}&`);
      setBoardlistSearch(resp.data.content);
      setTotalitemSearch(resp.data.totalElements);
    } catch (err) {
      console.log(err);
    }
  };

  // 해당 하는 게시판을 보여주기 위해 number 변수 설정
  const [number, setNumber] = useState("0");
  const number0 = () => {
    setNumber("0");
    setPage(1);
  };
  const number1 = () => {
    setNumber("1");
    setPage(1);
  };
  const number2 = () => {
    setNumber("2");
    setPage(1);
  };
  const number3 = () => {
    setNumber("3");
    setPage(1);
  };
  const number4 = () => {
    setNumber("4");
    setPage(1);
  };

  // 글쓰기 이동부분
  const onWrite = () => {
    if (token === "") {
      alert("로그인을 진행해주세요.");
    } else {
      navigate("/posting/write");
    }
  };

  // 검색어 부분
  const [search, setSearch] = useState("");
  const onChange = (event) => {
    setSearch(event.target.value);
  };
  // 해당 검색어 포함한 게시물 보여주도록 하기

  const onSearch = (event) => {
    setNumber("5");
    setPage(1);
    getboardlistSearch();
    alert(`"${search}"를 검색한 결과가 보입니다.`);
  };

  const keyenter = (e) => {
    if (e.keyCode === 13) {
      setNumber("5");
      setPage(1);
      getboardlistSearch();
      alert(`"${search}"를 검색한 결과가 보입니다.`);
    }
  };

  // 카테고리별 총 게시글 수 이런것들 가져오기 위해서 api 호출해주기
  //전체
  const [boardlist, setBoardlist] = useState([]);
  const [totalitem, setTotalitem] = useState();

  const getboardlist = async () => {
    try {
      const resp = await getBoardListApi(`${page}`);
      setBoardlist(resp.data.content);
      setTotalitem(resp.data.totalElements);
    } catch (err) {
      console.log(err);
    }
  };
  //자유
  const [boardlistFree, setBoardlistFree] = useState([]);
  const [totalitemFree, setTotalitemFree] = useState();
  const getboardlistFree = async () => {
    try {
      const resp = await getBoardListApi(`${page}&category=자유`);
      setBoardlistFree(resp.data.content);
      setTotalitemFree(resp.data.totalElements);
    } catch (err) {
      console.log(err);
    }
  };
  //질문
  const [boardlistQuestion, setBoardlistQuestion] = useState([]);
  const [totalitemQuestion, setTotalitemQuestion] = useState();
  const getboardlistQuestion = async () => {
    try {
      const resp = await getBoardListApi(`${page}&category=질문`);
      setBoardlistQuestion(resp.data.content);
      setTotalitemQuestion(resp.data.totalElements);
    } catch (err) {
      console.log(err);
    }
  };
  //정보
  const [boardlistInformation, setBoardlistInformation] = useState([]);
  const [totalitemInformation, setTotalitemInformation] = useState();
  const getboardlistInformation = async () => {
    try {
      const resp = await getBoardListApi(`${page}&category=정보`);
      setBoardlistInformation(resp.data.content);
      setTotalitemInformation(resp.data.totalElements);
    } catch (err) {
      console.log(err);
    }
  };
  //구인구직
  const [boardlistJob, setBoardlistJob] = useState([]);
  const [totalitemJob, setTotalitemJob] = useState();
  const getboardlistJob = async () => {
    try {
      const resp = await getBoardListApi(`${page}&category=구인구직`);
      setBoardlistJob(resp.data.content);
      setTotalitemJob(resp.data.totalElements);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getboardlist();
    getboardlistFree();
    getboardlistQuestion();
    getboardlistInformation();
    getboardlistJob();
    getboardlistSearch();
  }, [number, page]);

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

        <div className={post.board}>
          <div className={post.boardTitle}>소통 게시판</div>

          {/* 원하는 게시판 카테고리 선택 부분 */}
          <div className={post.button}>
            <span> 카테고리 :</span>
            <Button onClick={number0} data-checked={number === "0"}>
              전체글
            </Button>
            <Button onClick={number1} data-checked={number === "1"}>
              자유
            </Button>
            <Button onClick={number2} data-checked={number === "2"}>
              질문
            </Button>
            <Button onClick={number3} data-checked={number === "3"}>
              정보
            </Button>
            <Button onClick={number4} data-checked={number === "4"}>
              구인/구직
            </Button>
          </div>

          {/* 게시판 */}
          <div className={post.post}>
            {/* 게시판의 가장 위 위치한 해당 게시물 정보 */}
            <div className={post.line}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "45px",
                  height: "24px",
                  fontWeight: "700",
                  fontSize: "16px",
                  justifyContent: "center",
                  padding: "0px 14px",
                  borderRight: "1px solid #545454",
                }}
              >
                순번
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "45px",
                  height: "24px",
                  fontWeight: "700",
                  fontSize: "16px",
                  justifyContent: "center",
                  padding: "0px 16px",
                  borderRight: "1px solid #545454",
                }}
              >
                분류
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "45px",
                  height: "24px",
                  fontWeight: "700",
                  fontSize: "16px",
                  justifyContent: "center",
                  padding: "0px 14px",
                }}
              >
                제목
              </div>
              <div
                style={{
                  marginLeft: "520px",
                  display: "flex",
                  alignItems: "center",
                  width: "64px",
                  height: "24px",
                  fontWeight: "700",
                  fontSize: "16px",
                  justifyContent: "center",
                  padding: "0px 14px",
                  borderRight: "1px solid #545454",
                }}
              >
                등록자명
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "96px",
                  height: "24px",
                  fontWeight: "700",
                  fontSize: "16px",
                  justifyContent: "center",
                  padding: "0px 16px",
                }}
              >
                등록일
              </div>
            </div>

            {/* 카테고리 선택 시 해당 게시물 페이지 보이도록 설정 */}
            {number === "0" ? (
              // 전체게시판 보이도록
              <div className={post.tenPost}>
                {boardlist.map((board) => {
                  return (
                    <Link
                      to={`/posting/${board.id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div
                        key={board.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "980px",
                          height: "60px",
                          boxSizing: "border-box",
                          borderBottom: "1px solid #e7e7e7",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "20px",
                            height: "20px",
                            fontWeight: "700",
                            fontSize: "16px",
                            justifyContent: "center",
                            padding: "0px 28px",
                          }}
                        >
                          {board.id}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "70px",
                            height: "32px",
                            fontWeight: "700",
                            fontSize: "16px",
                            justifyContent: "center",
                            padding: "0px 3px",
                          }}
                        >
                          {board.category}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            width: "460px",
                            height: "20px",
                            fontWeight: "700",
                            fontSize: "16px",
                            padding: "0px 20px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {board.title}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "60px",
                            height: "32px",
                            fontWeight: "700",
                            fontSize: "16px",
                            justifyContent: "center",
                            padding: "0px 8px",
                            marginLeft: "100px",
                          }}
                        >
                          익명
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "130px",
                            height: "32px",
                            fontWeight: "700",
                            fontSize: "16px",
                            justifyContent: "center",
                            padding: "0px 4px",
                            marginLeft: "8px",
                          }}
                        >
                          {board.createDate.substring(0, 10)}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : number === "1" ? (
              // 자유게시판 보이도록
              <div className={post.tenPost}>
                {/* 게시물 카테고리 자유인 게시물들 가져오기 */}
                {boardlistFree.map((board) => {
                  return (
                    <Link
                      to={`/posting/${board.id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div
                        key={board.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "980px",
                          height: "60px",
                          boxSizing: "border-box",
                          borderBottom: "1px solid #e7e7e7",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "20px",
                            height: "20px",
                            fontWeight: "700",
                            fontSize: "16px",
                            justifyContent: "center",
                            padding: "0px 28px",
                          }}
                        >
                          {board.id}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "70px",
                            height: "32px",
                            fontWeight: "700",
                            fontSize: "16px",
                            justifyContent: "center",
                            padding: "0px 3px",
                          }}
                        >
                          {board.category}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            width: "460px",
                            height: "20px",
                            fontWeight: "700",
                            fontSize: "16px",
                            padding: "0px 20px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {board.title}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "60px",
                            height: "32px",
                            fontWeight: "700",
                            fontSize: "16px",
                            justifyContent: "center",
                            padding: "0px 8px",
                            marginLeft: "100px",
                          }}
                        >
                          익명
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "130px",
                            height: "32px",
                            fontWeight: "700",
                            fontSize: "16px",
                            justifyContent: "center",
                            padding: "0px 4px",
                            marginLeft: "8px",
                          }}
                        >
                          {board.createDate.substring(0, 10)}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : number === "2" ? (
              // 질문게시판 보이도록
              <div className={post.tenPost}>
                {/* 게시물 카테고리 질문인 게시물들 가져오기 */}
                {boardlistQuestion.map((board) => {
                  return (
                    <Link
                      to={`/posting/${board.id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div
                        key={board.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "980px",
                          height: "60px",
                          boxSizing: "border-box",
                          borderBottom: "1px solid #e7e7e7",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "20px",
                            height: "20px",
                            fontWeight: "700",
                            fontSize: "16px",
                            justifyContent: "center",
                            padding: "0px 28px",
                          }}
                        >
                          {board.id}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "70px",
                            height: "32px",
                            fontWeight: "700",
                            fontSize: "16px",
                            justifyContent: "center",
                            padding: "0px 3px",
                          }}
                        >
                          {board.category}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            width: "460px",
                            height: "20px",
                            fontWeight: "700",
                            fontSize: "16px",
                            padding: "0px 20px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {board.title}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "60px",
                            height: "32px",
                            fontWeight: "700",
                            fontSize: "16px",
                            justifyContent: "center",
                            padding: "0px 8px",
                            marginLeft: "100px",
                          }}
                        >
                          익명
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "130px",
                            height: "32px",
                            fontWeight: "700",
                            fontSize: "16px",
                            justifyContent: "center",
                            padding: "0px 4px",
                            marginLeft: "8px",
                          }}
                        >
                          {board.createDate.substring(0, 10)}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : number === "3" ? (
              // 정보게시판 보이도록
              <div className={post.tenPost}>
                {/* 게시물 카테고리가 정보인 게시물들 가져오기 */}
                {boardlistInformation.map((board) => {
                  return (
                    <Link
                      to={`/posting/${board.id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div
                        key={board.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "980px",
                          height: "60px",
                          boxSizing: "border-box",
                          borderBottom: "1px solid #e7e7e7",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "20px",
                            height: "20px",
                            fontWeight: "700",
                            fontSize: "16px",
                            justifyContent: "center",
                            padding: "0px 28px",
                          }}
                        >
                          {board.id}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "70px",
                            height: "32px",
                            fontWeight: "700",
                            fontSize: "16px",
                            justifyContent: "center",
                            padding: "0px 3px",
                          }}
                        >
                          {board.category}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            width: "460px",
                            height: "20px",
                            fontWeight: "700",
                            fontSize: "16px",
                            padding: "0px 20px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {board.title}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "60px",
                            height: "32px",
                            fontWeight: "700",
                            fontSize: "16px",
                            justifyContent: "center",
                            padding: "0px 8px",
                            marginLeft: "100px",
                          }}
                        >
                          익명
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "130px",
                            height: "32px",
                            fontWeight: "700",
                            fontSize: "16px",
                            justifyContent: "center",
                            padding: "0px 4px",
                            marginLeft: "8px",
                          }}
                        >
                          {board.createDate.substring(0, 10)}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : number === "4" ? (
              // 구인구직게시판 보이도록
              <div className={post.tenPost}>
                {/* 게시물 카테고리가 구인구직인 게시물들 가져오기 */}
                {boardlistJob.map((board) => {
                  return (
                    <Link
                      to={`/posting/${board.id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div
                        key={board.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "980px",
                          height: "60px",
                          boxSizing: "border-box",
                          borderBottom: "1px solid #e7e7e7",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "20px",
                            height: "20px",
                            fontWeight: "700",
                            fontSize: "16px",
                            justifyContent: "center",
                            padding: "0px 28px",
                          }}
                        >
                          {board.id}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "70px",
                            height: "32px",
                            fontWeight: "700",
                            fontSize: "16px",
                            justifyContent: "center",
                            padding: "0px 3px",
                          }}
                        >
                          {board.category}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            width: "460px",
                            height: "20px",
                            fontWeight: "700",
                            fontSize: "16px",
                            padding: "0px 20px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {board.title}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "60px",
                            height: "32px",
                            fontWeight: "700",
                            fontSize: "16px",
                            justifyContent: "center",
                            padding: "0px 8px",
                            marginLeft: "100px",
                          }}
                        >
                          익명
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "130px",
                            height: "32px",
                            fontWeight: "700",
                            fontSize: "16px",
                            justifyContent: "center",
                            padding: "0px 4px",
                            marginLeft: "8px",
                          }}
                        >
                          {board.createDate.substring(0, 10)}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              // 검색한 결과 게시판 보이도록
              <div className={post.tenPost}>
                {/* 게시물 카테고리 질문인 게시물들 가져오기 */}
                {boardlistSearch.map((board) => {
                  return (
                    <Link
                      to={`/posting/${board.id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div
                        key={board.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "980px",
                          height: "60px",
                          boxSizing: "border-box",
                          borderBottom: "1px solid #e7e7e7",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "20px",
                            height: "20px",
                            fontWeight: "700",
                            fontSize: "16px",
                            justifyContent: "center",
                            padding: "0px 28px",
                          }}
                        >
                          {board.id}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "70px",
                            height: "32px",
                            fontWeight: "700",
                            fontSize: "16px",
                            justifyContent: "center",
                            padding: "0px 3px",
                          }}
                        >
                          {board.category}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            width: "460px",
                            height: "20px",
                            fontWeight: "700",
                            fontSize: "16px",
                            padding: "0px 20px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {board.title}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "60px",
                            height: "32px",
                            fontWeight: "700",
                            fontSize: "16px",
                            justifyContent: "center",
                            padding: "0px 8px",
                            marginLeft: "100px",
                          }}
                        >
                          익명
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "130px",
                            height: "32px",
                            fontWeight: "700",
                            fontSize: "16px",
                            justifyContent: "center",
                            padding: "0px 4px",
                            marginLeft: "8px",
                          }}
                        >
                          {board.createDate.substring(0, 10)}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* 페이지네이션 처리 */}
            <div
              style={{
                display: "flex",
                margin: "0 auto",
                width: "450px",
                height: "60px",
                justifyContent: "center",
                marginTop: "14px",
              }}
            >
              <Pagination
                activePage={page}
                itemsCountPerPage={10}
                totalItemsCount={
                  number === "0"
                    ? totalitem
                    : number === "1"
                    ? totalitemFree
                    : number === "2"
                    ? totalitemQuestion
                    : number === "3"
                    ? totalitemInformation
                    : number === "4"
                    ? totalitemJob
                    : totalitemSearch
                }
                pageRangeDisplayed={5}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={handlePageChange}
                className={post.pagination}
              />
            </div>

            {/* 검색어 입력 및 글쓰기 부분 */}
            <div style={{ display: "flex", marginTop: "20px" }}>
              <input
                type="text"
                placeholder="검색어를 입력하세요."
                className={post.search}
                value={search}
                onChange={onChange}
                onKeyUp={keyenter}
              />
              <Button className={post.searchbutton} onClick={onSearch}>
                검색
              </Button>
              {/* 글쓰기 클릭시 페이지이동 */}
              <Button
                style={{
                  width: "80px",
                  height: "42px",
                  marginLeft: "516px",
                  border: "none",
                  backgroundColor: "#66c109",
                  color: "white",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
                onClick={onWrite}
              >
                글쓰기
              </Button>
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

export default Posting;
