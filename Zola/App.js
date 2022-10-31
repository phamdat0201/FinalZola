import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import Store from "./src/api/store";
import {
  FontAwesome5,
  MaterialIcons,
  Ionicons,
  Entypo,
} from "@expo/vector-icons";

import RegisterScreen from "./src/components/Account/Register/RegisterScreen";
import VerificationScreen from "./src/components/Account/Register/VerificationScreen";
import PerInforRegis from "./src/components/Account/Register/PerInforRegis";
import Tabs from "./src/screens/Tabs";
import Me from "./src/components/InformationAccount/Me";
import ChangePass from "./src/components/InformationAccount/ChangePass";
import ChatOneOne from "./src/components/Room/ChatOneOne";
import ForgetPass from "./src/components/Account/ForgetPass/ForgetPass";
import VerificationForget from "./src/components/Account/ForgetPass/VerificationForget";
import ListRequestFriend from "./src/components/Friend/ListRequestFriend";
import CreateGroup from "./src/components/Group/CreateGroup";
import LoginScreen from "./src/components/Account/Login/LoginScreen";
import { Pressable, View, Text, Image } from "react-native";
import AddFriendIntoGroup from "./src/components/Group/AddFriendIntoGroup";
import SeeImage from "./src/components/Room/SeeImage";
import ListSendedRequestFriend from "./src/components/Friend/ListSendedRequestFriend";
import GroupInformation from "./src/components/Group/GroupInformation";
import Call from "./src/components/Room/Call";
import FriendInformation from "./src/components/Friend/FriendInformation";

const Stack = createStackNavigator();

export default function App({ navigation }) {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{}}>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              headerTitleAlign: "center",
              title: "ĐĂNG KÍ SỐ ĐIỆN THOẠI",
              headerTintColor: "#fff",
              headerStyle: { backgroundColor: "#2089dc" },
            }}
          />
          <Stack.Screen
            name="Verification"
            component={VerificationScreen}
            options={{
              headerTitleAlign: "center",
              title: "XÁC NHẬN SỐ ĐIỆN THOẠI",
              headerTintColor: "#fff",
              headerStyle: { backgroundColor: "#2089dc" },
            }}
          />
          <Stack.Screen
            name="PerInforRegis"
            component={PerInforRegis}
            options={{
              headerTitleAlign: "center",
              title: "THÔNG TIN NGƯỜI DÙNG",
              headerTintColor: "#fff",
              headerStyle: { backgroundColor: "#2089dc" },
            }}
          />
          <Stack.Screen
            name="Tabs"
            component={Tabs}
            options={{ headerShown: false, headerStyle: { height: 100 } }}
          />
          <Stack.Screen
            name="Call"
            component={Call}
            options={{
              title: "",
              headerStyle: { height: 100, backgroundColor: "#fff" },
            }}
          />
          <Stack.Screen
            name="Me"
            component={Me}
            options={{
              title: "THÔNG TIN CÁ NHÂN",
              headerTitleStyle: { color: "#2089dc" },
            }}
          />
          <Stack.Screen
            name="GroupInfo"
            component={GroupInformation}
            options={{
              headerTitleAlign: "center",
              title: "THÔNG TIN NHÓM",
              headerTintColor: "#fff",
              headerStyle: { backgroundColor: "#2089dc" },
            }}
          />
          <Stack.Screen
            name="FriendInfo"
            component={FriendInformation}
            options={{
              headerTitleAlign: "center",
              title: "",
              headerTintColor: "#fff",
              headerStyle: { backgroundColor: "#2089dc" },
            }}
          />
          <Stack.Screen
            name="ChangeP"
            component={ChangePass}
            options={{
              headerTitleAlign: "center",
              title: "ĐỔI MẬT KHẨU",
              headerTintColor: "#fff",
              headerStyle: { backgroundColor: "#2089dc" },
            }}
          />
          <Stack.Screen
            name="ChatOneOne"
            component={ChatOneOne}
            options={({ route, navigation }) => ({
              title:
                JSON.stringify(route.params.group) == "true" ? (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 50,
                        borderWidth: 1,
                        borderColor: "#fff",
                        borderWidth: 1,
                        borderColor: "grey",
                      }}
                      source={{ uri: route.params.room.avatar }}
                    />
                    <View style={{ width: 150, flexDirection: "column" }}>
                      <Text
                        numberOfLines={1}
                        style={{
                          fontSize: 18,
                          fontWeight: "bold",
                          color: "#fff",
                          width: 80,
                          marginLeft: 10,
                        }}
                      >
                        {route.params.user.name}
                      </Text>
                      <View style={{ flexDirection: "row" }}>
                        <FontAwesome5
                          style={{ marginLeft: 10 }}
                          name="user-tag"
                          size={15}
                          color="white"
                        />
                        <Text style={{ marginLeft: 10, color: "white" }}>
                          {route.params.length}
                        </Text>
                      </View>
                    </View>
                  </View>
                ) : (
                  <View style={{ width: 150, flexDirection: "row" }}>
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "#fff",
                        width: 160,
                      }}
                    >
                      {route.params.user.name}
                    </Text>
                  </View>
                ),
              headerTitleAlign: "left",
              headerTintColor: "#fff",
              headerStyle: { backgroundColor: "#2089dc" },
              headerRight: () => (
                <View
                  style={{
                    flexDirection: "row",
                    width:
                      JSON.stringify(route.params.group) == "true" ? 70 : 70,
                    marginRight: 15,
                    justifyContent: "space-between",
                  }}
                >
                  {JSON.stringify(route.params.group) == "true" ? (
                    <Pressable
                      onPress={() =>
                        navigation.navigate("AddIntoGroup", {
                          room: route.params.room,
                        })
                      }
                    >
                      <Ionicons name="person-add" size={23} color="#fff" />
                    </Pressable>
                  ) : null}
                  {JSON.stringify(route.params.group) == "false" ? (
                    <Pressable
                      onPress={() =>
                        navigation.navigate("Call", {
                          user: route.params.user,
                          room: route.params.room,
                          socket: route.params.socket,
                          group: route.params.room.group,
                          length: route.params.room.users.length,
                          idLogin: route.params.idLogin,
                        })
                      }
                    >
                      <MaterialIcons name="call" size={23} color="#fff" />
                    </Pressable>
                  ) : null}

                  {JSON.stringify(route.params.group) == "true" ? (
                    <Pressable
                      onPress={() =>
                        navigation.navigate("GroupInfo", {
                          room: route.params.room,
                          socket: route.params.socket,
                        })
                      }
                    >
                      <Entypo
                        name="dots-three-vertical"
                        size={23}
                        color="#fff"
                      />
                    </Pressable>
                  ) : null}
                </View>
              ),
            })}
          />
          <Stack.Screen
            name="Forget"
            component={ForgetPass}
            options={{
              headerTitleAlign: "center",
              title: "QUÊN MẬT KHẨU",
              headerTintColor: "#fff",
              headerStyle: { backgroundColor: "#2089dc" },
            }}
          />
          <Stack.Screen
            name="VerificationForget"
            component={VerificationForget}
            options={{
              headerTitleAlign: "center",
              title: "XÁC NHẬN SỐ ĐIỆN THOẠI",
              headerTintColor: "#fff",
              headerStyle: { backgroundColor: "#2089dc" },
            }}
          />
          <Stack.Screen
            name="LRF"
            component={ListRequestFriend}
            options={{
              headerTitleAlign: "center",
              title: "DANH SÁCH KẾT BẠN",
              headerTintColor: "#fff",
              headerStyle: { backgroundColor: "#2089dc" },
            }}
          />
          <Stack.Screen
            name="LSF"
            component={ListSendedRequestFriend}
            options={{
              headerTitleAlign: "center",
              title: "LỜI MỜI ĐÃ GỬI",
              headerTintColor: "#fff",
              headerStyle: { backgroundColor: "#2089dc" },
            }}
          />
          <Stack.Screen
            name="CG"
            component={CreateGroup}
            options={{
              headerTitleAlign: "center",
              title: "TẠO NHÓM",
              headerTintColor: "#fff",
              headerStyle: { backgroundColor: "#2089dc" },
            }}
          />
          <Stack.Screen
            name="AddIntoGroup"
            component={AddFriendIntoGroup}
            options={{
              headerTitleAlign: "center",
              title: "Thêm thành viên",
              headerTintColor: "#fff",
              headerStyle: { backgroundColor: "#2089dc" },
            }}
          />
          <Stack.Screen
            name="SeeImage"
            component={SeeImage}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
