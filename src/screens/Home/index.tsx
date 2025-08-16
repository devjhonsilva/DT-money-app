import { AppHeader } from "@/components/AppHeader";
import { useAuthContext } from "@/context/auth.context";
import { useTransactionContext } from "@/context/transaction.context";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Home = () => {
  const { handleLogout } = useAuthContext();

  const { fetchCategories } = useTransactionContext();
  const { handlerError } = useErrorHandler();

  const handleFetchCategories = async () => {
    try {
      await fetchCategories();
    } catch (error) {
      handlerError(error, "Falha ao buscar as categorias.");
    }
  };

  useEffect(() => {
    (async () => {
      await handleFetchCategories();
    })();
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <AppHeader />
    </SafeAreaView>
  );
};
