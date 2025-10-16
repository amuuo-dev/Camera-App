import { Text, View, StyleSheet, Pressable, Image, Button } from "react-native";
import { Link, router, Stack } from "expo-router";
import {
  CameraCapturedPicture,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { ActivityIndicator } from "react-native";
import { useEffect, useState, useRef } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system/legacy";
import { SafeAreaView } from "react-native-safe-area-context";
import path from "path";

const CameraScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");
  const camera = useRef<CameraView>(null);
  const [picture, setPicture] = useState<CameraCapturedPicture>();

  useEffect(() => {
    if (permission && !permission?.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission]);

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const takePicture = async () => {
    const response = await camera.current?.takePictureAsync();
    setPicture(response);
  };

  if (!permission?.granted) {
    return <ActivityIndicator />;
  }

  const saveFile = async (uri: string) => {
    const filename = path.parse(uri).base;
    await FileSystem.copyAsync({
      from: uri,
      to: FileSystem.documentDirectory + filename,
    });
    setPicture(undefined);
    router.push("/");
  };

  if (picture) {
    return (
      <View style={{ flex: 1 }}>
        <Image
          source={{ uri: picture.uri }}
          style={{ width: "100%", flex: 1 }}
        />

        <View style={{ padding: 10 }}>
          <SafeAreaView edges={["bottom"]}>
            <Button title="Save" onPress={() => saveFile(picture.uri)} />
          </SafeAreaView>
        </View>

        <MaterialIcons
          onPress={() => {
            setPicture(undefined);
          }}
          name="close"
          size={35}
          color="white"
          style={{ position: "absolute", top: 50, left: 20, color: "red" }}
        />
      </View>
    );
  }

  return (
    <View>
      <CameraView style={styles.camera} facing={facing} ref={camera}>
        <View style={styles.footer}>
          <View />
          <Pressable style={styles.buttonRecord} onPress={takePicture} />
          <MaterialIcons
            name="flip-camera-ios"
            size={30}
            color="white"
            onPress={toggleCameraFacing}
          />
        </View>
      </CameraView>

      <MaterialIcons
        name="close"
        size={30}
        color="white"
        style={styles.close}
        onPress={() => router.back()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  camera: {
    width: "100%",
    height: "100%",
  },
  close: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  footer: {
    marginTop: "auto",
    padding: 20,
    paddingBottom: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#00000099",
  },
  buttonRecord: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "white",
  },
});

export default CameraScreen;
