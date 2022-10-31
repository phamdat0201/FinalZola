import axiosClient from "./axiosClient";

const addFriendAPI = {
  GetUserByPhone(phoneNumber,token) {
    const url = "/users/GetUserByPhone";
    return axiosClient.post(url, {phone:phoneNumber},{ 'headers': { 'authorization': token }});
  },

  checkFriend(userID,token) {
    const url = "/users/checkFriend/" + userID;
    return axiosClient.get(url,{ 'headers': { 'authorization': token }});
  },

  checkSendRequest(userID,token) {
    const url = "/userRequest/checkSendRequest/" + userID;
    console.log(url);
    return axiosClient.get(url,{ 'headers': { 'authorization': token }});
  },

  requestAddFriend(id_UserWantAdd,token) {
    const url = "/users/requestAddFriend";
    return axiosClient.post(url,{id_UserWantAdd:id_UserWantAdd},{ 'headers': { 'authorization': token }});
  },

  getUser(userID) {
    const url = "/users/" + userID.userID;
    return axiosClient.get(url);
  },

  getListSenderRequest(token) {
    const url = "/userRequest/getListReceiver";
    return axiosClient.get(url,{ 'headers': { 'authorization': token }});
  },

  acceptFriend(requestId,token) {
    const url = "/users/acceptFriend";
    return axiosClient.post(url,{requestId: requestId},{ 'headers': { 'authorization': token }});
  },

  declineFriend(requestId,token) {
    const url = "/users/declineFriend";
    return axiosClient.post(url,{requestId: requestId},{ 'headers': { 'authorization': token }});
  },
  deleteFriend(friendId,token) {
    const url = "/users/deleteFriend";
    return axiosClient.post(url, {friendId: friendId.friendId},{ 'headers': { 'authorization': token }});
  },
  getListReceiver(token) {
    const url = "/userRequest/getListSenderRequest";
    return axiosClient.get(url,{ 'headers': { 'authorization': token }});
  },
  cancelSendedFriend(requestId,token) {
    const url = "/users/cancelSendedFriend";
    return axiosClient.post(url, requestId,{ 'headers': { 'authorization': token }});
  },
};

export default addFriendAPI;
