import React from "react";
import NewSideBar from "../components/menuBar/newSideBar";
import useWindowSize from "../components/useWindowSize.js";
import Game from "./newGame";

const MyPage = () => {
  const windowSize = useWindowSize();
  return (
    <div className="myPageFirstClass">
      <NewSideBar />

      {/* <NewModal /> */}
      <div className="gameFoam">
        <Game></Game>
      </div>
    </div>
  );
};

export default MyPage;
