import { Link } from "react-router-dom";
import mentoStyle from "../../routes/css/mento.module.css";

function Posts(postInfo) {
  console.log(postInfo);
  return (
    <div key={postInfo.id}>
      <div className={mentoStyle.postsContent}>
        <div className={mentoStyle.postsContents}>
          <div style={{ width: "50px", marginLeft: "8px" }}>
            <span
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {postInfo.count} / {postInfo.limited}
            </span>
          </div>
          <div style={{ marginLeft: "38px" }}>
            <span> {postInfo.category}</span>
          </div>
          <Link to={`/viewpost/${postInfo.id}`} className={mentoStyle.linkPage}>
            <span className={mentoStyle.span}>{postInfo.title}</span>
          </Link>
        </div>

        <div
          className={mentoStyle.postsContents}
          style={{ marginRight: "25px" }}
        >
          <span style={{ marginRight: "37px" }}>{postInfo.creatorName}</span>{" "}
          <span style={{ marginRight: "30px" }}>{postInfo.createDate}</span>{" "}
          <div style={{ width: "50px" }}>
            <span
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {postInfo.isReceipt == true ? "모집중" : "마감"}
            </span>
          </div>
        </div>
      </div>
      <hr className={mentoStyle.line2}></hr>
    </div>
  );
}
export default Posts;
