import axiosClient from "./axiosClient";

const signinAPI = {
    signIn(phoneNumber) {
    const url = "/auth/signin"
    return axiosClient.post(url, phoneNumber);
  }

};

export default signinAPI;
