import { Text, View } from "react-native";
import { Link } from "expo-router";

const CameraScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "600" }}>Camera Screen</Text>

      <Link href="/" style={{ padding: 10, fontSize: 18 }}>
        Home
      </Link>
    </View>
  );
};

export default CameraScreen;
