import axios from "axios";

const url = "http://ec2-3-37-185-169.ap-northeast-2.compute.amazonaws.com:8080";

export const UserInfo = (payload) => {
  return axios.get(`${url}/v1/user/info`, {
    headers: {
      Authorization: `Bearer ${payload}`,
    },
  });
};

export const SelfLogin = (payload) => {
  return axios.post(`${url}/v1/user/login`, payload);
};

export const ChangingInfo = (user, token) => {
  return axios.put(`${url}/v1/user/update`, user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const DeleteUser = (payload) => {
  return axios.delete(`${url}/v1/user/withdraw/${payload}`);
};

export const GoogleLogin = (payload) => {
  return axios.post(`${url}/v1/auth/join/plus`, payload);
};

export const SignUp = (payload) => {
  return axios.post(`${url}/v1/user/join`, payload);
};

export const sendEmailCode = (payload) => {
  return axios.get(
    `${url}/v1/user/emails/verification-requests?email=${payload}`
  );
};

export const confirmEmailCode = (email, code) => {
  return axios.get(
    `${url}/v1/user/emails/verifications?email=${email}&code=${code}`
  );
};

export const mentoScroll = (token) => {
  return axios.get(`${url}/v1/mentoring/my?last=`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const menteeScroll = (token) => {
  return axios.get(`${url}/v1/mentee/my?last=`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
