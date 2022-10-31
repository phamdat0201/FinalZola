import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Button } from "react-native-elements";
import ItemRoom from "../Room/ItemRoom";
import roomAPI from "../../api/roomAPI";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useRoute } from "@react-navigation/core";
import messageAPI from "../../api/messageAPI";
import { Alert } from "react-native";
const GroupTab = ({ navigation }) => {
  const route = useRoute();
  const socket = route.params.socket;
  const loggedInUser = useSelector((state) => state.user.user.user._id);
  const token = useSelector((state) => state.user.user.accessToken);
  const [arrayMess, setArrayMess] = useState([]);
  const [icon, seticon] = useState(false);
  useEffect(() => {
    const fetchGetRoomAfterLogin = async () => {
      try {
        const requestGetRoomAfterLogin = await roomAPI.getRoomGroup(token);
        setArrayMess(requestGetRoomAfterLogin.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGetRoomAfterLogin();
  }, []);
  //
  useEffect(() => {
    setTimeout(() => {
      route.params.socket.current.on("delete-group", async (data) => {
        try {
          const requestGetRoomAfterLogin = await roomAPI.getRoomGroup(token);
          setArrayMess(requestGetRoomAfterLogin.data);
        } catch (error) {
          console.log(error);
        }
      });
    }, 150);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      route.params.socket.current.on("send-message", async (data) => {
        try {
          const requestGetRoomAfterLogin = await roomAPI.getRoomGroup(token);
          setArrayMess(requestGetRoomAfterLogin.data);
        } catch (error) {
          console.log(error);
        }
      });
    }, 100);
  }, []);
  //
  const [resultListUser, setResultListUser] = useState(true);
  const [resultUser, setResultUser] = useState(false);
  const [enteredName, setEnterName] = useState("");
  const [user, setUser] = useState([]);
  const searchHandler = async () => {
    const fetchGetUserByPhone = async () => {
      try {
        const getuser = await roomAPI.getRoomByNameRoom(enteredName, token);
        if (getuser.status === 200) {
          setResultUser(true);
          setResultListUser(false);
          setUser(getuser.data);
        }
      } catch (error) {
        Alert.alert("Không tìm thấy");
      }
    };
    fetchGetUserByPhone();
  };

  useEffect(() => {
    route.params.socket.current.on("join-room-group", async (data) => {
      try {
        const requestGetRoomAfterLogin = await roomAPI.getRoomGroup(token);
        setArrayMess(requestGetRoomAfterLogin.data);
        setTimeout(() => {
          route.params.socket.current.emit("join-room-socket", data);
        }, 10);
      } catch (error) {
        console.log(error);
      }
    });
  }, []);
  useEffect(() => {
    route.params.socket.current.on("swapRoomMaster-by-me", async (data) => {
      try {
        const requestGetRoomAfterLogin = await roomAPI.getRoomGroup(token);
        setArrayMess(requestGetRoomAfterLogin.data);
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
          <View style={styles.container}>
            <View style={styles.maincontainer}>
              <TextInput
                placeholder="Nhập tên nhóm cần tìm "
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
                <Text style={{ fontWeight: "bold", color: "#fff" }}>Tìm</Text>
              </Pressable>
            </View>
          </View>
        </View>
        <View style={styles.b1}>
          <Button
            style={styles.button}
            onPress={() => navigation.navigate("CG")}
            title="Tạo nhóm"
            icon={
              <MaterialIcons
                style={{ marginRight: 10 }}
                name="add-circle"
                size={24}
                color="white"
              />
            }
          />
        </View>
        <View style={styles.b2}>
          <Text style={styles.text}>Danh sách nhóm</Text>
        </View>
        <View style={styles.b3}>
          {resultListUser && (
            <ScrollView>
              {arrayMess.map((data) => {
                return (
                  <ItemRoom
                    data={data}
                    key={data._id}
                    idLogin={loggedInUser}
                    socket={socket}
                  />
                );
              })}
            </ScrollView>
          )}
          {resultUser && (
            <ScrollView>
              {user.map((data) => {
                return (
                  <ItemRoom
                    data={data}
                    key={data._id}
                    idLogin={loggedInUser}
                    socket={socket}
                  />
                );
              })}
            </ScrollView>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default GroupTab;

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
    backgroundColor: "#fff",
    marginLeft: 10,
    width: "35%",
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
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  time: {
    fontSize: 16,
  },
  textinput: {
    borderWidth: 1,
    borderColor: "black",
    flex: 1,
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
  container: {
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
