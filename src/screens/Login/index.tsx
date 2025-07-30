import { PublicStackParamList } from "@/routes";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { View, Text, Button } from "react-native";

export const Login = () => {
  const navigation = useNavigation<StackNavigationProp<PublicStackParamList>>();
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
