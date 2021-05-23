import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { firebase } from "../firebase/firebaseConfig";

const HomeScreen = (props) => {
  const onLogoutPress = () => {
    console.log("Logout Pressed");
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log("Logout-Success");
      })
      .catch((error) => {
        // An error happened.
        alert(error);
      });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => onLogoutPress()}>
        <Text style={styles.buttonTitle}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#788eec",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
