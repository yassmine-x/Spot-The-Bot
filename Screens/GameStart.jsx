import { View, Text, Button, StyleSheet, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { NavigationContainer, navigation } from "@react-navigation/native";

const topicPromptsEasy = [
  {
    name: "Youtube",
    promptAI: "Write a short passionate comment about Youtube",
    promptTwitter: "Youtube",
  },
  {
    name: "Spain",
    promptAI: "Write a short comment on Spain",
    promptTwitter: "Spain",
  },
];

const topicPromptsHard = [
  {
    name: "Metal Music",
    promptAI:
      "Write a short, informal, passionate,  comment about the effect metal music has had on you",
    promptTwitter: "Metal Music",
  },
  {
    name: "FromSoftware",
    promptAI: "Write a short passionate comment about FromSoftware",
    promptTwitter: "FromSoftware",
  },
  {
    name: "The Meaning Of Life",
    promptAI:
      "Write a short, informal, passionate and insightful statement on the meaning of life.",
    promptTwitter: "Meaning Of Life",
  },
  {
    name: "Fusion Energy",
    promptAI:
      "Write a short, insightful, informal, passionate, personal statement on fusion energy. Sign off as a nuclear physicist.",
    promptTwitter: "Fusion Energy",
  },
];

export default function TopicSelection({ navigation }) {
  const [topic, setTopic] = useState("");
  const [isPressedOne, setIsPressedOne] = useState(false);
  function handleTopicPress(value) {
    setIsPressedOne((prevPressed) => {
      setIsPressedOne(!prevPressed);
    });
    setTopic(value);
  }

  return (
    <View style={styles.container}>
      <Text>Topic Selection</Text>

      <Button
        style={{ backgroundColor: isPressedOne ? `#228b22` : "#61dafb" }}
        onPress={() => handleTopicPress(topicPromptsHard[0].name)}
        title={topicPromptsHard[0].name}
      >
        {topicPromptsHard[0].name}
      </Button>

      <Button
        style={{ backgroundColor: isPressedOne ? `#228b22` : "#61dafb" }}
        title={topicPromptsHard[1].name}
        onPress={() => handleTopicPress(topicPromptsHard[1].name)}
      >
        {topicPromptsHard[1].name}
      </Button>
      <Button
        style={{ backgroundColor: isPressedOne ? `#228b22` : "#61dafb" }}
        title={topicPromptsHard[2].name}
        onPress={() => handleTopicPress(topicPromptsHard[2].name)}
      >
        {topicPromptsHard[2].name}
      </Button>
      <Text>Current Selection: {topic}</Text>
      <Button
        title="Confirm and Start Game"
        onPress={() =>
          navigation.navigate("GameScreen", {
            topicName: { topic },
          })
        }
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  topicSelection: {
    marginTop: 16,
    // paddingVertical: 8,
    borderWidth: StyleSheet.hairlineWidth,
    // backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    width: 400,
  },
});
