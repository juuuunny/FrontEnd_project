import axios from "axios";

const URL = "http://ec2-3-37-185-169.ap-northeast-2.compute.amazonaws.com:8080";

//멘토링 게시글 생성
export const createPost = (postInfo, accessToken) => {
  console.log(postInfo);
  return axios.post(`${URL}/v1/mentoring`, postInfo, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

//멘토링 게시글 수정
export const editPost = (postInfo, accessToken, postingId) => {
  console.log(postInfo);
  return axios.put(`${URL}/v1/mentoring/${postingId}`, postInfo, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

//멘토링 게시글 조회

export const viewPostList = (searchText, searchCategory, accessToken, page) => {
  function getUrl() {
    if (searchText === "" && searchCategory === "")
      return `/v1/mentoring/list?page=${page}`;
    else if (searchText !== "" && searchCategory === "")
      return `/v1/mentoring/list?page=${page}&title=${searchText}`;
    else if (searchText === "" && searchCategory !== "")
      return `/v1/mentoring/list?page=${page}&category=${searchCategory}`;
    else
      return `/v1/mentoring/list?page=${page}&category=${searchCategory}&title=${searchText}`;
  }

  return axios.get(URL + getUrl(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

//멘토링 게시글 상세조회

export const viewPostDetail = (postingId, accessToken) => {
  return axios.get(`${URL}/v1/mentoring/${postingId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

//멘토링 게시글 삭제

export const deletePost = (postingId) => {
  return axios.delete(`${URL}/v1/mentoring/${postingId}`);
};

//멘토링 마감

export const endMentoring = (postingId) => {
  return axios.patch(`${URL}/v1/mentoring/${postingId}/receipt`);
};

//멘토링 신청

export const applyMentoring = (postingId, description, accessToken) => {
  return axios.post(
    `${URL}/v1/mentee/${postingId}`,
    {
      description: description,
    },
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
};

export const applyMentee = (menteeId) => {
  return axios.get(`${URL}/v1/mentee/${menteeId}`);
};
