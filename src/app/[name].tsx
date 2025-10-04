import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

const ImageScreen = () => {
  const { name } = useLocalSearchParams<{ name: string }>();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Stack.Screen options={{ title: "Image: " + name }} />

      <Text style={{ fontSize: 20, fontWeight: "600" }}>
        Image Screen Details for {name}
      </Text>

      <Link href="/" style={{ padding: 10, fontSize: 18 }}>
        Home
      </Link>
    </View>
  );
};

export default ImageScreen;
