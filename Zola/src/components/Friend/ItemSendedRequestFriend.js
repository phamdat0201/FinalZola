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
} from "react-native";
import { Button } from "react-native-elements";
import addFriendAPI from "../../api/addFriendAPI";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
const ItemSendedRequestFriend = (props) => {
  const token = useSelector((state) => state.user.user.accessToken);
  const [user, setUser] = useState(null);
  const [isRequestHandler, setIsRequestHandler] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchGetUser = async () => {
      try {
        const requestGetUser = await addFriendAPI.getUser({
          userID: props.data.receiver,
        });
        setUser(requestGetUser.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetUser();
  }, []);
console.log(props.data.receiver);
  const revokeHandler = () => {
    const fetchCancelRequest = async () => {
      try {
        const ReceiverRequest = await addFriendAPI.cancelSendedFriend({
          requestId: props.data._id,
        },token);
        setIsRequestHandler(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCancelRequest();
  };

  return (
    <ScrollView>
      {!isRequestHandler && (
        <View style={styles.con}>
          <View style={styles.leftContainer}>
            <Image
              source={{uri:user?.users.avatar}}
              style={styles.avatar}
            />
            <View style={styles.cenContainer}>
              <Text numberOfLines={1} style={styles.username}>
                {user?.users.name}
              </Text>
            </View>

            <Button
              containerStyle={styles.button}
              onPress={revokeHandler}
              title="Hủy yêu cầu"
              type="outline"
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
};
export default ItemSendedRequestFriend;

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
    height: "14%",
    alignItems: "center",
  },
  container: {
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    justifyContent: "center",
    paddingLeft: 30,
    paddingRight: 30,
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
    width: 200,
  },
  lastmess: {
    fontSize: 16,
    color: "grey",
    width: 200,
    marginTop: 15,
  },
  cenContainer: {
    paddingRight: 25,
    marginLeft: 10,
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
    width: 150,
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
});
