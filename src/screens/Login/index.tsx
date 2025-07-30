import { PublicStackParamsList } from "@/routes/PublicRoutes";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { View, Text, Button } from "react-native";

export const Login = () => {
  const navigation =
    useNavigation<StackNavigationProp<PublicStackParamsList>>();
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text>Login Screen</Text>

      <Button
        title="Registro"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
};
