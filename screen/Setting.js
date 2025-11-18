import * as ImagePicker from "expo-image-picker";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState("");

  // Obtener el usuario actual de Firebase
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);
      }
    });
    return unsubscribe;
  }, []);

  // Seleccionar imagen
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Tomar foto
  const openCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (permission.status !== "granted") {
      alert("Se requieren permisos para la cámara.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>My Profile</Text>

      {/* FOTO + CORREO */}
      <View style={styles.profileRow}>
        <Image
          source={
            image
              ? { uri: image }
              : require("../assets/images/default-profile.jpg") // coloca una imagen local por defecto
          }
          style={styles.profileImage}
        />

        <View style={styles.infoContainer}>
          <Text style={styles.emailText}>{email}</Text>
        </View>
      </View>

      {/* BOTONES AZULES */}
      <View style={styles.buttonsRow}>
        <TouchableOpacity style={styles.blueButton} onPress={pickImage}>
          <Text style={styles.buttonText}>Elegir Imagen</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.blueButton} onPress={openCamera}>
          <Text style={styles.buttonText}>Abrir Cámara</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: "center",
    backgroundColor: "#F7F7F7",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 40,
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "85%",
    marginBottom: 30,
  },

  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },

  infoContainer: {
    marginLeft: 20,
  },

  emailText: {
    fontSize: 17,
    fontWeight: "600",
  },

  buttonsRow: {
    width: "85%",
    marginTop: 20,
  },

  blueButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
