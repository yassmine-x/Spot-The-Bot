import { Text, Button, View, Pressable, StyleSheet } from "react-native";
import { NavigationContainer, navigation } from "@react-navigation/native";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../Core/config";

export default function GameFinish({ route, navigation, username }) {
  const { localScore } = route.params;
  const scoresRef = doc(db, "Scores", username);

  const docRef = doc(db, "Scores", username);
  async function foo() {
    try {
      const docSnap = await getDoc(docRef);
      return docSnap.data();
    } catch (err) {
      console.log("Error getting documents", err);
    }
  }
  foo().then((data) => {
    if (data.highScore < localScore.localScore) {
      const scoresData = {
        createdAt: new Date().toISOString(),
        highScore: localScore.localScore,
      };
      setDoc(scoresRef, scoresData, { merge: true });
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {username}, you scored {localScore.localScore} points{" "}
      </Text>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("GameStart")}
      >
        <Text style={styles.text}>New Game</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Leaderboard")}
      >
        <Text style={styles.text}>Leaderboard</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00FFFF",
  },
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
    fontSize: 30,
    fontFamily: "DotGothic16_400Regular",
    bottom: 150,
  },
});
