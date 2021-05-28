import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "../screens/HomeScreen";
import LoginYo from "../screens/LoginScreen";

const DrawerNav = createDrawerNavigator();

const TempScreen = () => {
  return (
    <View>
      <Text>Oops!!!</Text>
      <Text>Oops!!!</Text>
      <Text>Oops!!!</Text>
      <Text>Oops!!!</Text>
    </View>
  );
};

const Drawer = () => {
  return (
    <DrawerNav.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={TempScreen} />
    </DrawerNav.Navigator>
  );
};

export default Drawer;
