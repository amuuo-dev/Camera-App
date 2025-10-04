import { Text, View, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "600" }}>Home Screen</Text>

      <Link href="/camera" asChild>
        <Pressable style={styles.floatingImage}>
          <MaterialIcons name="photo-camera" size={30} color="white" />
        </Pressable>
      </Link>

      <Link href={"/image-1"}>Image 1</Link>
      <Link href={"/image-2"}>Image 2</Link>
      <Link href={"/image-3"}>Image 3</Link>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingImage: {
    backgroundColor: "royalblue",
    padding: 15,
    borderRadius: 50,
    position: "absolute",
    bottom: 50,
    right: 10,
  },
});

export default HomeScreen;
