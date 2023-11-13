import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import MenuBar from "../components/menuBar/menuBar.js";
import { giftListApi } from "../../apis/giftShopApi/giftShopApi.js";

const Giftshop = () => {
  const token = localStorage.getItem("token");

  const [region, setRegion] = useState("충청도");

  const click0 = () => {
    setRegion("충청도");
  };
  const click1 = () => {
    setRegion("강원도");
  };
  const click2 = () => {
    setRegion("전라도");
  };
  const click3 = () => {
    setRegion("제주도");
  };

  const [giftList, setGiftList] = useState([]);

  const getGiftList = async (region) => {
    try {
      await giftListApi(region, token).then((res) => {
        setGiftList(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getGiftList(region);
  }, [region]);

  return (
      <div>
        <MenuBar />
        <div className="giftshopTopClass">
          <div className="giftshopTop">
            <Link
                to="/giftshop"
                style={{
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "black",
                }}
            >
              <i className="fa-solid fa-gift"></i>
              기프티콘 샵
            </Link>
          </div>
          <div className="category">
            <Button onClick={click0} data-checked={region === "충청도"}>
              <i class="fa-solid fa-folder" style={{ color: "#ffff88" }}></i>
              충청도
            </Button>
            <Button onClick={click1} data-checked={region === "강원도"}>
              <i class="fa-solid fa-folder" style={{ color: "#ffff88" }}></i>
              강원도
            </Button>
            <Button onClick={click2} data-checked={region === "전라도"}>
              <i class="fa-solid fa-folder" style={{ color: "#ffff88" }}></i>
              전라도
            </Button>
            <Button onClick={click3} data-checked={region === "제주도"}>
              <i class="fa-solid fa-folder" style={{ color: "#ffff88" }}></i>
              제주도
            </Button>
          </div>

          <div className="products">
            {giftList.map((product) => (
                <Link to={`/giftshop/${product.productId}`} key={product.productId} style={{ textDecoration: "none", color: "black" }}>
                  <div className="product">
                    <img src={product.productImg} alt={product.productName} />
                    <div className="name">{product.productName}</div>
                    <div className="price">{product.productPrice}M</div>
                  </div>
                </Link>
            ))}
          </div>
        </div>
      </div>
  );
};

export default Giftshop;
