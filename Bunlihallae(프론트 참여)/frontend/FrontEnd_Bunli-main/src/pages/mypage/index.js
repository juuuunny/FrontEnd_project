import NewModal from "./newModal";
import React from "react";
import NewSideBar from "../components/menuBar/newSideBar";
import useWindowSize from "../components/useWindowSize.js";

const MyPage = () => {
  const windowSize = useWindowSize();
  return (
        <div className="myPageFirstClass">
          {windowSize.width > 520 ? <NewSideBar /> : <></>}

          <NewModal />
        </div>
  );
};

export default MyPage;
