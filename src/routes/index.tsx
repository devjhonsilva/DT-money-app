import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Login } from "@/screens/Login";
import { Register } from "@/screens/Register";

export type PublicStackParamList = {
  Login: undefined;
  Register: undefined;
};

const NavigationRoutes = () => {
  const PublicStack = createStackNavigator<PublicStackParamList>();

  return (
    <NavigationContainer>
      <PublicStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <PublicStack.Screen name="Login" component={Login} />
        <PublicStack.Screen name="Register" component={Register} />
      </PublicStack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationRoutes;
