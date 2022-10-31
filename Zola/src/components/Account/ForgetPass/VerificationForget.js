import React, { useState } from "react";
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
import { useRoute } from "@react-navigation/core";
import signupAPI from "../../../api/signupAPI";
const VerificationForget = ({ navigation }) => {
  const route = useRoute();
  const [enteredCode, setEnteredCode] = useState("");
  const [enteredNewPass, setEnteredNewPass] = useState("");
  const [enteredReNewPass, setEnteredReNewPass] = useState("");
  const newpasshandler = () => {
    const forgotPassWord = async () => {
      try {
        const newPassWord = await signupAPI.forgotPassword({
          phone: route.params.std,
          code: enteredCode,
          Password: enteredNewPass,
          reEnterPassword: enteredReNewPass,
        });
        if (newPassWord.status === 200) {
          navigation.navigate("Login");
        }
      } catch (error) {
        console.log(error);
      }
    };
    forgotPassWord();
  };
  //
  const sendreotp = () => {
    const fetchSendOTP = async () => {
      const sendOTP = await signupAPI.sendOTP({
        phone: route.params.std,
      });
      if (sendOTP.status === 201) {
        Alert.alert("Đã gửi lại mã!!!");
      }
    };
    fetchSendOTP();
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.containerimage}>
        <Image
          style={styles.image}
          source={require("../../../images/logo.png")}
        />
      </View>
      <View style={styles.vglm}>
        <Text style={styles.sdt}>{route.params.std}</Text>
        <TextInput
          style={styles.textinput1}
          type="text"
          placeholder=""
          name="maxn"
          onChangeText={(text) => setEnteredCode(text)}
        />
        <Text onPress={sendreotp} style={styles.glm}>
          Gửi lại mã xác nhận
        </Text>
      </View>

      <View style={styles.container2}>
        <Text style={{ color: "#2089dc", fontWeight: "bold" }}>
          Nhập mật khẩu:
        </Text>
        <TextInput
          style={styles.textinput}
          type="text"
          placeholder=""
          name="maxn"
          onChangeText={(text) => setEnteredNewPass(text)}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.container2}>
        <Text style={{ color: "#2089dc", fontWeight: "bold" }}>
          Nhập lại mật khẩu:
        </Text>
        <TextInput
          style={styles.textinput}
          type="text"
          placeholder=""
          name="maxn"
          onChangeText={(text) => setEnteredReNewPass(text)}
          secureTextEntry={true}
        />
      </View>
      <Button
        containerStyle={styles.button}
        title="Xác nhận"
        onPress={newpasshandler}
      />
    </KeyboardAvoidingView>
  );
};
export default VerificationForget;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
  },
  containerimage: {
    height: "30%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  sdt: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  vglm: {
    height: "20%",
    width: "100%",
    alignItems: "center",
    backgroundColor: "#2089dc",
    justifyContent: "center",
    flexDirection: "column",
    marginBottom: 10,
    width: "80%",
    borderRadius: 15,
  },
  glm: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
    textDecorationLine: "underline",
  },
  container2: {
    width: "70%",
  },
  button: {
    padding: 5,
    width: 180,
  },
  image: {
    width: 150,
    height: 150,
  },
  textinput: {
    borderWidth: 1,
    borderColor: "#2089dc",
    borderRadius: 50,
    width: "100%",
    marginBottom: 15,
    marginTop: 5,
  },
  textinput1: {
    borderWidth: 1,
    borderColor: "#2089dc",
    borderRadius: 50,
    width: "70%",
    marginBottom: 15,
    marginTop: 5,
    backgroundColor: "#fff",
  },
});
