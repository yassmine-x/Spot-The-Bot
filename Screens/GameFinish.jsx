import { Text, Button, View } from "react-native";
import { NavigationContainer, navigation } from "@react-navigation/native";

export default function GameFinish({ route, navigation }) {
  const { localScore } = route.params;
  return (
    <View>
      <Text>You scored {localScore.localScore} points </Text>
      <Button
        title="New Game"
        onPress={() => navigation.navigate("GameStart")}
      ></Button>
    </View>
  );
}
