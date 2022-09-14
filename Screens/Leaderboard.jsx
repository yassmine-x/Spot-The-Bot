import { Text, View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { NavigationContainer, navigation } from "@react-navigation/native";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../Core/config";
import { DataTable } from "react-native-paper";

export default function GetLeaderboard() {
  const leaderboardData = [];
  const [table, setTable] = useState([]);
  async function retrieveData() {
    try {
      const querySnapshot = await getDocs(collection(db, "Scores"));
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        leaderboardData.push(doc.data());
      });
    } catch (err) {
      console.log("Error getting documents", err);
    }
  }

  async function showLeaderboard() {
    await retrieveData();
    return (
      <View>
        {leaderboardData.map(({ username, highScore }) => {
          return (
            <View style={styles.container}>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>
                    <Text>Username</Text>
                  </DataTable.Title>
                  <DataTable.Title>
                    <Text>HighScore</Text>
                  </DataTable.Title>
                </DataTable.Header>

                <DataTable.Row>
                  <DataTable.Cell>
                    <Text>{username}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <Text>{highScore}</Text>
                  </DataTable.Cell>
                </DataTable.Row>
              </DataTable>
            </View>
          );
        })}
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
      <Text>Leaderboard</Text>
      <View>
        <Text>{table}</Text>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingHorizontal: 30,
  },
});
