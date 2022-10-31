import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Pressable,
  FlatList,
} from "react-native";
import {
  FontAwesome5,
  Entypo,
  Fontisto,
  FontAwesome,
} from "@expo/vector-icons";
import { useSelector } from "react-redux";
import messageAPI from "../../api/messageAPI";
import { useRoute } from "@react-navigation/native";
import GetMessage from "./GetMessage";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
const ChatOneOne = ({ navigation }) => {
  const route = useRoute();
  const roomid = route.params.room._id;
  const idLogin = route.params.idLogin;
  const socket = route.params.socket;
  const token = useSelector((state) => state.user.user.accessToken);
  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef();
  useEffect(() => {
    return () => (isScreenMounted.current = false);
  }, []);
  useEffect(() => {
    if (!isScreenMounted.current) return;
    const fetchMessage = async () => {
      try {
        const res = await messageAPI.GetMessage(
          {
            idRoom: roomid,
          },
          token
        );
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessage();
  }, [roomid]);
  // //
  const [arrivalMessage, setArrivalMessage] = useState(null);
  useEffect(() => {
    arrivalMessage &&
      route.params.room?.users.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, route.params.room]);
  //socket
  useEffect(() => {
    setTimeout(() => {
      route.params.socket.current.on("send-message", (data) => {
        setArrivalMessage({
          sender: data.sender,
          text: data.text,
          type: data.type,
          createdAt: Date.now(),
        });
      });
    }, 10);
  }, []);

  //send message
  const [messagess, setMessagess] = useState([]);
  const [text, setText] = useState("");

  const onSend = () => {
    if (!isScreenMounted.current) return;
    const newMessage = {
      sender: idLogin,
      text: text,
      RoomId: roomid,
      type: "text",
    };
    const fetchAddMessage = async () => {
      try {
        const res = await messageAPI.AddMessage(
          {
            message: newMessage,
          },
          token
        );
        setMessagess([...messagess, res.data]);
        setText("");
      } catch (error) {
        console.log(error);
      }
    };
    fetchAddMessage();
  };

  const yourRef = useRef(null);
  //////////////
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);
  const fileUploadHandler = async () => {
    let result = await ImagePicker
      .launchImageLibraryAsync
      //   {
      //   mediaTypes: ImagePicker.MediaTypeOptions.All,
      //   allowsEditing: true,
      //   quality: 1,
      // }
      ();
    const formData = new FormData();
    const fileSelected = {
      uri: result.uri,
      name: Math.floor(Math.random() * Math.floor(999999999)) + ".jpg",
      type: "image/jpeg",
    };
    formData.append("uploadFile", fileSelected);
    // fd.append("uploadFile", fileSelected);
    axios
      .post("http://192.168.1.152:5000/messages/addFile", formData)
      .then((res) => {
        const uploadFile = res.data.split(".");
        const filesTypes = uploadFile[uploadFile.length - 1];
        let newMessage;
        if (filesTypes === "mp4" || filesTypes === "mkv") {
          newMessage = {
            sender: idLogin,
            text: res.data,
            RoomId: roomid,
            type: "video",
          };
        } else if (
          filesTypes === "png" ||
          filesTypes === "jpg" ||
          filesTypes === "gif" ||
          filesTypes === "jpeg"
        ) {
          newMessage = {
            sender: idLogin,
            text: res.data,
            RoomId: roomid,
            type: "img",
          };
        } else {
          newMessage = {
            sender: idLogin,
            text: res.data,
            RoomId: roomid,
            type: "file",
            nameFile: fileSelected.name,
          };
        }
        const fetchAddMessage = async () => {
          try {
            const res = await messageAPI.AddMessage(
              {
                message: newMessage,
              },
              token
            );
            setMessagess([...messagess, res.data]);
          } catch (error) {
            console.log(error);
          }
        };
        fetchAddMessage();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  //camera
  const fileUploadCameraHandler = async () => {
    const result = await ImagePicker
      .launchCameraAsync
      //   {
      //   mediaTypes: ImagePicker.MediaTypeOptions.All,
      //   allowsEditing: true,
      //   quality: 1,
      // }
      ();
    const formData = new FormData();
    const fileSelected = {
      uri: result.uri,
      name: Math.floor(Math.random() * Math.floor(999999999)) + ".jpg",
      type: "image/jpeg",
    };
    formData.append("uploadFile", fileSelected);
    // fd.append("uploadFile", fileSelected);
    axios
      .post("http://192.168.1.152:5000/messages/addFile", formData)
      .then((res) => {
        const uploadFile = res.data.split(".");
        const filesTypes = uploadFile[uploadFile.length - 1];
        let newMessage;
        if (filesTypes === "mp4" || filesTypes === "mkv") {
          newMessage = {
            sender: idLogin,
            text: res.data,
            RoomId: roomid,
            type: "video",
          };
        } else if (
          filesTypes === "png" ||
          filesTypes === "jpg" ||
          filesTypes === "gif" ||
          filesTypes === "jpeg"
        ) {
          newMessage = {
            sender: idLogin,
            text: res.data,
            RoomId: roomid,
            type: "img",
          };
        } else {
          newMessage = {
            sender: idLogin,
            text: res.data,
            RoomId: roomid,
            type: "file",
            nameFile: fileSelected.name,
          };
        }
        const fetchAddMessage = async () => {
          try {
            const res = await messageAPI.AddMessage(
              {
                message: newMessage,
              },
              token
            );
            setMessagess([...messagess, res.data]);
          } catch (error) {
            console.log(error);
          }
        };
        fetchAddMessage();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  //video
  const fileUploadVideoHandler = async () => {
    const result = await ImagePicker.launchImageLibraryAsync(
      { mediaTypes: "Videos" }
      //   {
      //   mediaTypes: ImagePicker.MediaTypeOptions.All,
      //   allowsEditing: true,
      //   quality: 1,
      // }
    );
    const formData = new FormData();
    const fileSelected = {
      uri: result.uri,
      name: Math.floor(Math.random() * Math.floor(999999999)) + ".mp4",
      type: "video/mp4",
    };
    formData.append("uploadFile", fileSelected);
    // fd.append("uploadFile", fileSelected);
    axios
      .post("http://192.168.1.152:5000/messages/addFile", formData)
      .then((res) => {
        const uploadFile = res.data.split(".");
        const filesTypes = uploadFile[uploadFile.length - 1];
        let newMessage;
        if (filesTypes === "mp4" || filesTypes === "mkv") {
          newMessage = {
            sender: idLogin,
            text: res.data,
            RoomId: roomid,
            type: "video",
          };
        } else if (
          filesTypes === "png" ||
          filesTypes === "jpg" ||
          filesTypes === "gif" ||
          filesTypes === "jpeg"
        ) {
          newMessage = {
            sender: idLogin,
            text: res.data,
            RoomId: roomid,
            type: "img",
          };
        } else {
          newMessage = {
            sender: idLogin,
            text: res.data,
            RoomId: roomid,
            type: "file",
            nameFile: fileSelected.name,
          };
        }
        const fetchAddMessage = async () => {
          try {
            const res = await messageAPI.AddMessage(
              {
                message: newMessage,
              },
              token
            );
            setMessagess([...messagess, res.data]);
          } catch (error) {
            console.log(error);
          }
        };
        fetchAddMessage();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //
  useEffect(() => {
    setTimeout(() => {
      route.params.socket.current.on("delete-friend", (data) => {
        navigation.navigate("ChatTab");
      });
    }, 15);
  }, []);
  //
  const isScreenMounted = useRef(true);

  return (
    <KeyboardAvoidingView>
      <View style={styles.container0000}>
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
        >
          {messages.map((data, index) => {
            return <GetMessage data={data} key={index} idLogin={idLogin} />;
          })}
          {/* <FlatList
          // inverted
          ref={yourRef}
          onContentSizeChange={() => yourRef.current.scrollToEnd()}
          onLayout={() => yourRef.current.scrollToEnd()}
          data={messages}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <GetMessage data={item} idLogin={idLogin} />
          )}
        /> */}
        </ScrollView>
        {/* <AddMessage roomid={roomid} idLogin={idLogin} token={token} /> */}
        <View style={styles.container}>
          <View style={styles.maincontainer}>
            <FontAwesome5 name="laugh-beam" size={24} color="grey" />
            <TextInput
              placeholder="Nhập"
              value={text}
              onChangeText={(text) => setText(text)}
              style={styles.textinput}
              multiline
            />
            <Entypo
              onPress={fileUploadVideoHandler}
              name="attachment"
              size={24}
              color="grey"
              style={styles.icon}
            />
            <FontAwesome
              onPress={fileUploadHandler}
              name="image"
              size={24}
              color="grey"
              style={styles.icon}
            />
            <Fontisto
              name="camera"
              size={24}
              color="grey"
              style={styles.icon}
              onPress={fileUploadCameraHandler}
            />
          </View>
          <View style={styles.buttonsend}>
            <Pressable onPress={onSend}>
              <FontAwesome name="send" size={28} color="#fff" />
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatOneOne;

const styles = StyleSheet.create({
  container0000: {
    height: "100%",
    width: "100%",
  },
  container2: {
    height: "80%",
    width: "100%",
  },
  container: {
    flexDirection: "row",
    margin: 10,
    alignItems: "flex-end",
  },
  maincontainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 50,
    marginRight: 10,
    flex: 1,
    alignItems: "flex-end",
  },
  textinput: {
    flex: 1,
    marginHorizontal: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
  buttonsend: {
    backgroundColor: "#2089dc",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
