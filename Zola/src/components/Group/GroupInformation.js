import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { Button } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSelector } from "react-redux";
import userAPI from "../../api/userAPI";
import moment from "moment";
import { useRoute } from "@react-navigation/core";
import Member from "./Member";
import groupAPI from "../../api/groupAPI";
import * as ImagePicker from "expo-image-picker";
const GroupInformation = ({ navigation }) => {
  const route = useRoute();
  const room = route.params.room;
  const socket = route.params.socket;
  const [namegroup, setnamegroup] = useState(true);
  const [channamegroup, setchannamegroup] = useState(false);
  const loggedInUser = useSelector((state) => state.user.user.user._id);
  const token = useSelector((state) => state.user.user.accessToken);
  const sset = () => {
    setnamegroup(false);
    setchannamegroup(true);
  };
  const [name, setname] = useState(route.params.room.name);

  const outGroup = () => {
    const fetchExitGroup = async () => {
      try {
        const exitGroup = await groupAPI.exitGroup(
          {
            id: route.params.room._id,
          },
          token
        );
        if (exitGroup.status === 200) {
          //kiểm tra còn dưới 3 người là xóa group
          if (route.params.room.users.length - 1 < 3) {
            const fetchDeleteGroup = async () => {
              try {
                const deleteGroup = await groupAPI.deleteGroup(
                  {
                    id: route.params.room._id,
                  },
                  token
                );
                if (deleteGroup.status === 200) {
                  navigation.navigate("GroupTab");
                }
              } catch (error) {
                console.log(error);
              }
            };
            fetchDeleteGroup();
          }
        }
        navigation.navigate("GroupTab");
      } catch (error) {
        console.log(error);
      }
    };
    fetchExitGroup();
  };

  //xoa nhom
  const deletegrouphandler = () => {
    const fetchDeleteGroup = async () => {
      try {
        const deleteGroup = await groupAPI.deleteGroup(
          {
            id: route.params.room._id,
          },
          token
        );
        if (deleteGroup.status === 200) {
          navigation.navigate("GroupTab");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDeleteGroup();
  };
  //
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
  const [image, setImage] = useState(route.params.room.avatar);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
    const fetchUpdateGroup = async () => {
      try {
        const updateGroup = await groupAPI.updateRoom(
          {
            roomID: route.params.room._id,
            data: {
              name: name,
              avatar: result.uri,
            },
          },
          token
        );
        if (updateGroup.status === 200) {
          setnamegroup(true);
          setchannamegroup(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUpdateGroup();
  };
  //updte info group
  const updategrouphandler = () => {
    if (name.Alert) {
      Alert.alert("Chưa chọn ảnh");
    } else {
      const fetchUpdateGroup = async () => {
        try {
          const updateGroup = await groupAPI.updateRoom(
            {
              roomID: route.params.room._id,
              data: {
                name: name,
                avatar: image,
              },
            },
            token
          );
          if (updateGroup.status === 200) {
            setnamegroup(true);
            setchannamegroup(false);
            navigation.navigate("GroupTab");
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchUpdateGroup();
    }
  };
  const [listmember, setlistmember] = useState(route.params.room);
  useEffect(() => {
    socket.current.on("swapRoomMaster-by-me", (data) => {
      setlistmember(data);
    });
  }, []);

  useEffect(() => {
    socket.current.on("swapRoomMaster", (data) => {
      setlistmember(data);
    });
  }, []);

  return (
    <View style={{ with: "100%", height: "100%" }}>
      <View style={styles.contan}>
        <View>
          <Pressable>
            <Image style={styles.image2} source={{ uri: image }} />
          </Pressable>
          <View style={styles.cl}>
            <Pressable onPress={pickImage}>
              <MaterialIcons name="photo-camera" size={20} color="black" />
            </Pressable>
          </View>
        </View>
        <View style={styles.container3}>
          {namegroup && (
            <Text style={styles.text} onPress={sset}>
              {name}
            </Text>
          )}
          {channamegroup && (
            <TextInput
              style={styles.textinput2}
              onChangeText={(text) => setname(text)}
            >
              {route.params.room.name}
            </TextInput>
          )}
          <Pressable style={styles.icon} onPress={updategrouphandler}>
            <FontAwesome5 name="pen" size={14} color="black" />
          </Pressable>
        </View>
        {/* <Button
          containerStyle={{ width: 150, marginTop: 10 }}
          title="Đổi thông tin"
          onPress={updategrouphandler}
        /> */}
      </View>
      <View style={styles.contan15}>
        <Text style={styles.texxt}>Danh sách thành viên:</Text>
      </View>
      <View style={styles.contan1}>
        <ScrollView>
          {route.params.room.users.map((data, index) => {
            return (
              <Member
                key={index}
                data={data}
                room={listmember}
                inlogin={loggedInUser}
              />
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.contan2}>
        <Button
          containerStyle={styles.buttonss}
          title="Thoát nhóm"
          onPress={outGroup}
        />
        {loggedInUser == listmember.roomMaster ? (
          <Button
            containerStyle={styles.buttonss}
            title="Xóa nhóm"
            type="outline"
            onPress={deletegrouphandler}
          />
        ) : null}
      </View>
    </View>
  );
};

export default GroupInformation;

const styles = StyleSheet.create({
  contan: {
    height: "30%",
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
  },
  contan1: {
    width: "100%",
    height: "45%",
    backgroundColor: "#fff",
    borderBottomColor: "grey",
    borderTopColor: "grey",
    borderWidth: 1,
  },
  contan15: {
    width: "100%",
    height: "5%",
    backgroundColor: "#fff",
  },
  contan2: {
    height: "20%",
    width: "100%",
    alignItems: "center",
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  buttonss: {
    width: 250,
    padding: 10,
  },
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
  },
  container2: {
    width: "95%",
    marginTop: 10,
    height: "20%",
    borderRadius: 15,
  },
  button: {
    padding: 15,
  },
  image2: {
    width: 100,
    height: 100,
    marginTop: 5,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#fff",
  },
  container3: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
    width: "26%",
    textAlign: "center",
    alignItems: "center",
  },
  textinput2: {
    borderWidth: 1,
    borderColor: "black",
    width: "26%",
  },
  cl: {
    position: "absolute",
    marginTop: 75,
    marginLeft: 75,
    width: 25,
    height: 25,
    color: "black",
    width: 25,
    height: 25,
    backgroundColor: "#d9d9d9",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  icon: {
    position: "absolute",
    marginLeft: 130,
    marginTop: 5,
  },
  texxt: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "bold",
    color: "#2089dc",
  },
});
