import axios from "axios";
import home from "../../../routes/css/home.module.css";
import Mentor from "../../css/Mypage/Mentor.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
function MentorPost(e) {
  const accessToken = localStorage.getItem("token");
  console.log(e.postingInfo, "in MentorPost Component");
  return (
    <div>
      <div className={home.programPro} style={{ marginTop: "20px" }}>
        <Link
          to={`/viewpost/${e.postingInfo.id}`}
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
                분야 : {e.postingInfo.category}
              </div>
              <div
                style={{
                  width: "140px",
                  height: "14px",
                  color: "#ADADAD",
                  fontSize: "12px",
                  marginRight: "10px",
                }}
              >
                생성일자 : {e.postingInfo.createDate.slice(0, 10)}
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
              {e.postingInfo.title}
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
              {e.postingInfo.description}
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
                신청인원
              </div>
              <div style={{ marginLeft: "10px" }}>
                {e.postingInfo.count} / {e.postingInfo.limited}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
export default MentorPost;
