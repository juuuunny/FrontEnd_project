import Navigation from "../../../components/js/navigation";
import mentoStyle from "../../css/mento.module.css";
import Posts from "../../../components/js/mentoPosts";
import { Link, useNavigate } from "react-router-dom";
import home from "../../css/home.module.css";
import menu from "../../../components/css/navigationMenu.module.css";
import { Button } from "react-bootstrap";
import Pagination from "react-js-pagination";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { viewPostList } from "../../../apis/mentorMentee";
import "../../css/mentorMentee/paging.css";
function Mento() {
  const navigate = useNavigate();
  const userRole = useSelector((state) => state.persistedReducer.user.userRole);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [boardList, setBoardList] = useState([]);
  const [totalElem, setTotalElem] = useState(0);
  const accessToken = useSelector(
    (state) => state.persistedReducer.user.userToken
  );

  useEffect(() => {
    if (accessToken === "") {
      alert("로그인 후 이용 가능한 서비스입니다.");
      navigate("/login");
    }
    viewPostList(searchText, searchCategory, accessToken, page)
      .then(function (res) {
        console.log(res);
        setTotalElem(res.data.totalElements);
        setBoardList(res.data.content);
      })
      .catch(function (res) {
        console.log(res);
      });
  }, [page, searchText, searchCategory, accessToken]);

  const handleSearchText = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };
  const handleSearchCategory = (e) => {
    setSearchCategory(e.target.value);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

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
      </div>
      <div>
        <div className={mentoStyle.searchBox}>
          <div className={mentoStyle.searchBoxContnet}>
            <select
              className={mentoStyle.classify}
              onChange={handleSearchCategory}
            >
              <option>분류</option>
              <option value="법률">법률</option>
              <option value="상담">상담</option>
              <option value="기타">기타</option>
            </select>
            <input
              onChange={handleSearchText}
              className={mentoStyle.search}
            ></input>
            <button className={mentoStyle.searchBtn}>검색</button>
          </div>
        </div>
        <div className={mentoStyle.posts}>
          <hr className={mentoStyle.line} style={{ marginTop: "60px" }} />
          <div className={mentoStyle.postsTop}>
            <div className={mentoStyle.postsTopName}>
              모집인원 | 분류 | 제목
            </div>
            <div
              className={mentoStyle.postsTopRegistInfo}
              style={{ marginRight: "20px" }}
            >
              등록자명 | 등록일 | 마감여부
            </div>
          </div>
          <hr className={mentoStyle.line} />

          {boardList.map((ele) => {
            return (
              <Posts
                category={ele.category}
                title={ele.title}
                id={ele.id}
                createDate={ele.createDate.slice(0, 10)}
                creatorName={ele.creatorName}
                count={ele.count}
                isReceipt={ele.isReceipt}
                limited={ele.limited}
              />
            );
          })}

          <div className={mentoStyle.buttonBox}>
            {accessToken === null || userRole === "mentee" ? (
              ""
            ) : (
              <Link to={"/createpost"} className={mentoStyle.wirteBtn}>
                <p style={{ margin: "auto" }}>글쓰기</p>
              </Link>
            )}
          </div>
          <div className={mentoStyle.pageNum}>
            <Pagination
              activePage={page}
              itemsCountPerPage={10}
              totalItemsCount={totalElem}
              pageRangeDisplayed={5}
              prevPageText={"‹"}
              nextPageText={"›"}
              onChange={handlePageChange}
              className={mentoStyle.pagination}
            />
          </div>
        </div>
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
export default Mento;
