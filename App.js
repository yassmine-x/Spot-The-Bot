import { NavigationContainer, navigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-url-polyfill/auto";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  DotGothic16_400Regular,
} from "@expo-google-fonts/dotgothic16";
import { StatusBar } from "react-native";

import Login from "./Screens/Login";
import HomeFeed from "./Screens/HomeFeed";
import GameStart from "./Screens/GameStart";
import GameScreen from "./Screens/GameScreen";
import Success from "./Screens/Success";
import Failure from "./Screens/Failure";
const Stack = createNativeStackNavigator();

export default function App() {
  StatusBar.setHidden(true);
  let [fontsLoaded] = useFonts({
    DotGothic16_400Regular,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="GameScreen" component={GameScreen} />
          <Stack.Screen name="GameStart" component={GameStart} />
          <Stack.Screen name="HomeFeed" component={HomeFeed} />
          <Stack.Screen name="Success" component={Success} />
          <Stack.Screen name="Failure" component={Failure} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
