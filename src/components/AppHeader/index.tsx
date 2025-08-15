import { View, Text, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/shared/colors";
import { useAuthContext } from "@/context/auth.context";
import { useBottomSheetContext } from "@/context/bottomsheet.context";

export const AppHeader = () => {
  const { handleLogout } = useAuthContext();
  const { openBottomSheet } = useBottomSheetContext();
  return (
    <View className="w-full flex-row p-8 justify-between items-center">
      <View>
        <Image
          source={require("@/assets/Logo.png")}
          className="w-[130px] h-[30px]"
        />
        <TouchableOpacity
          className="flex-row items-center gap-2 mt-2"
          onPress={handleLogout}
        >
          <MaterialIcons name="logout" color={colors.gray["700"]} size={15} />
          <Text className="text-gray-700 text-base">Sair da conta</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        className="bg-accent-brand w-[130px] h-[50px] items-center justify-center rounded-xl"
        onPress={() =>
          openBottomSheet(<Text> formulário Nova Transação</Text>, 1)
        }
      >
        <Text className="text-white font-bold text-sm">Nova transação</Text>
      </TouchableOpacity>
    </View>
  );
};
