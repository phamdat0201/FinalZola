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
import { useRoute } from "@react-navigation/native";
import signupAPI from "../../../api/signupAPI";

const VerificationScreen = ({ navigation }) => {
  const [enteredCode, setEnteredCode] = useState("");
  const route = useRoute();
  const phone = route.params.phone;
  const verhandler = () => {
    const fetchVerify = async () => {
      try {
        const verify = await signupAPI.verifyOTPSignUp({
          phone: phone,
          code: enteredCode,
        });
        console.log(verify);
        if (verify.status === 200) {
          navigation.navigate("PerInforRegis", { phone: phone });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchVerify();
  };
  const sendreotp = () => {
    const fetchSendOTP = async () => {
      const sendOTP = await signupAPI.sendOTP({
        phone: phone,
      });
      if (sendOTP.status === 201) {
        Alert.alert("Đã gửi lại mã!");
      }
    };
    fetchSendOTP();
  };
  const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;
  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../../images/logo.png")}
        />
        <View style={styles.container2}>
          <Text
            style={{
              color: "#2089dc",
              fontWeight: "bold",
              fontSize: 24,
              textAlign: "center",
            }}
          >
            {route.params.phone}
          </Text>
          <TextInput
            style={styles.textinput}
            type="text"
            placeholder="Nhập mã xác nhận"
            onChangeText={(text) => setEnteredCode(text)}
          />
        </View>
        <Button
          containerStyle={styles.button}
          title="Xác nhận"
          onPress={verhandler}
        />
        <Button
          containerStyle={styles.button}
          title="Gửi lại mã"
          type="outline"
          onPress={sendreotp}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
export default VerificationScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
  },
  container2: {
    marginTop: 25,
    width: "70%",
  },
  button: {
    padding: 5,
    width: 300,
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 80,
  },
  textinput: {
    borderWidth: 1,
    borderColor: "#2089dc",
    borderRadius: 50,
    width: "100%",
    marginBottom: 15,
    marginTop: 5,
  },
});
