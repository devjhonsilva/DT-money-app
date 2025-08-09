import { AuthHeader } from "@/components/AuthHeader";
import { DismissKeyboardView } from "@/components/DismissKeyboard";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { View } from "react-native";
import { LoginForm } from "./LoginForm";
import { useAuthContext } from "@/context/auth.context";

export const Login = () => {
  const { user } = useAuthContext();
  console.log(user);

  return (
    <DismissKeyboardView>
      <View className="flex-1 w-[82%] self-center">
        <AuthHeader />
        <LoginForm />
      </View>
    </DismissKeyboardView>
  );
};
