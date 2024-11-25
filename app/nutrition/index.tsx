import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

import { useDataStore } from "@/store/data";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { colors } from "@/constants/colors";
import { Data } from "@/types/data";
import { Link } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";

interface ResponseData {
  data: Data;
}

export default function Nutrition() {
  const user = useDataStore((state) => state.user);

  const { data, isFetching, error } = useQuery({
    queryKey: ["nutrition"],
    queryFn: async () => {
      try {
        if (!user) {
          throw new Error("Filed load nutrition");
        }

        const response = await api.get<ResponseData>("/test");
        // const response = await api.post("/create", {
        //   name: user.name,
        //   age: user.age,
        //   gender: user.gender,
        //   height: user.height,
        //   weight: user.weight,
        //   objective: user.objective,
        //   level: user.level,
        // });

        return response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  if (isFetching) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Estams gerando sua dieta!</Text>
        <Text style={styles.loadingText}>Consultando IA</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Falha ao gerar a sua dieta!</Text>
        <Link href="/" asChild>
          <Text style={styles.loadingText}>Tente novamente</Text>
        </Link>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <View style={styles.contentHeader}>
          <Text style={styles.title}>Minha dieta</Text>

          <Pressable style={styles.buttonShare}>
            <Text style={styles.buttonShareText}>Compartilhar</Text>
          </Pressable>
        </View>
      </View>

      <View style={{ paddingLeft: 16, paddingRight: 16 }}>
        {data && Object.keys(data).length > 0 && (
            <>
                <Text style={styles.name}>Nome: {data.nome}</Text>
                <Text style={styles.objective}>Foco: {data.objetivo}</Text>
                
                <Text style={styles.label}>Refeições:</Text>
                <ScrollView>
                    <View style={styles.foods}>
                        {data.refeicoes.map( (refeicao) => (
                          <View key={refeicao.nome} style={styles.food}>
                            <View style={styles.foodHeader}>
                              <Text>{refeicao.nome}</Text>
                              <Ionicons name="restaurant" size={16} color="#000"/>

                              <View style={styles.foodContent}>
                                <Feather name="clock" size={14} color="#000" />
                                <Text>{refeicao.horario}</Text>
                              </View>

                            </View>
                          </View>
                        ) )}


{/* Parei aqui  2:14:45 */}


                    </View>
                </ScrollView>

            </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingText: {
    fontSize: 18,
    color: colors.white,
    marginBottom: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  containerHeader: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    paddingTop: 60,
    paddingBottom: 20,
    marginBottom: 16,
  },
  contentHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 16,
    paddingRight: 16,
  },
  title: {
    fontSize: 28,
    color: colors.background,
    fontWeight: "bold",
  },
  buttonShare: {
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 4,
  },
  buttonShareText: {
    color: colors.white,
    fontWeight: "500",
  },
});
