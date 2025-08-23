import { AppHeader } from "@/components/AppHeader";
import { useAuthContext } from "@/context/auth.context";
import { useTransactionContext } from "@/context/transaction.context";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListHeader } from "./ListHeader";
import { TransactionCard } from "./ListHeader/TransactionCard";
import { TransactionList } from "./TransactionList";

export const Home = () => {
  const { handleLogout } = useAuthContext();

  const { fetchCategories, fecthTransactions, transactions } =
    useTransactionContext();
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
      await Promise.all([handleFetchCategories(), fecthTransactions()]);
    })();
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <FlatList
        className="bg-background-secondary"
        ListHeaderComponent={ListHeader}
        data={transactions}
        keyExtractor={({ id }) => `transaction-${id}`}
        renderItem={({ item }) => <TransactionList transaction={item} />}
      />
    </SafeAreaView>
  );
};
