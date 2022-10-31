import React, { useEffect, useState } from "react";
import addFriendAPI from "../../api/addFriendAPI";
import { useSelector } from "react-redux";
import ItemRequestFriend from "./ItemRequestFriend";
import { ScrollView, View } from "react-native";
import ItemSendedRequestFriend from "./ItemSendedRequestFriend";
import { useRoute } from "@react-navigation/core";
const ListSendedRequestFriend = () => {
  const token = useSelector((state) => state.user.user.accessToken);
  const [arrayListSenderRequest, setArrayListSenderRequest] = useState([]);
  const [arrayListReceiverRequest, setArrayListReceiverRequest] = useState([]);
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
  useEffect(() => {
    const fetchListReceiverRequest = async () => {
      try {
        const requestListReceiverRequest = await addFriendAPI.getListReceiver(
          token
        );
        setArrayListReceiverRequest(requestListReceiverRequest.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListReceiverRequest();
  }, []);
  //
  useEffect(() => {
    socket.current.on("friend-request-decline-status", async (data) => {
      try {
        const requestListReceiverRequest = await addFriendAPI.getListReceiver(
          token
        );
        setArrayListReceiverRequest(requestListReceiverRequest.data);
      } catch (error) {
        console.log(error);
      }
    });
  }, []);
  return (
    <View style={{ width: "100%", height: "100%", backgroundColor: "#fff" }}>
      <ScrollView>
        {arrayListReceiverRequest.map((data) => {
          return <ItemSendedRequestFriend data={data} key={data._id} />;
        })}
      </ScrollView>
    </View>
  );
};
export default ListSendedRequestFriend;
