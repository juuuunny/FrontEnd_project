import axios from "axios";

const url = "http://ec2-3-37-185-169.ap-northeast-2.compute.amazonaws.com:8080";

export const getBoardListApi = (payload) => {
  return axios.get(`${url}/v1/posting/list?page=${payload}`, {
    headers: { Authorization: "Bearer debug" },
  });
};

export const writeBoardApi = (board, token) => {
  return axios.post(`${url}/v1/posting`, board, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getBoardDetailApi = (payload) => {
  return axios.get(
    // v1/posting/:id이렇게 바꾸기

    `${url}/v1/posting/${payload}`,
    {
      headers: { Authorization: `Bearer debug` },
    }
  );
};

export const deleteBoardApi = (id, token) => {
  return axios.delete(`${url}/v1/posting/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateBoardApi = (payload, token) => {
  return axios.put(`${url}/v1/posting/${payload.id}`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const writeCommentApi = (payload, token) => {
  return axios.post(`${url}/v1/reply/${payload.postId}`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getCommentListApi = (id, page) => {
  return axios.get(`${url}/v1/reply/${id}/list?&page=${page}`, {
    headers: { Authorization: "Bearer debug" },
  });
};

export const getCommentApi = (postId, id) => {
  return axios.get(`${url}/v1/reply/${postId}/${id}`, {
    headers: { Authorization: "Bearer debug" },
  });
};

export const deleteCommentApi = (postId, id, token) => {
  return axios.delete(`${url}/v1/reply/${postId}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateCommentApi = (payload, token) => {
  return axios.put(`${url}/v1/reply/${payload.postId}/${payload.id}`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
