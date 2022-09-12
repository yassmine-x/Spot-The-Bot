import { View, Text } from "react-native";

export default function Success({ score }) {
  return (
    <View>
      <Text>Congratulations, you found the bot</Text>
      <Text> Your current score is {score}</Text>
    </View>
  );
}
