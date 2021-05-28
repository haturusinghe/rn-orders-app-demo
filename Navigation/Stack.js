import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useState, useEffect } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";

import HomeDrawer from "./Drawer";
import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";

import { firebase } from "../firebase/firebaseConfig";

const Stack = createStackNavigator();

const StackNav = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    console.log("Running useEffect Stack Page");
    if (!isChecked) {
      setChecked(true);
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          // User is signed in.
          console.log("checking sign-in");
          setIsSignedIn(true);
          setLoading(false);
        } else {
          // No user is signed in.
          setIsSignedIn(false);
          setLoading(false);
          console.log("Not Logged-In");
        }
      });
    }
    return () => {
      console.log("Cleaning Up! Stack Page");
      setChecked(false);
      setLoading(false);
    };
  }, []);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }
  return (
    <Stack.Navigator>
      {isSignedIn ? (
        // We haven't finished checking for the token yet
        <Stack.Screen
          name="HomeDrawer"
          component={HomeDrawer}
          options={{ headerShown: false }}
        />
      ) : (
        // User is signed in
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegistrationScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

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
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default StackNav;
