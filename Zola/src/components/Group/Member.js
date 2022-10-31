import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  Pressable,
} from "react-native";
import { Button } from "react-native-elements";
import addFriendAPI from "../../api/addFriendAPI";
import { FontAwesome5 } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import groupAPI from "../../api/groupAPI";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/core";
const Member = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [user, setUser] = useState(null);
  const [isRequestHandler, setIsRequestHandler] = useState(false);
  const [key, setkey] = useState(false);
  const [btn, setbtn] = useState(true);
  const token = useSelector((state) => state.user.user.accessToken);
  const loggedInUser = props.inlogin;
  useEffect(() => {
    const fetchGetUser = async () => {
      try {
        const requestGetUser = await addFriendAPI.getUser({
          userID: props.data,
        });
        setUser(requestGetUser.data);
        if (requestGetUser.data.users._id == props.room.roomMaster) {
          setkey(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetUser();
  }, []);
  const removememberhandler = () => {
    const fetchRemoveMember = async () => {
      try {
        const removeMember = await groupAPI.removeMember(
          {
            id: props.room._id,
            userWantRemove: user?.users._id,
          },
          token
        );
        if (removeMember.status === 200) {
          setIsRequestHandler(true);
          if (props.data.length - 1 < 3) {
            const fetchDeleteGroup = async () => {
              try {
                const deleteGroup = await groupAPI.deleteGroup(
                  {
                    id: props.room._id,
                  },
                  token
                );
                if (deleteGroup.status === 200) {
                  console.log(
                    "Delete Group luôn nè má tại còn dưới 3 ngừ à huhu"
                  );
                }
              } catch (error) {
                console.log(error);
              }
            };
            fetchDeleteGroup();
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRemoveMember();
  };
  //chuyen key
  const changekeyhandler = () => {
    const fetchTransLeader = async () => {
      try {
        const transLeader = await groupAPI.swapRoomMaster(
          {
            id: props.room._id,
            userWantSwap: user?.users._id,
          },
          token
        );
        if (transLeader.status === 200) {
          // navigation.navigate("GroupTab");
          Alert.alert("Ok con dê");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTransLeader();
  };

  return (
    <ScrollView style={{ width: "100%" }}>
      {!isRequestHandler && (
        <View style={styles.con}>
          <View style={styles.leftContainer}>
            <Image
              source={{uri: user?.users.avatar}}
              style={styles.avatar}
            />
            <View style={styles.cenContainer}>
              <Text numberOfLines={1} style={styles.username}>
                {user?.users.name}
              </Text>
              {/* {key && <FontAwesome5 name="key" size={17} color="#ffbb33" />} */}
            </View>
            {user?.users._id != props.room.roomMaster ? (
              loggedInUser == props.room.roomMaster ? (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Pressable onPress={changekeyhandler}>
                    <MaterialCommunityIcons
                      name="key-arrow-right"
                      size={26}
                      color="#ffcc66"
                      style={{ marginRight: 10 }}
                    />
                  </Pressable>
                  <Button
                    containerStyle={styles.button}
                    onPress={removememberhandler}
                    title="Xóa"
                    type="outline"
                  />
                </View>
              ) : null
            ) : null}
          </View>
        </View>
      )}
    </ScrollView>
  );
};
export default Member;
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
    paddingLeft: 30,
    paddingRight: 30,
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
    flexDirection: "column",
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
    width: 70,
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
