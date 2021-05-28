import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { firebase } from "../firebase/firebaseConfig";

import FeatureList from "../Components/FeatureList";
import OrdersScreen from "../screens/OrdersScreen";
import SelectItems from "./SelectItemsScreen";
import CurrentOrder from "../screens/CurrentOrder";
import Header from "../Components/Header";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [profile, setProfile] = useState("");

  useEffect(() => {
    console.log("Running UseEffect in Homepage");

    try {
      let user = firebase.auth().currentUser;
      if (user) {
        setProfile(user.displayName);
        /*var docRef = db.collection("users").doc(user.uid);

        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              setProfile(doc.data());
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });*/
      } else {
        console.log("No results found!");
      }
    } catch (error) {
      alert(error);
    }

    return () => {
      console.log("Cleaning up Homepage");
      setProfile({});
    };
  }, []);

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
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Header
          logout={onLogoutPress}
          navigation={navigation}
          profileName={profile}
        />
      </View>
      <Stack.Navigator>
        <Stack.Screen
          name="Features"
          component={FeatureList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PlaceOrder"
          component={OrdersScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="SelectItems"
          component={SelectItems}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CurrentOrder"
          component={CurrentOrder}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 8,
    paddingTop: 18,
  },
  headerContainer: {
    marginLeft: 8,
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
