import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Image,
  Pressable,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import * as Contacts from "expo-contacts";
import { useSelector } from "react-redux";
import call from "react-native-phone-call";
const PhoneBookTab = ({ navigation }) => {
  const [phone, setphone] = useState([]);
  const userAfterLoginRedux = useSelector((state) => state.user.user.user);
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync();
        setphone(data);
      }
    })();
  }, []);
 
  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.con}>
        <View style={styles.b2}>
          <Text style={styles.text}>Danh bạ người dùng</Text>
        </View>
        <View style={styles.b3}>
          <ScrollView>
            {phone.map((data) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    call({
                      number: data.phoneNumbers[0].number,
                      prompt: true,
                    }).catch(console.error);
                  }}
                  key={data.id}
                >
                  <View style={styles.containerrr}>
                    <View style={styles.leftContainer}>
                      <Image
                        source={{uri:userAfterLoginRedux.avatar}}
                        style={styles.avatarrr}
                      />
                      <View style={styles.cenContainer}>
                        <Text numberOfLines={1} style={styles.usernameee}>
                          {data.name}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
export default PhoneBookTab;
const styles = StyleSheet.create({
  con: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  con2: {
    flexDirection: "row",
    backgroundColor: "#fff",
    height: "14%",
    alignItems: "center",
  },
  b1: {
    backgroundColor: "#fff",
    marginLeft: 10,
    width: "35%",
    backgroundColor: "#fff",
    height: "6%",
  },
  b2: {
    backgroundColor: "#fff",
    marginTop: "2%",
    height: "5%",
    width: "100%",
  },
  b3: {
    height: "75%",
    flex: 1,
    padding: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderColor:"grey",
    borderWidth:1
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  time: {
    fontSize: 16,
  },
  textinput: {
    borderWidth: 1,
    borderColor: "black",
    flex: 1,
    marginBottom: 15,
    marginTop: 15,
    marginLeft: "10%",
    marginRight: "10%",
    borderRadius: 10,
    borderColor: "#a6a6a6",
  },
  icon: {
    position: "absolute",
    marginLeft: "83%",
    marginTop: 15,
  },

  text: {
    fontWeight: "bold",
    color: "#2089dc",
    fontSize: 16,
    marginLeft: 20,
  },
  button: {
    width: 150,
  },
  leftContainerr: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    justifyContent: "center",
    padding: 30,
  },
  usernamee: {
    fontWeight: "bold",
    fontSize: 16,
    width: 200,
  },
  cenContainerr: {
    paddingRight: 25,
    marginLeft: 10,
    flex: 1,
  },
  avatarr: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  container: {
    flexDirection: "row",
    margin: 10,
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
  buttonsend: {
    backgroundColor: "#2089dc",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: "15%",
  },
  containerrr: {
    flexDirection: "column",
    width: "100%",
    backgroundColor: "#fff",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    justifyContent: "center",
    paddingLeft: 15,
    paddingRight: 15,
  },
  avatarrr: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  cenContainer: {
    flexDirection: "column",
    padding: 15,
    flex: 1,
  },
  usernameee: {
    fontWeight: "bold",
    fontSize: 16,
  },
  aa: {
    marginLeft: 50,
  },
});
