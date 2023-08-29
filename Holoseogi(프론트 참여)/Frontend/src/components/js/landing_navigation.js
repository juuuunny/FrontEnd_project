import React from "react";
import navigation from "../css/landing_navigation.module.css";
import { Link } from "react-router-dom";
import icon from "../img/icon.png";

function Navigation() {
  return (
    <nav className={navigation.navtotal}>
      <div className={navigation.icon}>
        <img src={icon}></img>
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className={navigation.teemo}>TEEMO</span>
        </Link>
        <Link to="/main" style={{ textDecoration: "none" }}>
          <span>Main</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;
