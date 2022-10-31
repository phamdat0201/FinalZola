import axiosClient from "./axiosClient";

const messageAPI = {
  GetMessage(message,token) {
    const url = "/messages/" + message.idRoom;
    return axiosClient.get(url,{ 'headers': { 'authorization': token }});
  },
  AddMessage(message,token) {
    const url = "/messages/addMessage";
    return axiosClient.post(url, message.message,{ 'headers': { 'authorization': token }});
  },
  AddFile(data,token) {
    const url = "/messages/addFile";
    return axiosClient.post(url, data,{ 'headers': { 'authorization': token }});
  },
  CallVideo(roomId,token) {
    const url = "/messages/callVideo";
    return axiosClient.post(url, { RoomId: roomId.idRoom },{ 'headers': { 'authorization': token }});
  },
};

export default messageAPI;