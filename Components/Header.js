import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { COLORS, SIZES, FONTS, icons, images } from "../constants";

const Header = ({ profileName, navigation }) => {
  return (
    <View
      style={{
        flexDirection: "row-reverse",
        marginVertical: 10,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 20, fontFamily: "sans-serif-light" }}>
          Welcome
        </Text>
        <Text
          style={{
            color: COLORS.gray,
            fontSize: 18,
            marginTop: 5,
            fontFamily: "sans-serif-light",
          }}
        >
          {profileName}
        </Text>
      </View>

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginRight: 10,
        }}
      >
        <TouchableOpacity
          style={{
            height: 40,
            width: 40,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
          }}
          onPress={() => navigation.toggleDrawer()}
        >
          <Image
            source={icons.hamburgerMenu}
            style={{
              width: 40,
              height: 40,
              tintColor: "black",
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
