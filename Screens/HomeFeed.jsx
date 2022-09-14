import { Text, View, Pressable, StyleSheet } from "react-native";

export default HomeFeed = ({ navigation, username }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#00ffff",
      }}
    >
      <Text style={styles.header}>Home Screen</Text>
      <Text>Hello {username}</Text>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("GameStart")}
      >
        <Text style={styles.text}>Start Game</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Leaderboard")}
      >
        <Text style={styles.text}>Leaderboard</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    marginBottom: 15,
    marginTop: 15,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: `#6495ed`,
    width: 350,
  },
  text: {
    fontSize: 20,
    lineHeight: 21,
    fontFamily: "DotGothic16_400Regular",
    letterSpacing: 0.25,
    color: "white",
  },
  header: {
    fontSize: 63,
    fontFamily: "DotGothic16_400Regular",
    bottom: 220,
  },
});
