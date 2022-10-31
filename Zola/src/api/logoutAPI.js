import axiosClient from "./axiosClient";

const logoutAPI = {
    logout(refreshtoken) {
    const url = "/auth/logout";
    return axiosClient.post(url, {refreshToken: refreshtoken.refreshToken});
  }
};

export default logoutAPI;