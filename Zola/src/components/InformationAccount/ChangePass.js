import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Button, Input } from "react-native-elements";
import userAPI from "../../api/userAPI";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
const ChangePass = ({ navigation }) => {
  const [enterPassHandler, setEnterPassHandler] = useState("");
  const [enterRePassHandler, setEnterRePassHandler] = useState("");
  const [enterNewPassHandler, setEnterNewPassHandler] = useState("");
  const [icon, seticon] = useState(false);
  const [icon2, seticon2] = useState(false);
  const [icon3, seticon3] = useState(false);
  const token = useSelector((state) => state.user.user.accessToken);
  const updatePasswordHandler = () => {
    // if (
    //   enterPassHandler === "" ||
    //   enterRePassHandler === "" ||
    //   enterNewPassHandler === ""
    // ) {
    //   setIsError("Không được rỗng");
    //   return;
    // }
    // const regex = /^[a-z0-9A-Z]{6,}$/;
    // if (regex.test(enterNewPassHandler)) {
    //   setIsError("");
    // } else {
    //   setIsError("Mật khẩu mới ít nhất 6 kí tự!!");
    //   return;
    // }
    if (
      enterPassHandler === "" ||
      enterRePassHandler === "" ||
      enterNewPassHandler === ""
    ) {
      Alert.alert("Hãy điền hết các thông tin");
    } else {
      if (enterNewPassHandler == enterRePassHandler) {
        if (enterNewPassHandler.length >= 6) {
          if (enterPassHandler===enterNewPassHandler) {
            Alert.alert("Mật khẩu mới không được trùng với mật khẩu cũ");
          } else {
            const fetchUpdatePassword = async () => {
              try {
                const verify = await userAPI.ChangePassword(
                  {
                    password: enterPassHandler,
                    reEnterPassword: enterPassHandler,
                    newPassword: enterNewPassHandler,
                  },
                  token
                );
  
                if (verify.status === 200) {
                  console.log("Success");
                  navigation.navigate("Me");
                }
              } catch (error) {
                console.log(error);
              }
            };
            fetchUpdatePassword();
          }
        } else {
          Alert.alert("Nhập lại mật khẩu mới phải lớn hơn 6 kí tự");
        }
      } else {
        Alert.alert("Nhập lại mật khẩu mới chưa chính xác");
      }
    }
  };
  return (
    <KeyboardAvoidingView>
      <View style={styles.m}>
        <View style={styles.t}>
          <Image
            style={styles.image}
            source={require("../../images/logo.png")}
          />
        </View>
        <View style={styles.c}>
          <View style={styles.con2}>
            <View style={styles.containerr}>
              <View style={styles.maincontainer}>
                <TextInput
                  secureTextEntry={true}
                  placeholder="Nhập mật khẩu cũ "
                  value={enterPassHandler}
                  onChangeText={(text) => {
                    setEnterPassHandler(text);
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
                      setEnterPassHandler(null);
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
                  secureTextEntry={true}
                  placeholder="Nhập mật khẩu mới "
                  value={enterRePassHandler}
                  onChangeText={(text) => {
                    setEnterRePassHandler(text);
                    seticon3(text == null ? false : true);
                  }}
                  style={styles.textinputt}
                />
                {icon3 && (
                  <AntDesign
                    style={styles.iconn}
                    name="closecircle"
                    size={24}
                    color="#2089dc"
                    onPress={() => {
                      seticon3(false);
                      setEnterRePassHandler(null);
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
                  secureTextEntry={true}
                  placeholder="Nhập lại mật khẩu mới "
                  value={enterNewPassHandler}
                  onChangeText={(text) => {
                    setEnterNewPassHandler(text);
                    seticon2(text == null ? false : true);
                  }}
                  style={styles.textinputt}
                />
                {icon2 && (
                  <AntDesign
                    style={styles.iconn}
                    name="closecircle"
                    size={24}
                    color="#2089dc"
                    onPress={() => {
                      seticon2(false);
                      setEnterNewPassHandler(null);
                    }}
                  />
                )}
              </View>
            </View>
          </View>
          <Button
            containerStyle={{ marginTop: 10, width: "60%" }}
            onPress={updatePasswordHandler}
            title="Xác nhận"
          />
        </View>
        
      </View>
    </KeyboardAvoidingView>
  );
};
export default ChangePass;

const styles = StyleSheet.create({
  m: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
  },
  c: {
    height: "50%",
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
  },
  e: {
    height: "20%",
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
  },
  t: {
    height: "30%",
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    width: 150,
    height: 150,
  },
  con2: {
    flexDirection: "row",
    backgroundColor: "#fff",
    height: "15%",
    alignItems: "center",
  },
  containerr: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  maincontainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 50,
    marginRight: "15%",
    marginLeft: "15%",
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
