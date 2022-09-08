import { Text, View, Button } from "react-native";

export default Login = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#00ffff",
      }}
    >
      <Text>Home Screen</Text>
      <Button title="Log In" onPress={() => navigation.navigate("HomeFeed")} />
    </View>
  );
};
