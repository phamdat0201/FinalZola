import React, { useState, useEffect } from "react";
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
  Alert,
} from "react-native";
import addFriendAPI from "../../api/addFriendAPI";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native';
const ItemFriend = (props) => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.user.user.accessToken);
  useEffect(() => {
    const friendId = props.data.users.find((m) => m !== props.idLogin);
    const fetchGetUser = async () => {
      try {
        const requestGetUser = await addFriendAPI.getUser({
          userID: friendId,
        });
        setUser(requestGetUser.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetUser();
  }, []);
  //
  // useEffect(() => {
  //   props.onSendSocketToListFriend.current.on(
  //     "delete-friend-by-me",
  //     async (data) => {
  //       try {
  //         const requestGetUser = await addFriendAPI.getUser({
  //           userID: friendId,
  //         });
  //         setUser(requestGetUser.data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   );
  // }, []);
  //
  const changetoFriend = () => {
    props.onReceiveFromFriend({ user: user });
  };
  //
  const DeleteFriendHandler = () => {
    const fetchDeleteFriend = async () => {
      try {
        const deleteFriend = await addFriendAPI.deleteFriend(
          {
            friendId: user?.users._id,
          },
          token
        );
        if (deleteFriend.status === 200) {
          navigation.navigate("Friend");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDeleteFriend();
  };
  const choicedeletefriend = () => {
    Alert.alert("Bạn có muốn kết bạn hay không?", "", [
      {
        text: "Xóa kết bạn",
        onPress: () => {
          DeleteFriendHandler();
        },
      },
      {
        text: "Hủy",
      },
    ]);
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image source={{ uri: user?.users.avatar }} style={styles.avatar} />
          <View style={styles.cenContainer}>
            <Text numberOfLines={1} style={styles.username} onPress={()=> navigation.navigate("FriendInfo",{user:user?.users})}>
              {user?.users.name}
            </Text>
          </View>
          <Pressable onPress={choicedeletefriend}>
            <Ionicons
              name="ios-remove-circle-outline"
              size={26}
              color="black"
            />
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};
export default ItemFriend;
const styles = StyleSheet.create({
  con: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    flexDirection: "column",
  },
  con2: {
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  container: {
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
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "grey",
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  cenContainer: {
    flexDirection: "column",
    padding: 15,
    flex: 1,
  },
  time: {
    fontSize: 16,
  },
  aa: {
    marginLeft: 50,
  },
  textinput: {
    borderWidth: 1,
    borderColor: "black",
    width: "80%",
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
  button: {
    width: 100,
    marginLeft: 10,
  },
  on: {
    marginLeft: 150,
  },
});
