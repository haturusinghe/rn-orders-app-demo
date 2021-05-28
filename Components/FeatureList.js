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

const featuresData = [
  {
    id: 1,
    icon: icons.order,
    color: COLORS.purple,
    backgroundColor: COLORS.lightpurple,
    description: "Place Order",
    screen: "SelectItems",
  },
  {
    id: 2,
    icon: icons.orders,
    color: COLORS.yellow,
    backgroundColor: COLORS.lightyellow,
    description: "View Orders",
    screen: "PlaceOrder",
  },
  {
    id: 3,
    icon: icons.shop,
    color: COLORS.primary,
    backgroundColor: COLORS.lightGreen,
    description: "View Items",
    screen: "CurrentOrder",
  },
  {
    id: 4,
    icon: icons.contact,
    color: COLORS.red,
    backgroundColor: COLORS.lightRed,
    description: "Contact Vendors",
    screen: "PlaceOrder",
  },
];

const FeatureList = ({ navigation }) => {
  const [features, setFeatures] = React.useState(featuresData);
  const Header = () => (
    <View style={{ marginBottom: 20, marginTop: 20, marginLeft: 8 }}>
      <Text
        style={{
          fontSize: 20,
          fontFamily: "sans-serif",
          textAlign: "left",
        }}
      >
        Options Menu
      </Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        marginBottom: SIZES.padding * 2,
        width: 100,
        alignItems: "center",
      }}
      onPress={() => navigation.navigate("Home", { screen: item.screen })}
    >
      <View
        style={{
          height: 100,
          width: 100,
          marginBottom: 5,
          borderRadius: 20,
          backgroundColor: item.backgroundColor,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={item.icon}
          resizeMode="contain"
          style={{
            height: 40,
            width: 40,
            tintColor: item.color,
          }}
        />
      </View>
      <Text style={{ textAlign: "center", flexWrap: "wrap", ...FONTS.body4 }}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      ListHeaderComponent={Header}
      data={features}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-around" }}
      keyExtractor={(item) => `${item.id}`}
      renderItem={renderItem}
      style={{ marginTop: 0, padding: 0, backgroundColor: "white" }}
    />
  );
};

export default FeatureList;

// const styles = StyleSheet.create({});
