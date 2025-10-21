import { View, Image, Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import * as FileSystem from "expo-file-system/legacy";
import { MaterialIcons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { useState } from "react";
import * as MediaLibray from "expo-media-library";

const ImageScreen = () => {
  const { name } = useLocalSearchParams<{ name: string }>();
  const fullUri = FileSystem.documentDirectory + name;
  const [permissionResponse, requestPermission] = MediaLibray.usePermissions();
  const [isSaving, setIsSaving] = useState(false);

  const onDelete = async () => {
    Alert.alert("Delete Media", "Are you sure you want to delete this Media?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await FileSystem.deleteAsync(fullUri);
          router.back();
        },
      },
    ]);
  };

  const onSave = async () => {
    if (permissionResponse?.status !== "granted") {
      await requestPermission();
    }
    setIsSaving(true);
    await MediaLibray.createAssetAsync(fullUri);
    setIsSaving(false);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Stack.Screen
        options={{
          title: "Media",
          headerRight: () => (
            <View style={{ gap: 10, flexDirection: "row" }}>
              <MaterialIcons
                onPress={onDelete}
                name="delete"
                size={26}
                color="crimson"
              />
              <MaterialIcons
                onPress={onSave}
                name={isSaving ? "hourglass-empty" : "save"}
                size={26}
                color="dimgray"
              />
            </View>
          ),
        }}
      />
      <Image
        source={{ uri: fullUri }}
        style={{ width: "100%", height: "100%" }}
      />
    </View>
  );
};

export default ImageScreen;
