import cycle from "../img/icon.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MenuBar = () => {
  const token = localStorage.getItem("token");

  const mileage = useSelector(
    (state) => state.persistedReducer.user.user_mileage
  );

  return (
    <div className="menu">
      <Link to="/home" style={{ textDecoration: "none", color: "black" }}>
        <div className="menuLeft">
          <img src={cycle} alt="cycle" />
          <div>분리할래?</div>
        </div>
      </Link>
      {/*<div className="menuRight">*/}
      {/*  <Link to="/giftshop" style={{ textDecoration: "none", color: "black" }}>*/}
      {/*    <i class="fa-solid fa-gift"></i>*/}
      {/*  </Link>*/}
      {/*  {token ? (*/}
      {/*    <Link to="/mypage" style={{ textDecoration: "none", color: "black" }}>*/}
      {/*      <div className="mypage">마이페이지</div>*/}
      {/*    </Link>*/}
      {/*  ) : (*/}
      {/*    <></>*/}
      {/*  )}*/}
      {/*  {token ? (*/}
      {/*    <div className="coin">*/}
      {/*      <i class="fa-solid fa-coins"></i>*/}
      {/*      <div>{mileage}P</div>*/}
      {/*    </div>*/}
      {/*  ) : (*/}
      {/*    <Link*/}
      {/*      to="/signup"*/}
      {/*      style={{*/}
      {/*        textDecoration: "none",*/}
      {/*        color: "black",*/}
      {/*        marginLeft: "3px",*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      <div className="mypage">로그인</div>*/}
      {/*    </Link>*/}
      {/*  )}*/}
      {/*</div>*/}
    </div>
  );
};

export default MenuBar;
