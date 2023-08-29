import home from "../../routes/css/home.module.css";
import { Link } from "react-router-dom";
function footer() {
  return (
    <div className={home.footer}>
      <div className={home.footer_left}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <h2>홀로서기</h2>
        </Link>
        <p>청소년 자립 지원 공공 서비스</p>
        <div>연락처 : 010-4470-2175</div>
        <div>이메일 : chandelier7642@gmail.com</div>
        <div>주소 : 세종대학교 학생회관 B123</div>
      </div>
      <div className={home.footer_agency}>
        <h4>협업 정부 기관</h4>
        <div>여성가족부</div>
        <div>청소년자립지원단</div>
        <div>한국청소년상담복지개발원</div>
        <div>한국청소년정책연구원</div>
        <div>한국청소년활동진흥원</div>
      </div>
      <div className={home.footer_sponsor}>
        <h4>후원사</h4>
        <div>삼성재단</div>
        <div>LG재단</div>
        <div>카카오</div>
      </div>
      <div className={home.footer_spon}>
        <h4>후원</h4>
        <div>후원 문의</div>
        <div>1644-1211</div>
      </div>
    </div>
  );
}

export default footer;
