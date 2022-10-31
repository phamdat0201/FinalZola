import React, { useEffect, useRef, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Pressable, Alert } from "react-native";
import ChatTab from "../components/Tab/ChatTab";
import {
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  Fontisto,
} from "@expo/vector-icons";
import SearchScreen from "../components/Tab/SearchTab";
import FriendScreen from "../components/Tab/FriendTab";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import logoutAPI from "../api/logoutAPI";
import GroupTab from "../components/Tab/GroupTab";
import { LogBox } from "react-native";
import PhoneBookTab from "../components/Tab/PhoneBookTab";
const Tab = createBottomTabNavigator();

const Tabs = ({ navigation }) => {
  const socket = useRef();
  const ENDPOINT = "http://192.168.1.152:5000/";
  useEffect(() => {
    socket.current = io(ENDPOINT, {
      transports: ["websocket", "polling", "flashsocket"],
    });
  }, []);
  const [ref, setref] = useState("");
  AsyncStorage.getItem("refreshToken").then((res) => {
    setref(res);
  });
  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
  ]);
  useEffect(() => {
    socket.current.on("join-room-socket", async (data) => {
      try {
        setTimeout(() => {
          socket.current.emit("join-room-socket", data);
        }, 10);
      } catch (error) {
        console.log(error);
      }
    });
  }, []);
  const logouthandler = () => {
    const fetchLogOut = async () => {
      try {
        const logOut = await logoutAPI.logout({
          refreshToken: ref,
        });

        if (logOut.status === 200) {
          AsyncStorage.removeItem("refreshToken");
          AsyncStorage.removeItem("token");
          navigation.navigate("Login");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchLogOut();
  };

  const choiceLogout = () => {
    Alert.alert("Bạn có muốn thoát hay không?", "", [
      {
        text: "Thoát",

        onPress: () => {
          logouthandler();
        },
      },
      {
        text: "Hủy",
      },
    ]);
  };
  return (
    <Tab.Navigator
      initialRouteName="ChatTab"
      screenOptions={{
        tabBarActiveTintColor: "#fff",
        tabBarLabelStyle: { fontSize: 12, fontWeight: "bold" },
        tabBarActiveTintColor: "#2089dc",
        tabBarInactiveTintColor: "#cccccc",
        tabBarIndicatorStyle: {
          backgroundColor: "#fff",
          height: 5,
        },
        tabBarShowIcon: true,
      }}
    >
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: "Zola",
          headerTitleStyle: {
            color: "#2089dc",
            fontWeight: "bold",
            fontSize: 40,
            marginLeft: 20,
          },
          tabBarLabel: "Tìm",
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.navigate("Me", { socket: socket })}
            >
              <Ionicons
                name="md-menu-sharp"
                style={{ marginLeft: 5 }}
                size={30}
                color="#2089dc"
              />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable onPress={choiceLogout}>
              <Fontisto
                name="power"
                style={{ marginRight: 15 }}
                size={25}
                color="#2089dc"
              />
            </Pressable>
          ),
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Friend"
        component={FriendScreen}
        initialParams={{ socket: socket }}
        options={{
          title: "Zola",
          headerTitleStyle: {
            color: "#2089dc",
            fontWeight: "bold",
            fontSize: 40,
            marginLeft: 20,
          },
          tabBarLabel: "Bạn bè",
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.navigate("Me", { socket: socket })}
            >
              <Ionicons
                name="md-menu-sharp"
                style={{ marginLeft: 5 }}
                size={30}
                color="#2089dc"
              />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable onPress={choiceLogout}>
              <Fontisto
                name="power"
                style={{ marginRight: 15 }}
                size={25}
                color="#2089dc"
              />
            </Pressable>
          ),
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-friends" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="ChatTab"
        initialParams={{ socket: socket }}
        component={ChatTab}
        options={{
          title: "Zola",
          headerTitleStyle: {
            color: "#2089dc",
            fontWeight: "bold",
            fontSize: 40,
            marginLeft: 20,
          },
          tabBarLabel: "Chat",
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.navigate("Me", { socket: socket })}
            >
              <Ionicons
                name="md-menu-sharp"
                style={{ marginLeft: 5 }}
                size={30}
                color="#2089dc"
              />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable onPress={choiceLogout}>
              <Fontisto
                name="power"
                style={{ marginRight: 15 }}
                size={25}
                color="#2089dc"
              />
            </Pressable>
          ),
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubbles" color={color} size={30} />
          ),
        }}
      />

      <Tab.Screen
        name="GroupTab"
        component={GroupTab}
        initialParams={{ socket: socket }}
        options={{
          title: "Zola",
          headerTitleStyle: {
            color: "#2089dc",
            fontWeight: "bold",
            fontSize: 40,
            marginLeft: 20,
          },
          tabBarLabel: "Group",
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.navigate("Me", { socket: socket })}
            >
              <Ionicons
                name="md-menu-sharp"
                style={{ marginLeft: 5 }}
                size={30}
                color="#2089dc"
              />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable onPress={choiceLogout}>
              <Fontisto
                name="power"
                style={{ marginRight: 15 }}
                size={25}
                color="#2089dc"
              />
            </Pressable>
          ),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-group"
              color={color}
              size={30}
            />
          ),
        }}
      />

      <Tab.Screen
        name="AddressLL"
        component={PhoneBookTab}
        options={{
          title: "Zola",
          headerTitleStyle: {
            color: "#2089dc",
            fontWeight: "bold",
            fontSize: 40,
            marginLeft: 20,
          },
          tabBarLabel: "Danh bạ",
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.navigate("Me", { socket: socket })}
            >
              <Ionicons
                name="md-menu-sharp"
                style={{ marginLeft: 5 }}
                size={30}
                color="#2089dc"
              />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable onPress={choiceLogout}>
              <Fontisto
                name="power"
                style={{ marginRight: 15 }}
                size={25}
                color="#2089dc"
              />
            </Pressable>
          ),
          tabBarIcon: ({ color }) => (
            <FontAwesome name="address-book" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default Tabs;
