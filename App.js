import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Button,
} from "react-native";
import { useState, useEffect } from "react";

import RegistrationScreen from "./screens/RegistrationScreen";
import LoginScreen from "./screens/LoginScreen";
import HomePage from "./screens/HomeScreen";
import MainNavigator from "./Navigation/MainNav";

import { firebase } from "./firebase/firebaseConfig";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const logout = () => {
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

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {/*<DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      />*/}
      <DrawerItem label="Sign Out" onPress={() => logout()} />
    </DrawerContentScrollView>
  );
}

function HomeScreen() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomePage} />
    </Drawer.Navigator>
  );
}

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    console.log("Running useEffect App Page");
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
      console.log("Cleaning Up! Apppage");
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
    <NavigationContainer>
      <Stack.Navigator>
        {isSignedIn ? (
          // We haven't finished checking for the token yet
          <Stack.Screen
            name="Home"
            component={HomeScreen}
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
    </NavigationContainer>
  );
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
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
