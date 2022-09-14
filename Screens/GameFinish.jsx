import { Text, Button, View } from "react-native";
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
    <View>
      <Text>
        {username}, you scored {localScore.localScore} points{" "}
      </Text>
      <Button
        title="New Game"
        onPress={() => navigation.navigate("GameStart")}
      ></Button>
      <Button
        title="Leaderboard"
        onPress={() => navigation.navigate("Leaderboard")}
      ></Button>
    </View>
  );
}
