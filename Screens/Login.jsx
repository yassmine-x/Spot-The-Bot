import {
  Text,
  View,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Animatable from "react-native-animatable";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../Core/config";
import { NavigationContainer, navigation } from "@react-navigation/native";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../Core/config";
export default Login = ({ navigation, username, setUsername }) => {
  const robotTaglines = [
    "I spy with my little eye, a robot hidden among the people.",
    "The aim of the game is to find the robot hidden amongst a group of people.",
    "The goal of the game Spot The Bot is to find the robot hidden in a group of people.",
    "The game Spot The Bot is all about finding the robot hidden in a group of people.",
    "The game Spot The Bot is a fun game that requires you to figure out who is the robot.",
    "The robot is the one who isn't laughing at all the hilarious jokes told during the game.",
  ];
  const pulseDuration = 7000;
  const btnDuration = 5000;
  let tagInd = 1 + Math.floor(Math.random() * robotTaglines.length - 1);
  const [tag, setTag] = useState("");
  function setTagLine() {
    setTag(robotTaglines[tagInd]);
  }
  useEffect(() => {
    setTagLine();
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [clickedRegister, setClickedRegister] = useState(false);
  const [clickedLogin, setClickedLogin] = useState(false);
  const handleSignUp = () => {
    setClickedLogin(false);
    setClickedRegister(true);
    if (username) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          const uid = userCredentials.user.uid;
          const userData = {
            id: uid,
            email,
            username,
            createdAt: new Date().toISOString(),
          };
          const scoresData = {
            id: uid,
            createdAt: new Date().toISOString(),
            highScore: 0,
            userName: username,
          };
          async function get(db) {
            const userRef = collection(db, "Users");
            const usersRef = doc(db, "Users", username);
            await setDoc(usersRef, userData);
            const userdocs = await getDocs(userRef);
            console.log(userdocs.docs.map((doc) => doc.data()));
            const scoresRef = doc(db, "Scores", username);
            await setDoc(scoresRef, scoresData);
          }
          get(db);
          setIsSignedIn(true);
          navigation.navigate("HomeFeed");
          return userCredentials;
        })
        .catch((error) => {
          console.log(error.message);
          alert(error.message);
          throw error;
        });
    }
  };
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setIsSignedIn(false);
        console.log("User signed out");
      })
      .catch((error) => {
        alert(error.message);
        throw error;
      });
  };
  const handleLogin = () => {
    setClickedRegister(false);
    setClickedLogin(true);
    if (email.length > 0) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          const usersRef = collection(db, "Users");
          const q = query(usersRef, where("email", "==", email));
          async function getUsername() {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              setUsername(doc.id);
            });
          }
          getUsername();
          const user = userCredentials.user;
          console.log("Logged in with", email);
          setIsSignedIn(true);
          navigation.navigate("HomeFeed");
          return userCredentials;
        })
        .catch((error) => {
          console.log(error.message);
          alert(error.message);
          throw error;
        });
    }
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#00FFFF",
      }}
    >
      <Text style={styles.title}>Spot The Bot</Text>
      <Animatable.Text
        animation="pulse"
        easing="ease-out"
        duration={pulseDuration}
        iterationCount="infinite"
        style={styles.tag}
      >
        <Text>{tag}</Text>
      </Animatable.Text>
      <KeyboardAvoidingView style={styles.Container} behaviour="padding">
        <View styles={styles.inputContainer}>
          {clickedRegister ? (
            <>
              <TextInput
                style={styles.textInput}
                onChangeText={(text) => setUsername(text)}
                placeholder="Username"
              />
              <TextInput
                placeholder="Email"
                value={email}
                onChange={(text) => setEmail(text.nativeEvent.text)}
                style={styles.input}
              />
              <TextInput
                placeholder="Password"
                value={password}
                onChange={(text) => setPassword(text.nativeEvent.text)}
                style={styles.input}
                secureTextEntry
              />
            </>
          ) : null}
          {clickedLogin ? (
            <>
              <TextInput
                placeholder="Email"
                value={email}
                onChange={(text) => setEmail(text.nativeEvent.text)}
                style={styles.input}
              />
              <TextInput
                placeholder="Password"
                value={password}
                onChange={(text) => setPassword(text.nativeEvent.text)}
                style={styles.input}
                secureTextEntry
              />
            </>
          ) : null}
        </View>
        <View style={styles.buttonContainer}>
          {isSignedIn === false ? (
            <Animatable.View animation="bounceInLeft" duration={btnDuration}>
              <TouchableOpacity
                onPress={handleLogin}
                style={[styles.button, styles.buttonOutline]}
              >
                <Text style={styles.text}>Login</Text>
              </TouchableOpacity>
            </Animatable.View>
          ) : (
            <TouchableOpacity
              onPress={handleSignOut}
              style={[styles.button, styles.buttonOutline]}
            >
              <Text style={styles.text}>Sign out</Text>
            </TouchableOpacity>
          )}
          <Animatable.View animation="bounceInRight" duration={btnDuration}>
            <TouchableOpacity
              onPress={handleSignUp}
              style={[styles.button, styles.buttonOutline]}
            >
              <Text style={styles.text}>Register</Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 80,
    fontFamily: "DotGothic16_400Regular",
    bottom: 100,
  },
  tag: {
    fontSize: 15,
    fontFamily: "DotGothic16_400Regular",
    bottom: 80,
    width: 300,
    alignItems: "center",
  },
  button: {
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: `#6495ed`,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontFamily: "DotGothic16_400Regular",
    letterSpacing: 0.25,
    color: "white",
  },
});
