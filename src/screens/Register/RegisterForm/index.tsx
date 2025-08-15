import { AppButton } from "@/components/AppButton";
import { AppInput } from "@/components/AppInput";
import { PublicStackParamsList } from "@/routes/PublicRoutes";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { View, Text, ActivityIndicator } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import { useAuthContext } from "@/context/auth.context";
import { AxiosError } from "axios";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { colors } from "@/shared/colors";

export interface FormRegisterParams {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormRegisterParams>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const { handleRegister } = useAuthContext();
  const { handlerError } = useErrorHandler();

  const navigation = useNavigation<NavigationProp<PublicStackParamsList>>();

  const onSubmit = async (userData: FormRegisterParams) => {
    try {
      await handleRegister(userData);
    } catch (error) {
      handlerError(error, "Erro ao cadastrar usuário");
    }
  };

  return (
    <>
      <AppInput
        control={control}
        name="name"
        label="Nome"
        leftIconName="person"
        placeholder="Seu nome completo"
      />
      <AppInput
        control={control}
        name="email"
        label="Email"
        leftIconName="mail"
        placeholder="mail@example.com.br"
      />
      <AppInput
        control={control}
        name="password"
        label="Senha"
        leftIconName="lock-outline"
        secureTextEntry
        placeholder="Digite uma senha"
      />
      <AppInput
        control={control}
        name="confirmPassword"
        label="Confirme a senha"
        leftIconName="lock-outline"
        secureTextEntry
        placeholder="Confirme a sua senha"
      />

      <View className="flex-1 justify-between mt-5 mb-4 min-h-[180px]">
        <AppButton onPress={handleSubmit(onSubmit)} iconName="arrow-forward">
          {isSubmitting ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            "Cadastrar"
          )}
        </AppButton>

        <View>
          <Text className="mb-4 text-gray-300 text-base">
            Já possui uma conta?
          </Text>
          <AppButton
            iconName="arrow-forward"
            mode="outline"
            onPress={() => navigation.navigate("Login")}
          >
            Login
          </AppButton>
        </View>
      </View>
    </>
  );
};
