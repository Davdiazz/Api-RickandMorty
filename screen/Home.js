import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

export default function Home() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
      }
    })();
  }, []);

  if (!location) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
        <Text>Cargando ubicación...</Text>
      </View>
    );
  }

  const lat = location.coords.latitude;
  const lon = location.coords.longitude;
  const googleUrl = `https://www.google.com/maps?q=${lat},${lon}&z=16&output=embed`;

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
      
      <View style={styles.card}>
        <Text style={styles.cardTag}>Bienvenido</Text>

        <Text style={styles.cardTitle}>
          Transformando tu vida con tecnología
        </Text>

        <Text style={styles.cardDescription}>
          Nos alegra tenerte de regreso. Explora y disfruta de una experiencia diseñada especialmente para ti.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Esta es tu posición actual</Text>

        {Platform.OS === "web" ? (
          <iframe
            src={googleUrl}
            style={styles.mapWeb}
          />
        ) : (
          <WebView
            source={{ uri: googleUrl }}
            style={styles.mapMobile}
          />
        )}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },

  card: {
    backgroundColor: "#F4EDE6",
    padding: 22,
    borderRadius: 25,
    marginBottom: 25,
  },
  cardTag: {
    borderWidth: 1,
    borderColor: "#000",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: "flex-start",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 15,
    color: "#555",
    lineHeight: 20,
  },

  mapWeb: {
    width: "100%",
    height: 300,
    borderRadius: 20,
    marginTop: 15,
    border: "none",
  },
  mapMobile: {
    width: "100%",
    height: 300,
    borderRadius: 20,
    marginTop: 15,
    overflow: "hidden",
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
