import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Button } from "react-native-elements";
import addFriendAPI from "../../api/addFriendAPI";
import { useSelector } from "react-redux";
const SearchScreen = ({ navigation }) => {
  const [resultRequest, setResultRequest] = useState("Thêm bạn");
  const [enteredPhone, setEnterPhone] = useState("");
  const [resultUser, setResultUser] = useState(false);
  const [user, setUser] = useState({});
  const token = useSelector((state) => state.user.user.accessToken);
  const [icon, seticon] = useState(false);
  const addFriendHandler = () => {
    const fetchRequestAddFriend = async () => {
      try {
        const requestAddFriend = await addFriendAPI.requestAddFriend(
          user._id,
          token
        );
        setResultRequest("Hủy lời mời");
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestAddFriend();
  };
  const searchHandler = async () => {
    const fetchGetUserByPhone = async () => {
      try {
        const getuser = await addFriendAPI.GetUserByPhone(enteredPhone, token);
        if (getuser.status === 200) {
          setResultUser(true);
          setUser(getuser.data.users);
          //Kiểm tra đã gửi hay chưa
          const FetchcheckSendRequest = async () => {
            const requestCheckSendRequest = await addFriendAPI.checkSendRequest(
              getuser.data.users._id,
              token
            );
            if (requestCheckSendRequest.data.success === true) {
              setResultRequest((pre) => {
                return pre, "Hủy lời mời";
              });
            } else {
              //kiểm tra đã là bạn hay chưa
              const FetchcheckFriend = async () => {
                const requestCheckcheckFriend = await addFriendAPI.checkFriend(
                  getuser.data.users._id,
                  token
                );
                if (requestCheckcheckFriend.data.success === true) {
                  setResultRequest("Đã là bạn bè");
                } else {
                  setResultRequest("Thêm");
                }
              };
              FetchcheckFriend();
            }
          };
          FetchcheckSendRequest();
          //
        }
      } catch (error) {
        Alert.alert("Không tìm thấy")
      }
    };
    fetchGetUserByPhone();
  };
  
  //hủy kb
  const DeleteFriendHandler = () => {
    const fetchDeleteFriend = async () => {
      try {
        const deleteFriend = await addFriendAPI.deleteFriend(
          {
            friendId: user._id,
          },
          token
        );
        if (deleteFriend.status === 200) {
          setResultRequest("Thêm");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDeleteFriend();
  };
  const choicedeletefriend = () => {
    Alert.alert("Bạn có muốn kết bạn hay không?", "", [
      {
        text: "Xóa kết bạn",
        onPress: () => {
          DeleteFriendHandler();
        },
      },
      {
        text: "Hủy",
      },
    ]);
  };
  
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
                placeholder="Nhập số điện thoại cần tìm "
                value={enteredPhone}
                onChangeText={(text) => {
                  setEnterPhone(text);
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
                    setEnterPhone(null);
                    setResultUser(false);
                  }}
                />
              )}
            </View>
            <View style={styles.buttonsend}>
              <Button onPress={searchHandler} title="Tìm" />
            </View>
          </View>
        </View>

        {resultUser && (
          <View style={styles.con}>
            <View style={styles.leftContainer}>
              <Image
                source={{uri:user.avatar}}
                style={styles.avatar}
              />
              <View style={styles.cenContainer}>
                <Text numberOfLines={1} style={styles.username}>
                  {user.name}
                </Text>
              </View>
              {resultRequest === "Hủy lời mời" ? (
                <Button  title={resultRequest} />
              ) : null}
              {resultRequest === "Thêm" ? (
                <Button onPress={addFriendHandler} title={resultRequest} />
              ) : null}
              {resultRequest === "Đã là bạn bè" ? (
                <Button onPress={choicedeletefriend} title={resultRequest} />
              ) : null}
            </View>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  con: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    flexDirection: "column",
  },
  con2: {
    flexDirection: "row",
    backgroundColor: "#fff",
    height: "14%",
    alignItems: "center",
  },
  container: {
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    justifyContent: "center",
    padding: 15,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "grey",
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
    width: 200,
  },
  lastmess: {
    fontSize: 16,
    color: "grey",
    width: 200,
    marginTop: 15,
  },
  cenContainer: {
    paddingRight: 25,
    marginLeft: 10,
    flex: 1,
  },
  time: {
    fontSize: 16,
  },
  aa: {
    marginLeft: 50,
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
  button: {
    width: 100,
    marginTop: 10,
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
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: "15%",
  },
});
