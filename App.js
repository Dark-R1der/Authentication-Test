import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import { Colors } from "./constants/styles";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { useContext, useEffect, useState } from "react";
import IconButton from "./components/ui/IconButton";
import AppLoading from "expo-app-loading";
import Otp from "./screens/PhoneScreen";
import LoginOptionScreen from "./screens/LoginOptionScreen";
import CategoriesScreen from "./screens/CategoryOverviewScreen";
import { CategoryProvider } from "./CategoryContext";
import MealsOverviewScreen from "./screens/MealOverview";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
<Stack.Screen name ="CategoriesScreen" component={CategoriesScreen} />
      <Stack.Screen name ="LoginOption" component={LoginOptionScreen} />
      <Stack.Screen name = "Otp" component={Otp} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      
      <Stack.Screen name ="CategoriesScreen" component={CategoriesScreen} />
      <Stack.Screen
        name="MealOverViewScreen"
        component={MealsOverviewScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticatted && <AuthStack />}
      {authCtx.isAuthenticatted && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const authCtx = useContext(AuthContext); 

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        authCtx.authenticate(storedToken);  
        // setAuthToken(storedToken);
      }

      setIsTryingLogin(false);
    }
    fetchToken();
  });
  if(isTryingLogin){
    return <AppLoading />
  }
  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <CategoryProvider>
        <Root /> 
        </CategoryProvider>
      </AuthContextProvider>

    </>
  );
}
