import { View, Text } from "react-native";

export default function Success({ route }) {
  const { score } = route.params;
  return (
    <View>
      <Text>Congratulations, you found the bot</Text>
      <Text> Your current score is {score.score}</Text>
    </View>
  );
}
