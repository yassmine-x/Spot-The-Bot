import { View, Text, Button } from "react-native";
import { NavigationContainer, navigation } from "@react-navigation/native";

export default function Success({ navigation }) {
  return (
    <View>
      <Text>Sorry, that was a real person </Text>
      <Button
        title="Try again"
        onPress={() => navigation.navigate("GameStart")}
      ></Button>
    </View>
  );
}
