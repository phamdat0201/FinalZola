import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import { useRoute } from "@react-navigation/core";
const SeeImage = () => {
  const route = useRoute();
  const uri = route.params.uri;
  const images = [
    {
      url: uri,
    },
  ];
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ImageViewer imageUrls={images} renderIndicator={() => null} />
      </View>
    </SafeAreaView>
  );
};
export default SeeImage;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5FCFF",
    flex: 1,
  },
});
