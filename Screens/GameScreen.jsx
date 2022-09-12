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
  const [tweetData, setTweetData] = useState([]);
  const [right, setRight] = useState("");
  const userNames = ["@tweetdaddy20", "@Barry_1964", "@GoTLover_3099"];
  const [isPressedOne, setIsPressedOne] = useState(false);
  const [isPressedTwo, setIsPressedTwo] = useState(false);
  const [isPressedThree, setIsPressedThree] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(1);
  const { topicName } = route.params;
  const { aiPrompt } = route.params;

  async function showTiles(topic, aiPrompt) {
    let humanTweets = await showTweets(topic);
    let botTweets = await showAiTweet(aiPrompt);
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
      shuffleArray(data);
      setTweetData(data);

      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    });
  }, []);

  function handlePressOne() {
    setRight(tweetData[0][0]);
    setIsPressedOne((prevPressed) => {
      setIsPressedOne(!prevPressed);
    });
    if (isPressedTwo === true) {
      setIsPressedTwo(false);
    }
    if (isPressedThree === true) {
      setIsPressedThree(false);
    }
  }

  function handlePressTwo() {
    setRight(tweetData[1][0]);
    setIsPressedTwo((prevPressed) => {
      setIsPressedTwo(!prevPressed);
    });
    if (isPressedOne === true) {
      setIsPressedOne(false);
    }
    if (isPressedThree === true) {
      setIsPressedThree(false);
    }
  }

  function handlePressThree() {
    setRight(tweetData[2][0]);
    setIsPressedThree((prevPressed) => {
      setIsPressedThree(!prevPressed);
    });
    if (isPressedOne === true) {
      setIsPressedOne(false);
    }
    if (isPressedTwo === true) {
      setIsPressedTwo(false);
    }
  }

  const handleFinish = () => {
    Alert.alert("Game Over");
  };

  function handleScore() {
    let newScore = 5;
    setScore(newScore);
  }

  function confirmSelection() {
    if (right === "bot") {
      handleScore();
      navigation.navigate("Success", {
        score: { score },
      });
    } else {
      navigation.navigate("Failure");
    }
  }

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
            until={50}
            onFinish={() => {
              handleFinish();
            }}
            timeToShow={["S"]}
          />

          <View style={styles.textOne}>
            <Pressable
              style={{ backgroundColor: isPressedOne ? `#228b22` : "#61dafb" }}
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
              style={{ backgroundColor: isPressedTwo ? `#228b22` : "#61dafb" }}
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
                backgroundColor: isPressedThree ? `#228b22` : "#61dafb",
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
          <Button
            title="Confirm"
            onPress={() => confirmSelection({ navigation })}
          ></Button>
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
    // paddingVertical: 8,
    borderWidth: StyleSheet.hairlineWidth,
    // backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    width: 400,
  },
  textTwo: {
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
  profilepicture: {
    width: 50,
    height: 50,
  },
  loading: {
    alignItems: "center",
    justifyContent: "center",
  },
});
