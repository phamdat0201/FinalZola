import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Pressable
} from "react-native";
import { Button } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import roomAPI from "../../api/roomAPI";
import groupAPI from "../../api/groupAPI";
import { addListUser, removeListUser } from "../../api/listUserSlice";
import { AntDesign } from "@expo/vector-icons";
import addFriendAPI from "../../api/addFriendAPI";
const CreateGroup = ({ navigation }) => {
  const dispatch = useDispatch();
  const userObject = useSelector((state) => state.user.user.user);
  const idLogin = userObject._id;
  const token = useSelector((state) => state.user.user.accessToken);
  const ListUserRedux = useSelector((state) => state.listUser);
  const [enterNameGroup, setEnterNameGroup] = useState("");
  const [icon, seticon] = useState(false);
  const [iconn, seticonn] = useState(false);
  const [resultUser1, setResultUser1] = useState(false);
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

  const array = [];
  ListUserRedux.listUser.map((user) => {
    array.push(user.id);
  });

  const addGroupHandler = () => {
    if (enterNameGroup.length > 0) {
      if (array.length > 1) {
        const fetchAddGroup = async () => {
          try {
            const addGroup = await groupAPI.addGroup(
              {
                NameGroup: enterNameGroup,
                ListUsers: array,
              },
              token
            );
            if (addGroup.status === 200) {
              ListUserRedux.listUser.map((user) => {
                const action = removeListUser({
                  idNeedToRemove: user.id,
                });
                dispatch(action);
              });
            }
            navigation.navigate("GroupTab");
          } catch (error) {
            console.log(error);
          }
        };
        fetchAddGroup();
      } else {
        Alert.alert("Nhóm phải từ 2 người trở lên");
      }
    } else {
      Alert.alert("Chưa điền tên nhóm");
    }
  };
  //

  const [enteredName, setEnterName] = useState("");
  const [user, setUser] = useState([]);
  const [resultUser, setResultUser] = useState(false);
  const [resultListUser, setResultListUser] = useState(true);
  const searchHandler = async () => {
    const fetchGetUserByPhone = async () => {
      try {
        const getuser = await addFriendAPI.GetUserByPhone(enteredName, token);
        if (getuser.status === 200) {
          setResultUser(true);
          setResultListUser(false);
          setUser(getuser.data.users);
        }
      } catch (error) {
        Alert.alert("Không tìm thấy")
      }
    };
    fetchGetUserByPhone();
  };
  // //add to listuserslice
  const [listUser, setListUser] = useState([]);
  const [addingroup, setaddingroup] = useState(true);
  const [deleteingroup, setdeleteingroup] = useState(false);
  const addUserInListHandler = () => {
    const action = addListUser({
      id: user._id,
      name: user.name,
      avatar: user.avatar,
    });
    dispatch(action);
    setListUser(ListUserRedux);
    setaddingroup(false);
    setdeleteingroup(true);
    setResultUser(false);
    setResultUser1(true);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        {/* <View style={styles.anh}>
          <Image style={styles.image} source={require("../../images/b.jpg")} />
        </View> */}
        <View style={styles.con2}>
          <View style={styles.containerr}>
            <View style={styles.maincontainerrr}>
              <TextInput
                placeholder="Nhập tên nhóm"
                value={enterNameGroup}
                onChangeText={(text) => {
                  setEnterNameGroup(text);
                  seticonn(text == null ? false : true);
                }}
                style={styles.textinputt}
              />
              {iconn && (
                <AntDesign
                  style={styles.iconn}
                  name="closecircle"
                  size={24}
                  color="#2089dc"
                  onPress={() => {
                    seticonn(false);
                    setEnterNameGroup(null);
                  }}
                />
              )}
            </View>
          </View>
        </View>
        <View style={styles.con2}>
          <View style={styles.containerr}>
            <View style={styles.maincontainer}>
              <TextInput
                placeholder="Nhập số điện thoại cần tìm"
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
        <View style={styles.body}>
          {resultUser && (
            <View style={styles.leftContainerr}>
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
              <View style={styles.cenContainer}>
                <Text style={styles.usernamee}>{user.name}</Text>
              </View>
              <Button title="Thêm" onPress={addUserInListHandler} />
            </View>
          )}
        </View>
        <View style={styles.body1}>
          <View
            style={{
              borderBottomColor: "grey",
              borderBottomWidth: 1,
            }}
          />
          {resultUser1 && (
            <ScrollView>
              {ListUserRedux.listUser.map((data) => {
                return (
                  <View style={styles.leftContainerr} key={data.id}>
                    <Image
                      source={{ uri: data.avatar }}
                      style={styles.avatar}
                    />
                    <View style={styles.cenContainer}>
                      <Text style={styles.usernamee}>{data.name}</Text>
                    </View>
                    <Button
                      title="Xóa"
                      type="outline"
                      onPress={() => {
                        const action = removeListUser({
                          idNeedToRemove: data.id,
                        });
                        dispatch(action);
                        setListUser(ListUserRedux);
                        setaddingroup(true);
                        setdeleteingroup(false);
                        setResultUser(false);
                        setResultUser1(true);
                      }}
                    />
                  </View>
                );
              })}
            </ScrollView>
          )}
        </View>
        <View style={styles.end}>
          <Button
            style={styles.button}
            title="Tạo nhóm"
            onPress={addGroupHandler}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
export default CreateGroup;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  anh: {
    width: "100%",
    height: "15%",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    width: "100%",
    height: "10%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textttt: {
    borderWidth: 1,
    borderColor: "black",
    flex: 1,
    height: 30,
    marginTop: 5,
    marginRight: 15,
  },
  viewten: {
    width: "100%",
    height: "5%",
    backgroundColor: "#bfbfbf",
    justifyContent: "center",
  },
  viewtim: {
    width: "100%",
    height: "10%",
    flexDirection: "row",
    padding: 15,
  },
  body: {
    width: "100%",
    height: "15%",
  },
  body1: {
    width: "100%",
    height: "40%",
    backgroundColor: "#fff",
  },
  end: {
    width: "60%",
    height: "10%",
    justifyContent: "center",
  },
  font: {
    fontSize: 20,
    width: "30%",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "black",
    width: "60%",
    height: 30,
  },
  button: {
    marginTop: 10,
  },
  image: {
    width: 85,
    height: 85,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#bfbfbf",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 23,
  },
  leftContainerr: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    justifyContent: "center",
    paddingLeft: 30,
    paddingRight: 30,
  },
  usernamee: {
    fontWeight: "bold",
    fontSize: 16,
    width: 200,
  },
  cenContainer: {
    paddingRight: 25,
    marginLeft: 10,
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "grey",
  },
  buttonn: {
    width: 100,
    marginTop: 10,
  },
  body0: {
    alignItems: "flex-start",
    width: "100%",
    height: "7%",
    paddingLeft: 15,
  },
  containerr: {
    flexDirection: "row",
    marginRight: 5,
    marginLeft:5,
    alignItems: "center",
    backgroundColor: "#fff",
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
  con2: {
    flexDirection: "row",
    backgroundColor: "#fff",
    height: "10%",
    alignItems: "center",
  },
  maincontainerrr: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 50,
    flex: 1,
    alignItems: "center",
    borderColor: "#2089dc",
    borderWidth: 1,
    width: "80%",
  },
});
