import { Text, View, StyleSheet, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { NavigationContainer, navigation } from "@react-navigation/native";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../Core/config";
import { DataTable } from "react-native-paper";

export default function GetLeaderboard({ navigation }) {
  const leaderboardData = [];
  let filteredLeaderboardData = [];
  const [table, setTable] = useState([]);
  async function retrieveData() {
    try {
      const querySnapshot = await getDocs(collection(db, "Scores"));

      querySnapshot.forEach((doc) => {
        leaderboardData.push(doc.data());
      });
      leaderboardData.sort((a, b) => {
        return b.highScore - a.highScore;
      });
      filteredLeaderboardData = leaderboardData.filter((data) => {
        return data.highScore !== 0;
      });

      console.log(filteredLeaderboardData);
    } catch (err) {
      console.log("Error getting documents", err);
    }
  }

  async function showLeaderboard() {
    await retrieveData();

    return (
      <View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>
              <Text style={styles.headerleft}>Username </Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={styles.headerright}> HighScore </Text>
            </DataTable.Title>
          </DataTable.Header>
          {filteredLeaderboardData.map(({ userName, highScore, id }) => {
            return (
              <View style={styles.rows} key={id}>
                <DataTable.Row>
                  <DataTable.Cell style={styles.cellone}>
                    <Text>{userName}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.celltwo}>
                    <Text>{highScore}</Text>
                  </DataTable.Cell>
                </DataTable.Row>
              </View>
            );
          })}
        </DataTable>
      </View>
    );
  }

  useEffect(() => {
    showLeaderboard().then((data) => {
      setTable(data);
    });
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Leaderboard</Text>
        <View style={styles.table}>
          <Text>{table}</Text>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("HomeFeed")}
          >
            <Text style={styles.text}>Home</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#00ffff",
    padding: 15,
  },
  headerleft: {
    fontSize: 23,
    fontFamily: "DotGothic16_400Regular",
  },
  table: {
    top: 20,
    alignItems: "center",
  },
  headerright: {
    fontSize: 23,
    fontFamily: "DotGothic16_400Regular",
  },
  title: {
    fontSize: 40,
    fontFamily: "DotGothic16_400Regular",
    top: 10,
  },
  rows: {
    backgroundColor: "steelblue",
    textAlign: "center",
  },
  cellone: {
    backgroundColor: "skyblue",
    borderRadius: 10,
  },
  celltwo: {
    backgroundColor: "white",
    borderRadius: 10,
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
});
