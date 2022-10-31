import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Image,
  Pressable,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Button } from "react-native-elements";
import { useSelector } from "react-redux";

import ItemFriend from "../Friend/ItemFriend";
import roomAPI from "../../api/roomAPI";
import userAPI from "../../api/userAPI";
import { useRoute } from "@react-navigation/core";
const FriendScreen = ({ navigation }) => {
  const userObject = useSelector((state) => state.user.user.user);
  const idLogin = userObject._id;
  const token = useSelector((state) => state.user.user.accessToken);
  const [resultListUser, setResultListUser] = useState(true);
  const [resultUser, setResultUser] = useState(false);
  const [enteredName, setEnterName] = useState("");
  const [user, setUser] = useState([]);
  const [icon, seticon] = useState(false);
  const route = useRoute();
  const socket = route.params.socket;
  // console.log(socket);
  ///Lấy danh sách bạn bè
  const [arrayFriend, setArrayFriend] = useState([]);
  useEffect(() => {
    const fetchGetRoomFriend = async () => {
      try {
        const requestGetRoomByFriend = await roomAPI.getRoomFriend(token);
        setArrayFriend(requestGetRoomByFriend.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetRoomFriend();
  }, []);
  const ReceiveFromFriend = ({ user }) => {
    navigation.navigate("Friendd", { user: user.users });
  };
  const searchHandler = async () => {
    const fetchGetUserByPhone = async () => {
      try {
        const getuser = await userAPI.GetUserByName(enteredName, token);
        if (getuser.status === 200) {
          setResultUser(true);
          setResultListUser(false);
          setUser(getuser.data.users);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetUserByPhone();
  };
  //
  useEffect(() => {
    socket.current.on("accept-by-me", async (data) => {
      try {
        const requestGetRoomByFriend = await roomAPI.getRoomFriend(token);
        setArrayFriend(requestGetRoomByFriend.data);
        socket.current.emit("join-room-after-accept-by-me", data);
      } catch (error) {
        console.log(error);
      }
    });
  }, []);
  useEffect(() => {
    socket.current.on("friend-request-accept-status", async (data) => {
      try {
        const requestGetRoomByFriend = await roomAPI.getRoomFriend(token);
        setArrayFriend(requestGetRoomByFriend.data);
        socket.current.emit("join-room-after-acceptFriend", data);
      } catch (error) {
        console.log(error);
      }
    });
  }, []);
  //
  useEffect(() => {
    socket.current.on("delete-friend-by-me", async (data) => {
      try {
        const requestGetRoomByFriend = await roomAPI.getRoomFriend(token);
        setArrayFriend(requestGetRoomByFriend.data);
      } catch (error) {
        console.log(error);
      }
    });
  }, []);
  //
  useEffect(() => {
    socket.current.on("delete-friend", async (data) => {
      try {
        const requestGetRoomByFriend = await roomAPI.getRoomFriend(token);
        setArrayFriend(requestGetRoomByFriend.data);
      } catch (error) {
        console.log(error);
      }
    });
  }, []);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.con}>
        <View style={styles.con2}>
          <View style={styles.containerr}>
            <View style={styles.maincontainer}>
              <TextInput
                placeholder="Nhập tên bạn bè cần tìm "
                value={enteredName}
                onChangeText={(text) => {
                  setEnterName(text);
                  seticon(text == null ? false : true);
                }}
                style={styles.textinputt}
              />
              {icon && (
                <AntDesign
                  style={styles.iconn}
                  name="closecircle"
                  size={24}
                  color="#2089dc"
                  onPress={() => {
                    seticon(false);
                    setEnterName(null);
                    setResultListUser(true);
                    setResultUser(false);
                  }}
                />
              )}
            </View>
            <View style={styles.buttonsend}>
              <Pressable onPress={searchHandler}>
                {/* <FontAwesome name="search" size={24} color="white" /> */}
                <Text style={{ fontWeight: "bold", color: "#fff" }}>Tìm</Text>
              </Pressable>
            </View>
          </View>
        </View>
        <View style={styles.b1}>
          <Button
            containerStyle={styles.button}
            onPress={() => navigation.navigate("LSF", { socket: socket })}
            title="Lời mời đã gửi"
          />
          <Button
            containerStyle={styles.button}
            onPress={() => navigation.navigate("LRF", { socket: socket })}
            title="Lời mời kết bạn"
          />
        </View>
        <View style={styles.b2}>
          <Text style={styles.text}>Danh sách bạn bè</Text>
        </View>
        <View style={styles.b3}>
          {resultListUser && (
            <ScrollView>
              {arrayFriend.map((data) => {
                return (
                  <ItemFriend
                    onReceiveFromFriend={ReceiveFromFriend}
                    data={data}
                    key={data._id}
                    idLogin={idLogin}
                  />
                );
              })}
            </ScrollView>
          )}
          {resultUser && (
            <ScrollView>
              {user.map((data) => {
                return (
                  <View style={styles.leftContainerr} key={data._id}>
                    <Image
                      source={{ uri: data.avatar }}
                      style={styles.avatarr}
                    />
                    <View style={styles.cenContainerr}>
                      <Text style={styles.usernamee}>{data.name}</Text>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default FriendScreen;

const styles = StyleSheet.create({
  con: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  con2: {
    flexDirection: "row",
    backgroundColor: "#fff",
    height: "14%",
    alignItems: "center",
  },
  b1: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginLeft: 10,
    width: "100%",
    backgroundColor: "#fff",
    height: "6%",
    marginBottom: "3%",
  },
  b2: {
    backgroundColor: "#fff",
    marginTop: "2%",
    height: "5%",
    width: "100%",
  },
  b3: {
    height: "70%",
    flex: 1,
    padding: 10,
  },
  con3: {
    width: "100%",
    height: "30%",
  },
  con4: {
    width: "100%",
    height: "50%",
    backgroundColor: "#fff",
  },
  container: {
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  leftContainer1: {
    flexDirection: "row",
    width: "100%",
  },
  leftContainer: {
    flexDirection: "row",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  lastmess: {
    fontSize: 16,
    color: "grey",
    width: 150,
    marginTop: 15,
  },
  cenContainer: {
    flexDirection: "column",
    paddingRight: 25,
    marginLeft: 10,
  },
  time: {
    fontSize: 16,
  },
  textinput: {
    borderWidth: 1,
    borderColor: "black",
    width: "80%",
    marginBottom: 15,
    marginTop: 15,
    marginLeft: "10%",
    marginRight: "10%",
    borderRadius: 10,
    borderColor: "#a6a6a6",
  },
  icon: {
    position: "absolute",
    marginLeft: "83%",
    marginTop: 15,
  },
  text: {
    fontWeight: "bold",
    color: "#2089dc",
    fontSize: 16,
    marginLeft: 20,
  },
  button: {
    width: 150,
    marginRight: 10,
    height: 100,
  },
  leftContainerr: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    justifyContent: "center",
    padding: 30,
  },
  usernamee: {
    fontWeight: "bold",
    fontSize: 16,
    width: 200,
  },
  cenContainerr: {
    paddingRight: 25,
    marginLeft: 10,
    flex: 1,
  },
  avatarr: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  containerr: {
    flexDirection: "row",
    margin: 10,
    alignItems: "center",
  },
  maincontainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 50,
    marginRight: "5%",
    flex: 1,
    alignItems: "center",
    borderColor: "#2089dc",
    borderWidth: 1,
    width: "80%",
  },
  textinputt: {
    flex: 1,
    marginHorizontal: 10,
  },
  iconn: {
    marginHorizontal: 10,
  },
  buttonsend: {
    backgroundColor: "#2089dc",
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
