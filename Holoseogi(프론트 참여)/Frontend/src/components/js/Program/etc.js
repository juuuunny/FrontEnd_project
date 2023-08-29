import prolist from "./programPublic";
import post from "../../../routes/css/Program/program.module.css";
import { useState } from "react";

// 카테고리 기타인 프로그램 보이기
function ProgramEtc() {
  const [program, setProgram] = useState(prolist);
  return (
    <div className={post.post}>
      {program.map((event) => {
        if (event.category === "기타") {
          return (
            <a
              key={event.url}
              href={event.url}
              target="_blank"
              style={{
                textDecoration: "none",
                color: "black",
                width: "480px",
                height: "242px",
                border: "1px solid #f1f1f1",
                backgroundColor: "#f1f1f1",
                margin: "10px 30px",
                borderRadius: "16px",
              }}
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
                      width: "143px",
                      height: "24px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    자립 지원 / {event.categoryDescription}
                  </div>
                  <div
                    style={{
                      width: "154px",
                      height: "14px",
                      color: "#ADADAD",
                      fontSize: "12px",
                      marginRight: "-16px",
                    }}
                  >
                    마감일자 {event.deadline}
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
                  {event.title}
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
                  {event.content}
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
                    {event.agency}
                  </div>
                  <div style={{ marginLeft: "7px" }}>{event.region}</div>
                </div>
              </div>
            </a>
          );
        }
      })}
    </div>
  );
}

export default ProgramEtc;
