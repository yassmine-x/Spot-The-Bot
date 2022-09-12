import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { useState, useEffect } from "react";
import { NavigationContainer, navigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";

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
  const [aiPrompt, setAiPrompt] = useState("");
  const [isPressedOne, setIsPressedOne] = useState(false);
  function handleTopicPress(value) {
    setIsPressedOne((prevPressed) => {
      setIsPressedOne(!prevPressed);
    });
    setTopic(value.name);
    setAiPrompt(value.promptAI);
  }

  function handlePress() {
    if (topic === "") {
      Alert.alert("Please select a topic");
    } else {
      setTimeout(() => {
        navigation.navigate("GameScreen", {
          topicName: { topic },
          aiPrompt: { aiPrompt },
        });
      }, 300);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Topic Selection</Text>
      <Animatable.View animation="bounceInLeft">
        <Pressable
          style={styles.button}
          onPress={() => handleTopicPress(topicPromptsHard[0])}
        >
          <Text style={styles.text}>{topicPromptsHard[0].name}</Text>
        </Pressable>
      </Animatable.View>
      <Animatable.View animation="bounceInDown">
        <Pressable
          style={styles.button}
          onPress={() => handleTopicPress(topicPromptsHard[1])}
        >
          <Text style={styles.text}>{topicPromptsHard[1].name}</Text>
        </Pressable>
      </Animatable.View>
      <Animatable.View animation="bounceInUp">
        <Pressable
          style={styles.button}
          onPress={() => handleTopicPress(topicPromptsHard[2])}
        >
          <Text style={styles.text}>{topicPromptsHard[2].name}</Text>
        </Pressable>
      </Animatable.View>
      <Text style={styles.currenttopic}>Current Selection: {topic}</Text>
      <Pressable style={styles.button} onPress={() => handlePress()}>
        <Text style={styles.text}>Confirm and Start Game</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00ffff",
    alignItems: "center",
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
    fontSize: 63,
    fontFamily: "DotGothic16_400Regular",
    marginTop: 10,
  },
  currenttopic: {
    fontSize: 24,
    fontFamily: "DotGothic16_400Regular",
    marginTop: 10,
  },
});
