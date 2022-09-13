import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  Image,
  TouchableHighlight,
  ImageBackground,
} from "react-native";
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
    imgUrl:
      "https://img.pixers.pics/pho_wat(s3:700/FO/69/11/06/1/700_FO6911061_00b13758482f21657ba218c28d310706.jpg,566,700,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,346,650,jpg)/wall-murals-heavy-metal-guitarist.jpg.jpg",
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
      }, 100);
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Topic Selection</Text>
      <Animatable.View animation="bounceInLeft">
        <TouchableHighlight
          style={styles.button}
          onPress={() => handleTopicPress(topicPromptsHard[0])}
        >
          <Text style={styles.text}>{topicPromptsHard[0].name}</Text>
        </TouchableHighlight>
      </Animatable.View>
      <Animatable.View animation="bounceInRight">
        <Pressable
          style={styles.button}
          onPress={() => handleTopicPress(topicPromptsHard[1])}
        >
          <Text style={styles.text}>{topicPromptsHard[1].name}</Text>
        </Pressable>
      </Animatable.View>
      <Animatable.View animation="bounceInLeft">
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
    backgroundColor: "#00FFFF",
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
    height: 100,
  },
  text: {
    fontSize: 20,
    lineHeight: 21,
    fontFamily: "DotGothic16_400Regular",
    letterSpacing: 0.25,
    color: "white",
  },
  header: {
    fontSize: 55,
    fontFamily: "DotGothic16_400Regular",
    marginTop: 60,
  },
  currenttopic: {
    fontSize: 24,
    fontFamily: "DotGothic16_400Regular",
    marginTop: 15,
  },
  topicbutton: {
    width: 350,
    height: 100,
  },
});
