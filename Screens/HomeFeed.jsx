import { Text, View, Button } from "react-native";

export default HomeFeed = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Start Game"
        onPress={() => navigation.navigate("GameStart")}
      />
    </View>
  );
};
