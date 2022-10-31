import axiosClient from "./axiosClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
const userAPI = {
    replaceUser(userID,token) {
    AsyncStorage.setItem("user", JSON.stringify(userID.newUser));
  // console.log('====================================');
  // AsyncStorage.getItem("user").then((res) => {
  //   console.log(res);
  // });
  // console.log('====================================');
    const url = "/users/" +userID.userID;
    return axiosClient.put(url,userID.newUser,{ 'headers': { 'authorization': token }});
  },
    GetUserByName(friendname,token) {
    const url = "/users/GetFriendByName";
    return axiosClient.post(url,{name:friendname},{ 'headers': { 'authorization': token }});
  },
   ChangePassword(data,token) {
    const url = "/auth/ChangePassword";
    return axiosClient.post(url,{password: data.password,reEnterPassword: data.reEnterPassword,newPassword: data.newPassword,},{ 'headers': { 'authorization': token }});
  },
};



export default userAPI;
