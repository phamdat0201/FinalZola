import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Image,
  Linking,
  Pressable,
} from "react-native";
import addFriendAPI from "../../api/addFriendAPI";
import moment from "moment";
import { FileIcon, defaultStyles } from "react-file-icon";
import { useNavigation } from "@react-navigation/native";
import { Video, AVPlaybackStatus } from "expo-av";
const GetMessage = (props) => {
  const navigation = useNavigation();
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const idLogin = props.idLogin;
  const setmess = () => {
    return idLogin === props.data.sender;
  };
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchGetUser = async () => {
      try {
        const requestGetUser = await addFriendAPI.getUser({
          userID: props.data.sender,
        });
        setUser(requestGetUser.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetUser();
  }, []);
  const uploadFile = props.data.text.split(".");
  const filesTypes = "." + uploadFile[uploadFile.length - 1];
  return (
    <View style={styles.main}>
      <ScrollView style={styles.container}>
        <View
          style={[
            styles.mess,
            {
              backgroundColor: setmess() ? "#DCF8C5" : "#c2d6d6",
              marginLeft: setmess() ? "auto" : 0,
              marginRight: setmess() ? 0 : "auto",
            },
          ]}
        >
          {!setmess() && (
            <View style={styles.nameima}>
              <Image style={styles.image} source={{ uri: user?.avatar }} />
              <Text style={styles.name}>{user?.name}</Text>
            </View>
          )}
          {props.data.type === "img" ? (
            <Pressable
              onPress={() =>
                navigation.navigate("SeeImage", { uri: props.data.text })
              }
            >
              <Image
                style={styles.image2}
                source={{ uri: props.data.text }}
                alt=""
              />
            </Pressable>
          ) : props.data.type === "text" ? (
            <Text>{props.data.text}</Text>
          ) : props.data.type === "video" ? (
            <Video
              ref={video}
              style={{ width: 200, height: 200 }}
              source={{
                uri: props.data.text,
              }}
              useNativeControls
              resizeMode="contain"
              isLooping
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            />
          ) : props.data.type === "file" ? (
            <View
              style={{
                flexDirection: "column",
                maxWidth: "100%",
                height: "auto",
              }}
            >
              {/* <Pressable onPress={() => Linking.openURL(props.data.text)}>
                <FileIcon
                  type="document"
                  size="2"
                  extension="docx"
                  {...defaultStyles.docx}
                ></FileIcon>
              </Pressable> */}
              <Text onPress={() => Linking.openURL(props.data.text)}>
                {props.data.nameFile}
              </Text>
            </View>
          ) : null}
          {/* <Text>{props.data.text}</Text> */}
          <Text style={styles.time}>
            {moment(props.data.createdAt).fromNow()}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};
export default GetMessage;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  container: {
    padding: 10,
    width: "100%",
    height: "80%",
    bottom: 0,
  },
  mess: {
    backgroundColor: "#e5e5e5",
    maxWidth: "70%",
    minWidth: "45%",
    borderRadius: 15,
    padding: 10,
  },
  time: {
    alignSelf: "flex-end",
    color: "grey",
  },
  nameima: {
    flexDirection: "row",
    marginBottom: 15,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#fff",
    borderWidth: 1,
    borderColor: "grey",
  },
  image2: {
    width: 200,
    height: 150,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    color: "black",
  },
});
