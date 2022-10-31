import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Pressable } from "react-native";
import {
  FontAwesome5,
  Entypo,
  Fontisto,
  FontAwesome,
} from "@expo/vector-icons";
import messageAPI from "../../api/messageAPI";
const AddMessage = (props) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const token = props.token;
  const [textplh, setTextplh] = useState("Nhập");
  const onSend = () => {
    const newMessage = {
      sender: props.idLogin,
      text: text,
      RoomId: props.roomid,
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
        setMessages([...messages, res.data]);
        setText("")
      } catch (error) {
        console.log(error);
      }
    };
    fetchAddMessage();
  };

  return (
    <View style={styles.container}>
      <View style={styles.maincontainer}>
        <FontAwesome5 name="laugh-beam" size={24} color="grey" />
        <TextInput placeholder={textplh} value={text} onChangeText={(text) => setText(text)} style={styles.textinput} multiline />
        <Entypo name="attachment" size={24} color="grey" style={styles.icon} />
        <Fontisto name="camera" size={24} color="grey" style={styles.icon} />
      </View>
      <View style={styles.buttonsend}>
        <Pressable onPress={onSend}>
          <FontAwesome name="send" size={28} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
};
export default AddMessage;
const styles = StyleSheet.create({
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
