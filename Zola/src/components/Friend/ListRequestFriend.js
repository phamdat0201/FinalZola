import React, { useEffect, useState } from "react";
import addFriendAPI from "../../api/addFriendAPI";
import { useSelector } from "react-redux";
import ItemRequestFriend from "./ItemRequestFriend";
import { ScrollView, View } from "react-native";
import { useRoute } from "@react-navigation/core";
const ListRequestFriend = () => {
  const token = useSelector((state) => state.user.user.accessToken);
  const [arrayListSenderRequest, setArrayListSenderRequest] = useState([]);
  const route = useRoute();
  const socket = route.params.socket;
  useEffect(() => {
    const fetchListSenderRequest = async () => {
      try {
        const requestListSenderRequest =
          await addFriendAPI.getListSenderRequest(token);
        setArrayListSenderRequest(requestListSenderRequest.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListSenderRequest();
  }, []);
  //
  useEffect(() => {
    socket.current.on(
      "cancel-friend-request",
      async (data) => {
        console.log(
          "Thằng " + data.name + " vừa gửi cho mày yêu cầu kết bạn kìa !!!"
        );
        try {
          const requestListSenderRequest =
            await addFriendAPI.getListSenderRequest(token);
          setArrayListSenderRequest(requestListSenderRequest.data);
        } catch (error) {
          console.log(error);
        }
      }
    );
  }, []);
  return (
    <View style={{ width: "100%", height: "100%", backgroundColor: "#fff" }}>
      <ScrollView>
        {arrayListSenderRequest.map((data) => {
          return <ItemRequestFriend data={data} key={data._id} />;
        })}
      </ScrollView>
    </View>
  );
};
export default ListRequestFriend;
