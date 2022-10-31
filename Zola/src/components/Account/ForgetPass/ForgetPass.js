import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Button } from "react-native-elements";
import signupAPI from "../../../api/signupAPI";
const ForgetPass = ({ navigation }) => {
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState("");
  const checkphonehandler = () => {
    const fetchCheckPhone = async () => {
      try {
        const checkPhone = await signupAPI.checkPhoneAlready({
          phone: enteredPhoneNumber,
        });
        if (checkPhone.status === 201) {
          const fetchSendOTP = async () => {
            const sendOTP = await signupAPI.sendOTP({
              phone: enteredPhoneNumber,
            });
            if (sendOTP.status === 201) {
              navigation.navigate("VerificationForget", {
                std: enteredPhoneNumber,
              });
            }
          };
          fetchSendOTP();
        }
      } catch (error) {
        setIsError(error);
      }
    };

    fetchCheckPhone();
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
          <Text style={{ color: "#2089dc", fontWeight: "bold" }}>
            Nhập số điện thoại:
          </Text>
          <TextInput
            style={styles.textinput}
            type="text"
            placeholder=""
            name="maxn"
            onChangeText={(text) => setEnteredPhoneNumber(text)}
          />
        </View>
        <Button
          containerStyle={styles.button}
          title="Xác nhận"
          onPress={checkphonehandler}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
export default ForgetPass;

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
    alignItems: "flex-end",
  },
});
