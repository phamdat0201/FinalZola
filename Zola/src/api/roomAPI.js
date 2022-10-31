import axiosClient from "./axiosClient";

const roomAPI = {
  getRoomByUserId(userId) {
    const url = "/rooms/getRoomByUserId/" + userId.userId;
    return axiosClient.get(url, userId);
  },
  getRoomFriend(token) {
    const url = "/rooms/getRoomFriend/";
    return axiosClient.get(url, { headers: { authorization: token } });
  },
  getRoomGroup(token) {
    const url = "/rooms/getRoomGroup/";
    return axiosClient.get(url, { headers: { authorization: token } });
  },
  getRoomAfterLogin(token) {
    //load list mess
    const url = "/rooms/getRoomAfterLogin/";
    return axiosClient.get(url, { headers: { authorization: token } });
  },

  getRoomByNameRoom(name, token) {
    //load list mess
    const url = "/rooms/getRoomByNameRoom/";
    return axiosClient.post(
      url,
      { name: name },
      { headers: { authorization: token } }
    );
  },
  getRoomByNameFriend(friendname, token) {
    const url = "/rooms/getRoomByNameFriend/";
    return axiosClient.post(
      url,
      { name: friendname },
      { headers: { authorization: token } }
    );
  },
};

export default roomAPI;
