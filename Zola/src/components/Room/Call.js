import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Pressable,
  ImageBackground,
  TouchableOpacity,
  Text,
} from "react-native";
import { Button } from "react-native-elements";
import { useRoute } from "@react-navigation/core";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Video, AVPlaybackStatus } from "expo-av";
import { Camera } from "expo-camera";
const Call = ({ navigation }) => {
  const route = useRoute();
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [showcamera, setshowcamera] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const turnOnCamera = () => {
    setshowcamera(true);
  };
  const turnOffCamera = () => {
    setshowcamera(false);
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: route.params.user.avatar }}
        resizeMode="cover"
        style={styles.container}
      >
        <Text style={styles.namee}>{route.params.user.name}</Text>
        <Text style={styles.phonee}>{route.params.user.phone}</Text>
        <View style={styles.containerr}>
          {showcamera && (
            <Camera style={styles.camera} type={type}>
              <View style={styles.buttonContainer}></View>
            </Camera>
          )}
        </View>
        <View style={styles.cbtn22}>
          <Pressable
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            {showcamera && (
              <FontAwesome name="exchange" size={35} color="grey" />
            )}
          </Pressable>
        </View>

        {!showcamera && (
          <View style={styles.cbtn11}>
            <Pressable onPress={turnOnCamera}>
              <FontAwesome name="video-camera" size={35} color="grey" />
            </Pressable>
          </View>
        )}
        {showcamera && (
          <View style={styles.cbtn11}>
            <Pressable onPress={turnOffCamera}>
              <FontAwesome5 name="video-slash" size={35} color="grey" />
            </Pressable>
          </View>
        )}
        <View style={styles.cbtn}>
          <Pressable>
            <FontAwesome5 name="phone" size={30} color="white" />
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};
export default Call;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "column",
  },
  image: {
    marginTop: "7%",
    width: 50,
    height: 50,
    borderRadius: 200,
    borderColor: "grey",
    borderWidth: 1,
  },
  image1: {
    flex: 1,
    justifyContent: "center",
  },
  viewbutton1: {
    flexDirection: "row",
    width: "100%",
    height: 100,
    alignItems: "center",
    marginTop: "60%",
    justifyContent: "center",
  },
  btn: {
    backgroundColor: "green",
    borderRadius: 60,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  cbtn: {
    backgroundColor: "green",
    borderRadius: 60,
    width: 60,
    height: 60,
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    top: 30,
    left: 20,
  },
  iconn: {
    position: "absolute",
    top: 30,
    right: 20,
  },
  containerr: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    color: "black",
    position: "absolute",
    bottom: 10,
    left: 10,
  },
  text2: {
    color: "black",
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  cbtn11: {
    backgroundColor: "white",
    borderRadius: 60,
    width: 60,
    height: 60,
    position: "absolute",
    bottom: 0,
    right: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cbtn22: {
    backgroundColor: "white",
    borderRadius: 60,
    width: 60,
    height: 60,
    position: "absolute",
    bottom: 0,
    left: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  phonee: {
    color: "black",
    position: "absolute",
    top: 50,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  namee: {
    color: "black",
    position: "absolute",
    top: 20,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
});
