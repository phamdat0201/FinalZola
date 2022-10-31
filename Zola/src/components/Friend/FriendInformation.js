import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import addFriendAPI from "../../api/addFriendAPI";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import moment from "moment";
const FriendInformation = () => {
  const route = useRoute();
  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Image
          style={styles.image}
          source={{ uri: route.params.user.avatar }}
        />
        <Text style={styles.text}>{route.params.user.name}</Text>
      </View>
      <View style={styles.container133}>
        <View style={styles.cont}>
          <View style={{ width: "10%" }}>
            <FontAwesome name="phone-square" size={24} color="#339966" />
          </View>
          <View style={{ width: "90%" }}>
            <Text style={styles.username1}>{route.params.user.phone}</Text>
          </View>
        </View>
        <View style={styles.cont}>
          <View style={{ width: "10%" }}>
            <FontAwesome name="birthday-cake" size={24} color="#ff6699" />
          </View>
          <View style={{ width: "90%" }}>
            <Text style={styles.username1}>
              {moment(route.params.user.birthday).format("DD/MM/YYYY")}
            </Text>
          </View>
        </View>
        <View style={styles.cont}>
          <View style={{ width: "10%" }}>
            <FontAwesome5 name="transgender" size={24} color="#751aff" />
          </View>
          <View style={{ width: "90%" }}>
            <Text style={styles.username1}>
              {JSON.stringify(route.params.user.gender) == "true"
                ? "Nam"
                : "Nữ"}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.container2}>
        <View style={styles.container21}>
          <Text style={styles.text2}>Danh sách bạn bè:</Text>
        </View>
        <View style={styles.container11}>
          <ScrollView style={{ width: "100%" }}>
            {route.params.user.friends.map((data, index) => {
              const [name, setname] = useState("");
              const [image, setimage] = useState("");

              const fetchGetUser = async () => {
                try {
                  const requestGetUser = await addFriendAPI.getUser({
                    userID: data,
                  });
                  setname(requestGetUser.data.users.name);
                  setimage(requestGetUser.data.users.avatar);
                } catch (error) {
                  console.log(error);
                }
              };
              fetchGetUser();

              return (
                <View key={index}>
                  <View style={styles.co}>
                    <View style={styles.left}>
                      <Image source={{ uri: image }} style={styles.avatar} />
                      <View style={styles.cen}>
                        <Text numberOfLines={1} style={styles.username}>
                          {name}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default FriendInformation;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  container11: {
    width: "100%",
    height: "90%",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  container1: {
    width: "100%",
    height: "25%",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  container133: {
    width: "100%",
    height: "25%",
    alignItems: "center",
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  container21: {
    width: "100%",
    height: "10%",
  },
  container2: {
    width: "90%",
    height: "50%",
    backgroundColor: "#fff",
  },
  text2: {
    fontWeight: "bold",
    fontSize: 14,
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 17,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "grey",
  },
  co: {
    flexDirection: "column",
    width: "100%",
    backgroundColor: "#fff",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 15,
    justifyContent: "center",
    paddingLeft: 15,
    paddingRight: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "grey",
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  username1: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: "6%",
  },
  cen: {
    flexDirection: "column",
    padding: 15,
    flex: 1,
  },
  cont: {
    width: "90%",
    height: "33%",
    flexDirection: "row",
    alignItems: "center",
  },
});
