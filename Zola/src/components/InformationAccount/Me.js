import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  Alert,
} from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import { Button } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSelector } from "react-redux";
import userAPI from "../../api/userAPI";
import moment from "moment";
import * as ImagePicker from "expo-image-picker";
import { useRoute } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Me = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const userAfterLoginRedux = useSelector((state) => state.user.user.user);
  const [user, setUser] = useState(userAfterLoginRedux);
  const [updatee, setUpdatee] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem("user").then((res) => {
      setUser(JSON.parse(res));
    });
  }, [updatee]);

  const token = useSelector((state) => state.user.user.accessToken);
  const [text, setText] = useState(
    moment(userAfterLoginRedux.birthday).format("YYYY/MM/DD")
  );
  const [value, setValue] = useState(
    userAfterLoginRedux.gender == true ? "true" : "false"
  );
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let getM = parseInt(tempDate.getMonth()) + 1;
    let fDate = tempDate.getFullYear() + "/" + getM + "/" + tempDate.getDate();
    setText(fDate);
    setviewbirth1(false);
    setviewbirth2(true);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };
  const [s1, set1] = useState(true);

  const [s2, set2] = useState(false);
  const [s3, set3] = useState("");
  const sset = () => {
    set1(false);
    set2(true);
  };
  const [name, setname] = useState(userAfterLoginRedux.name);
  const [ava, setava] = useState(userAfterLoginRedux.avatar);
  const [viewava1, setviewava1] = useState(true);
  const [viewava2, setviewava2] = useState(false);
  const [viewbirth1, setviewbirth1] = useState(true);
  const [viewbirth2, setviewbirth2] = useState(false);
  //chon anh
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
  const [image, setImage] = useState(userAfterLoginRedux.avatar);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setava(result.uri);
    if (!result.cancelled) {
      setImage(result.uri);
    }
    const fetchReplaceUser = async () => {
      try {
        const verify = await userAPI.replaceUser(
          {
            userID: userAfterLoginRedux._id,
            newUser: {
              ...userAfterLoginRedux,
              name: name,
              birthday: text,
              gender: value,
              avatar: result.uri,
            },
          },
          token
        );
        setviewava1(false);
        setviewava2(true);
        if (verify.status === 201) {
          Alert.alert("Đổi thành công ảnh đại diện");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchReplaceUser();
  };

  //
  const fetchUser = () => {
    const fetchReplaceUser = async () => {
      try {
        const verify = await userAPI.replaceUser(
          {
            userID: userAfterLoginRedux._id,
            newUser: {
              ...userAfterLoginRedux,
              name: name,
              birthday: text,
              gender: value,
              avatar: image,
            },
          },
          token
        );
        set1(true);
        set2(false);
        setUpdatee(true);
        setviewbirth1(false);
        setviewbirth2(true);
        if (verify.status === 201) {
          Alert.alert("Thay đổi thông tin thành công");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchReplaceUser();
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.container2}>
          {viewava1 && (
            <Image
              style={styles.image}
              source={{
                uri:
                  user.avatar == null
                    ? userAfterLoginRedux.avatar
                    : user.avatar,
              }}
            />
          )}
          {viewava2 && <Image style={styles.image} source={{ uri: ava }} />}
        </View>
        <View>
          {viewava1 && (
            <Image
              style={styles.image2}
              source={{
                uri:
                  user.avatar == null
                    ? userAfterLoginRedux.avatar
                    : user.avatar,
              }}
            />
          )}
          {viewava2 && <Image style={styles.image2} source={{ uri: ava }} />}
          <View style={styles.cl}>
            <Pressable onPress={pickImage}>
              <MaterialIcons name="photo-camera" size={20} color="black" />
            </Pressable>
          </View>
        </View>
        <View style={styles.container3}>
          {s1 && (
            <Text style={styles.text}>
              {user.name == null ? userAfterLoginRedux.name : user.name}
            </Text>
          )}
          {s2 && (
            <TextInput
              style={styles.textinput2}
              onChangeText={(text) => setname(text)}
            >
              {user.name == null ? userAfterLoginRedux.name : user.name}
            </TextInput>
          )}
          <Pressable style={styles.icon} onPress={sset}>
            <FontAwesome5 name="pen" size={14} color="black" />
          </Pressable>
        </View>
        <View style={styles.container4}>
          <View style={styles.con2}>
            <View style={styles.containerr}>
              <View style={styles.maincontainerrr}>
                <TextInput
                  editable={false}
                  value={userAfterLoginRedux.phone}
                  style={styles.textinputt}
                />
              </View>
            </View>
          </View>
          <View style={styles.con2}>
            <View style={styles.containerr}>
              <View style={styles.maincontainerr}>
                {viewbirth1 && (
                  <TextInput
                    editable={false}
                    style={styles.textinputt}
                    value={user.birthday == null ? text : user.birthday}
                  />
                )}
                {viewbirth2 && (
                  <TextInput
                    editable={false}
                    style={styles.textinputt}
                    value={text}
                  />
                )}
              </View>

              <View style={styles.buttonsend}>
                <Pressable onPress={showDatepicker}>
                  {/* <FontAwesome name="search" size={24} color="white" /> */}
                  <Text style={{ fontWeight: "bold", color: "#fff" }}>Chọn</Text>
                </Pressable>
              </View>
            </View>
          </View>
          {show && (
            <DateTimePicker
              testID="showDatepicker"
              value={date}
              mode={mode}
              display="default"
              onChange={onChange}
            />
          )}
          <RadioButton.Group
            onValueChange={(newValue) => setValue(newValue)}
            value={user.gender == null ? value : user.gender}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ marginLeft: 15, fontSize: 16 }}>Nam</Text>
              <RadioButton value="true" />
              <Text style={{ marginLeft: 15, fontSize: 16 }}>Nữ</Text>
              <RadioButton value="false" />
            </View>
          </RadioButton.Group>
          <Button
            containerStyle={styles.button}
            onPress={fetchUser}
            title="Chỉnh sửa"
          />
          <Button
            containerStyle={styles.button}
            title="Đổi mật khẩu"
            type="outline"
            onPress={() => navigation.navigate("ChangeP")}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Me;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
  },
  container2: {
    width: "95%",
    marginTop: 5,
    height: "17%",
    borderRadius: 15,
  },
  button: {
    padding: 15,
  },
  image: {
    width: null,
    height: 150,
    borderRadius: 15,
  },
  image2: {
    width: 100,
    height: 100,
    marginTop: -40,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#fff",
  },
  container3: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  container43: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
    width: "26%",
    textAlign: "center",
  },
  textinput2: {
    borderWidth: 1,
    borderColor: "black",
    width: "26%",
  },
  text2: {
    fontSize: 16,
  },
  cl: {
    position: "absolute",
    marginTop: 35,
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
  container4: {
    marginTop: 25,
    width: "90%",
    height: "85%",
  },
  textinput: {
    borderWidth: 1,
    borderColor: "black",
    width: "100%",
    marginBottom: 15,
    marginTop: 5,
  },
  textinput1: {
    borderWidth: 1,
    borderColor: "black",
    width: "70%",
    marginBottom: 15,
    marginTop: 5,
  },

  button1: {
    width: "20%",
    marginLeft: 32,
  },
  radio: {
    fontSize: 16,
  },
  containerr: {
    flexDirection: "row",
    marginLeft: 10,
    marginRight:10,
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
  maincontainerr: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 50,
    marginRight: "5%",
    flex: 1,
    alignItems: "center",
    borderColor: "#2089dc",
    borderWidth: 1,
    width: "65%",
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
    height: "9%",
    alignItems: "center",
    marginBottom:"3%",
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
