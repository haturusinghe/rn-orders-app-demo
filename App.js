import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import RegistrationScreen from "./screens/RegistrationScreen";
import LoginScreen from "./screens/LoginScreen";
import { firebase } from "./firebase/firebaseConfig";
import { useState, useEffect } from "react";

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userState, setUserState] = useState(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        setIsSignedIn(true);
        setUserState(user);
        console.log(`Signed In: ${userState.email} : ${isSignedIn}`);
        /*firebase
          .auth()
          .signOut()
          .then(() => {
            console.log("Signout out");
          })
          .catch((error) => {
            alert(error);
          });*/
      } else {
        // No user is signed in.
        console.log("Not Logged-In");
      }
    });
  }, []);

  return <LoginScreen />;
}

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
});
