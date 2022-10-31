import axiosClient from "./axiosClient";

const groupAPI = {
  getRoomByUserId(userId) {
    const url = "/rooms/getRoomByUserId/" + userId.userId;
    return axiosClient.get(url, userId);
  },
  addGroup(NameGroup,token) {
    const url = "/rooms/addRoom/";
    console.log(NameGroup);
    return axiosClient.post(url, { NameGroup: NameGroup.NameGroup,ListUsers: NameGroup.ListUsers},{ 'headers': { 'authorization': token }});
  },
  addMember(data,token) {
    const url = "/rooms/addMembers/";
    return axiosClient.post(url, { id:data.id, list_user_id:data.list_user_id},{ 'headers': { 'authorization': token }});
  },
  removeMember(data,token) {
    const url = "/rooms/removeMember/";
    return axiosClient.post(url, { id: data.id, userWantRemove: data.userWantRemove},{ 'headers': { 'authorization': token }});
  },
  deleteGroup(id,token) {
    const url = "/rooms/" +id.id;
    console.log(token);
    console.log(id.id);
    return axiosClient.delete(url,{ 'headers': { 'authorization': token }});
  },
  exitGroup(data,token) {
    const url = "/rooms/exit/";
    return axiosClient.post(url, {id: data.id},{ 'headers': { 'authorization': token }});
  },
  swapRoomMaster(id,token) {
    const url = "/rooms/swapRoomMaster";
    return axiosClient.post(url, {id: id.id, userWantSwap: id.userWantSwap},{ 'headers': { 'authorization': token }});
  },
  updateRoom(roomID, token) {
    const url = "/rooms/" + roomID.roomID;
    return axiosClient.put(url, {name: roomID.data.name, avatar:roomID.data.avatar},{ 'headers': { 'authorization': token }});
  },
};

export default groupAPI;
