import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { colors } from "@/constants/colors";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/logo.png")} />

      <Text style={styles.title}>
        Dieta
        <Text style={{ color: colors.white }}>.IA</Text>
      </Text>

      <Text style={styles.textDescricao}>
        Sua dieta personalizada com inteligência artificial 🍴
      </Text>

      <Link href="./step" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Gerar dieta</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,
  },
  title: {
    color: colors.green,
    fontSize: 36,
  },
  textDescricao: {
    fontSize: 16,
    color: colors.white,
    width: 240,
    textAlign: "center",
    marginBottom: 8,
    marginTop: 8,
  },
  button: {
    backgroundColor: colors.blue,
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 34,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
  },
});
