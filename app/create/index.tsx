import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { colors } from "@/constants/colors";
import { Header } from "@/components/header";
import { Select } from "@/components/input/select";
import { useDataStore } from "@/store/data";
import { router } from "expo-router";

const schema = z.object({
  gender: z.string().min(1, { message: "O sexo é obrigatorio" }),
  objective: z.string().min(1, { message: "O objetivo é obrigatoria" }),
  level: z.string().min(1, { message: "Selecione o seu nivel" }),
});

type FormData = z.infer<typeof schema>;

export default function Create() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const setPageTwo = useDataStore((state) => state.setPageTwo);

  const genrderOptions = [
    {
      label: "Masculino",
      value: "masculino",
    },
    {
      label: "Feminino",
      value: "feminino",
    },
  ];

  const levelOptions = [
    {
      label: "Sedentário (pouco ou nenhuma atividade física)",
      value: "Sedentário",
    },
    {
      label: "Levemente ativo (exercícios 1 a 3 vezes na semana)",
      value: "Levemente ativo (exercícios 1 a 3 vezes na semana)",
    },
    {
      label: "Moderadamente ativo (exercícios 3 a 5 vezes na semana)",
      value: "Moderadamente ativo (exercícios 3 a 5 vezes na semana)",
    },
    {
      label: "Altamente ativo (exercícios 5 a 7 dia por semana)",
      value: "Altamente ativo (exercícios 5 a 7 dia por semana)",
    },
  ];

  const objectiveOptions = [
    // Cria um array constante chamado 'objectiveOptions'
    { label: "Emagrecer", value: "emagrecer" }, // Primeiro objeto: objetivo de emagrecer
    { label: "Hipertrofia", value: "Hipertrofia" }, // Segundo objeto: objetivo de hipertrofia
    { label: "Hipertrofia + Definição", value: "Hipertrofia e Definição" }, // Terceiro objeto: objetivo de hipertrofia e definição
    { label: "Definição", value: "Definição" }, // Quarto objeto: objetivo de definição
  ];

  function handleCreate(data: FormData) {
    setPageTwo({
      level: data.level,
      gender: data.gender,
      objective: data.objective,
    });
    router.push('/nutrition')
  }

  return (
    <View style={styles.container}>
      <Header step="Passo 2" title="Finalizando dieta" />

      <ScrollView style={styles.content}>
        {/* Genero  */}
        <Text style={styles.label}>Sexo:</Text>
        <Select
          control={control}
          name="gender"
          placeholder="Selecione o seu gênero"
          error={errors.gender?.message}
          options={genrderOptions}
        />

        {/* Nivel de atividade lista */}
        <Text style={styles.label}>Selecione o nível de atividade física:</Text>
        <Select
          control={control}
          name="level"
          placeholder="Selecione o seu nivel de atividade física"
          error={errors.level?.message}
          options={levelOptions}
        />
        {/* Objetivo lista */}
        <Text style={styles.label}>Selecione o seu objetivo:</Text>
        <Select
          control={control}
          name="objective"
          placeholder="Selecione o seu nivel de atividade física"
          error={errors.level?.message}
          options={objectiveOptions}
        />

        <Pressable style={styles.button} onPress={handleSubmit(handleCreate)}>
          <Text style={styles.buttonText}>Avançar</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  label: {
    fontSize: 16,
    color: colors.white,
    fontWeight: "bold",
    marginBottom: 8,
  },
  content: {
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  button: {
    backgroundColor: colors.blue,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});
