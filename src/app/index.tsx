import { View, StyleSheet, Pressable, FlatList, Image } from "react-native";
import { Link, useFocusEffect } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import * as FileSystem from "expo-file-system/legacy";
import { SafeAreaView } from "react-native-safe-area-context";

type Media = {
  name: string;
  uri: string;
};

const HomeScreen = () => {
  const [images, setImages] = useState<Media[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadFiles();
    }, [])
  );

  const loadFiles = async () => {
    if (!FileSystem.documentDirectory) return;

    const res = await FileSystem.readDirectoryAsync(
      FileSystem.documentDirectory
    );
    setImages(
      res.map((file) => ({
        name: file,
        uri: FileSystem.documentDirectory + file,
      }))
    );
  };

  const allowedExtension = ["jpeg", "png", "jpg"];

  const onlyImages = images.filter((item) =>
    allowedExtension.some((ext) => item.name.toLowerCase().endsWith(ext))
  );

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={onlyImages}
          numColumns={3}
          contentContainerStyle={{ gap: 1 }}
          columnWrapperStyle={{ gap: 1 }}
          renderItem={({ item }) => (
            <Link href={`/${item.name}`} asChild>
              <Pressable style={{ flex: 1, maxWidth: "33.33%" }}>
                <Image
                  source={{ uri: item.uri }}
                  style={{
                    aspectRatio: 3 / 4,
                    borderRadius: 5,
                  }}
                />
              </Pressable>
            </Link>
          )}
        />

        <Link href="/camera" asChild>
          <Pressable style={styles.floatingImage}>
            <MaterialIcons name="photo-camera" size={30} color="white" />
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
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
