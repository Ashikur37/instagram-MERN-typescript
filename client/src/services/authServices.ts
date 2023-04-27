import axios from "axios";
import { config, getTokenFromLocalStorage } from "../utils/axiosConfig";

import { BASE_URL } from "../utils/baseUrl";
import {
  IForgotPassword,
  IResetPassword,
  UserEdit,
  UserLogin,
  UserLoginFaceBook,
  UserRegister,
} from "../utils/interface";

const register = async (user: UserRegister) => {
  const response = await axios.post(`${BASE_URL}/auth/register`, user, {
    withCredentials: true,
  });
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (user: UserLogin) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, user, {
    withCredentials: true,
  });
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const loginFacebookUser = async (data: UserLoginFaceBook) => {
  const response = await axios.post(`${BASE_URL}/auth/login-facebook`, data, {
    withCredentials: true,
  });
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};
const resetPassword = async (data: IResetPassword) => {
  const response = await axios.post(`${BASE_URL}/auth/reset-password/`, data);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const refreshToken = async () => {
  const firstLogin = getTokenFromLocalStorage().refreshToken;

  if (firstLogin) {
    const response = await axios.post(`${BASE_URL}/auth/refresh`, config());
    return response.data;
  }
};
const logout = async () => {
  localStorage.removeItem("user");

  await axios.post(`${BASE_URL}/auth/logout`, config(), {
    withCredentials: true,
  });

  window.location.href = "/";
};
const editUser = async (user: UserEdit) => {
  const response = await axios.put(`${BASE_URL}/auth`, user, config());

  return response.data;
};

const getCurrentUser = async () => {
  const response = await axios.get(`${BASE_URL}/auth`, config());

  return response.data;
};
const forgotPassword = async (data: IForgotPassword) => {
  const response = await axios.post(`${BASE_URL}/auth/forgot-password`, data);

  return response.data;
};

const authService = {
  login,
  register,
  refreshToken,
  logout,
  editUser,
  getCurrentUser,
  loginFacebookUser,
  resetPassword,
  forgotPassword,
};

export default authService;
