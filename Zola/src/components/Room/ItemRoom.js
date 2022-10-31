import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import addFriendAPI from "../../api/addFriendAPI";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { useSelector } from "react-redux";
import messageAPI from "../../api/messageAPI";
const ItemRoom = (props) => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();
  const [resetroom, setresetroom] = useState(props.data);
  const token = useSelector((state) => state.user.user.accessToken);
  useEffect(() => {
    props.socket.current.on("swapRoomMaster-by-me", (data) => {
      setresetroom(data);
    });
  }, []);
  useEffect(() => {
    if (resetroom.users.length > 2) {
      setUser(resetroom);
      const fetchGetUser = async () => {
        try {
          setUser(resetroom);
        } catch (error) {
          console.log(error);
        }
      };
      fetchGetUser();
    } else {
      const nameMessUserId = resetroom.users.find((m) => m !== props.idLogin);
      const fetchGetUser = async () => {
        try {
          const requestGetUser = await addFriendAPI.getUser({
            userID: nameMessUserId,
          });
          setUser(requestGetUser.data.users);
        } catch (error) {
          console.log(error);
        }
      };
      fetchGetUser();
    }
  }, []);
  const [lastMessages, setLastMessages] = useState("");
  const [lastTime, setlastTime] = useState("");
  const [messdata, setmessdata] = useState(null);
  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await messageAPI.GetMessage(
          {
            idRoom: props.data._id,
          },
          token
        );
        setmessdata(res.data.length);
        for (let i = 0; i < res.data.length; i++) {
          setLastMessages(res.data[i].text);
          setlastTime(res.data[i].createdAt);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessage();
  }, []);

  useEffect(() => {
    props.socket.current.on("send-message", (data) => {
      const fetchMessage = async () => {
        try {
          const res = await messageAPI.GetMessage(
            {
              idRoom: props.data._id,
            },
            token
          );
          for (let i = 0; i < res.data.length; i++) {
            setLastMessages(res.data[i].text);
            setlastTime(res.data[i].createdAt);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchMessage();
    });
  }, []);
  return (
    <ScrollView>
      <TouchableOpacity
        style={styles.con}
        onPress={() =>
          navigation.navigate("ChatOneOne", {
            user: user,
            room: resetroom,
            socket: props.socket,
            group: resetroom.group,
            length: resetroom.users.length,
            idLogin: props.idLogin,
          })
        }
      >
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <Image source={{ uri: user?.avatar }} style={styles.avatar} />

            <View style={styles.cenContainer}>
              <View style={{ flexDirection: "row" }}>
                <Text numberOfLines={1} style={styles.username}>
                  {JSON.stringify(user?.group) == "true"
                    ? "Nhóm: " + user?.name
                    : user?.name}
                </Text>
                <Text style={{ flex: 1, textAlign: "right" }}>
                  {messdata == 0 ? "" : moment(lastTime).fromNow()}
                </Text>
              </View>
              <Text style={{ width: 100, marginTop: 10 }} numberOfLines={1}>
                {lastMessages}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};
export default ItemRoom;
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
  },
  container: {
    flexDirection: "column",
    width: "100%",
    backgroundColor: "#fff",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    justifyContent: "center",
    paddingLeft: 15,
    paddingRight: 15,
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
  },
  cenContainer: {
    flexDirection: "column",
    padding: 15,
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
    marginLeft: 10,
  },
  on: {
    marginLeft: 150,
  },
});
