import React, { useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Text,
  Alert,
} from "react-native";
import { Button } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import RadioGroup from "react-native-radio-buttons-group";
import signupAPI from "../../../api/signupAPI";
import { useRoute } from "@react-navigation/native";

const PerInforRegis = ({ navigation }) => {
  const route = useRoute();
  const phone = route.params.phone;
  const [enteredName, setEnteredName] = useState("");
  const [enteredPass, setEnteredPass] = useState("");
  const [enteredRePass, setReEnteredPass] = useState("");
  const confirmHandler = () => {
    if (enteredPass.length<6) {
      Alert.alert("Mật khẩu phải trên 6 kí tự!");
    } else {
      if (enteredPass === enteredRePass) {
        const fetchVerify = async () => {
          try {
            const verify = await signupAPI.signUp({
              name: enteredName,
              phone: phone,
              password: enteredPass,
            });
            if (verify.status === 201) {
              Alert.alert("Đăng kí thành công :3!");
              navigation.navigate("Login");
            }
          } catch (error) {
            console.log(error);
          }
        };
        fetchVerify();
      } else {
        Alert.alert("Mật khẩu nhập lại không khớp");
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../../images/logo.png")}
      />
      <View style={styles.container2}>
        <Text style={{ color: "#2089dc", fontWeight: "bold" }}>Nhập tên:</Text>
        <TextInput
          style={styles.textinput}
          type="text"
          placeholder=""
          onChangeText={(text) => setEnteredName(text)}
        />
      </View>
      <View style={styles.container2}>
        <Text style={{ color: "#2089dc", fontWeight: "bold" }}>
          Nhập mật khẩu:
        </Text>
        <TextInput
          style={styles.textinput}
          type="text"
          placeholder=""
          onChangeText={(text) => setEnteredPass(text)}
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
          onChangeText={(text) => setReEnteredPass(text)}
          secureTextEntry={true}
        />
      </View>
      <Button
        containerStyle={styles.button}
        title="Xác nhận"
        onPress={confirmHandler}
      />
    </KeyboardAvoidingView>
  );
};
export default PerInforRegis;

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
