import { useState, useEffect } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  Alert,
  Image,
  ActivityIndicator,
  TouchableHighlight,
  Pressable,
} from "react-native";
import Countdown from "react-native-countdown-component";
import showTweets from "../Twitterapi";

export default GameStart = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [tweetData, setTweetData] = useState([]);
  const userNames = ["@tweetdaddy20", "@Barry_1964"];
  const [isPressedOne, setIsPressedOne] = useState(false);
  const [isPressedTwo, setIsPressedTwo] = useState(false);

  useEffect(() => {
    showTweets("metal").then((data) => {
      setTweetData(data);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    });
  }, []);

  function handlePressOne(event) {
    setIsPressedOne((prevPressed) => {
      setIsPressedOne(!prevPressed);
    });
    if (isPressedTwo === true) {
      setIsPressedTwo(false);
    }
  }

  function handlePressTwo(event) {
    setIsPressedTwo((prevPressed) => {
      setIsPressedTwo(!prevPressed);
    });
    if (isPressedOne === true) {
      setIsPressedOne(false);
    }
  }

  const handleFinish = () => {
    Alert.alert("Game Over");
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
