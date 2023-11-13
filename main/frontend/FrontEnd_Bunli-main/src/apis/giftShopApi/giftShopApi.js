import axios from "axios";

const url = "http://localhost:8080";

// 해당 지역에 해당하는 상품리스트 받기
export const giftListApi = (region, token) => {

  return axios.get(`${url}/shop?area=${region}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 해당 상품의 상품 세부정보 받기
export const giftDetailApi = (productId, token) => {
  return axios.get(`${url}/shop/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//해당상품 구매요청하기
export const orderGiftApi = (token, productId) => {
  return axios.post(`${url}/shop/${productId}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};