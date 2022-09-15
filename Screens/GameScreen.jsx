import { useState, useEffect } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  Alert,
  Image,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { NavigationContainer, navigation } from "@react-navigation/native";
import Countdown from "react-native-countdown-component";
import showTweets from "../Twitterapi";
import showAiTweet from "../Aiapi";

export default GameScreen = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [botTweet, setBotTweet] = useState("");
  const [tweetData, setTweetData] = useState([]);
  const [buttonBg0, setButtonBg0] = useState("#61dafb");
  const [buttonBg1, setButtonBg1] = useState("#61dafb");
  const [buttonBg2, setButtonBg2] = useState("#61dafb");
  const [question, setQuestion] = useState(0);
  const [localScore, setLocalScore] = useState(0);
  let win = false;

  const userNames = ["@tweetdaddy20", "@Barry_1964", "@GoTLover_3099"];

  const [isClockRunning, setisClockRunning] = useState(true);

  const { topicName } = route.params;
  const { aiPrompt } = route.params;
  async function showTiles(topic, aiPrompt) {
    let humanTweets = await showTweets(topic);
    let botTweets = await showAiTweet(aiPrompt);
    setBotTweet(botTweets);
    let finalTweets = [...humanTweets, ...botTweets];

    return finalTweets;
  }

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  useEffect(() => {
    showTiles(topicName.topic, aiPrompt.aiPrompt).then((data) => {
      // setWin(false);
      shuffleArray(data);
      setTweetData(data);
      setisClockRunning(true);
      setButtonBg0("#61dafb");
      setButtonBg1("#61dafb");
      setButtonBg2("#61dafb");

      setIsLoading(false);
    });
  }, [question]);

  async function handlePressOne() {
    async function handleSelection() {
      setisClockRunning(false);
      if (tweetData[0][1] === botTweet[0][1]) {
        setButtonBg0("#66ff00");
        win = true;
      } else {
        setButtonBg0("red");
      }
    }
    await handleSelection();
    confirmSelection(win);
  }

  async function handlePressTwo() {
    async function handleSelection() {
      setisClockRunning(false);
      if (tweetData[1][1] === botTweet[0][1]) {
        setButtonBg1("#66ff00");
        win = true;
      } else {
        setButtonBg1("red");
      }
    }
    await handleSelection();
    confirmSelection(win);
  }

  async function handlePressThree() {
    async function handleSelection() {
      setisClockRunning(false);
      if (tweetData[2][1] === botTweet[0][1]) {
        setButtonBg2("#66ff00");
        win = true;
      } else {
        setButtonBg2("red");
      }
    }
    await handleSelection();
    confirmSelection(win);
  }

  function confirmSelection(win) {
    if (win === true) {
      let scoreVar = localScore + 1;
      setLocalScore(scoreVar);
      setQuestion((prevQuestion) => {
        return prevQuestion + 1;
      });

      console.log("if");
      const timer = setTimeout(() => {}, 250);
    } else {
      setQuestion((prevQuestion) => {
        return prevQuestion + 1;
      });
      const timer = setTimeout(() => {}, 250);
    }
  }

  const handleFinish = () => {
    navigation.navigate("GameFinish", {
      localScore: { localScore },
    });
  };

  return (
    <>
      {isLoading ? (
        <View style={styles.container}>
          <Text style={styles.loading}>Loading</Text>
          <ActivityIndicator size="large"></ActivityIndicator>
        </View>
      ) : (
        <View style={styles.container}>
          <Text>Your Current Topic: {topicName.topic}</Text>
          <Countdown
            size={30}
            until={30}
            running={isClockRunning}
            onFinish={() => {
              handleFinish();
            }}
            timeToShow={["S"]}
          />
          <Text>Your current score is: {localScore}</Text>
          <View style={styles.textOne}>
            <Pressable
              style={{ backgroundColor: buttonBg0 }}
              onPress={() => handlePressOne()}
            >
              <Image
                style={styles.profilepicture}
                source={{
                  uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
                }}
              ></Image>
              <Text>{userNames[0]}</Text>
              <Text>{tweetData[0][1]}</Text>
            </Pressable>
          </View>

          <View style={styles.textTwo}>
            <Pressable
              style={{ backgroundColor: buttonBg1 }}
              onPress={() => handlePressTwo()}
            >
              <Image
                style={styles.profilepicture}
                source={{
                  uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
                }}
              ></Image>
              <Text>{userNames[1]}</Text>
              <Text>{tweetData[1][1]}</Text>
            </Pressable>
          </View>
          <View style={styles.textTwo}>
            <Pressable
              style={{
                backgroundColor: buttonBg2,
              }}
              onPress={() => handlePressThree()}
            >
              <Image
                style={styles.profilepicture}
                source={{
                  uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
                }}
              ></Image>
              <Text>{userNames[2]}</Text>
              <Text>{tweetData[2][1]}</Text>
            </Pressable>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
  },
  textOne: {
    marginTop: 16,
    borderWidth: StyleSheet.hairlineWidth,
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    width: 400,
  },
  textTwo: {
    marginTop: 16,
    borderWidth: StyleSheet.hairlineWidth,
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    width: 400,
  },
  profilepicture: {
    width: 50,
    height: 50,
  },
  loading: {
    alignItems: "center",
    justifyContent: "center",
  },
});
