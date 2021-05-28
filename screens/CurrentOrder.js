import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import IconAnt from "react-native-vector-icons/AntDesign";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from "react-native";
import { COLORS, SIZES, FONTS, icons, images } from "../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { ScrollView } from "react-native-gesture-handler";

const selectedProductList = [
  {
    id: "1",
    itemName: "Levothyroxine Sodium",
    unitPrice: 115.91,
    qty: 1,
  },
  {
    id: "2",
    itemName: "Hydrocodone Bitartrate and Acetaminophen",
    unitPrice: 140.75,
    qty: 1,
  },
  {
    id: "3",
    itemName: "bupivacaine hydrochloride",
    unitPrice: 120.21,
    qty: 1,
  },
];

const CurrentOrder = () => {
  const [selectedProducts, setSelectedProducts] = React.useState(
    selectedProductList
  );

  const separator = () => <View style={styles.line} />;

  const changeQty = ({ tag, item }) => {
    if (tag === "add") {
      let newList = selectedProducts.map((product) => {
        if (product.id === item.id) {
          product.qty = product.qty + 1;
        }
        return product;
      });
      setSelectedProducts(newList);
    } else if (tag === "sub") {
      let newList = selectedProducts.map((product) => {
        if (product.id === item.id) {
          product.qty = product.qty > 1 ? product.qty - 1 : 1;
        }
        return product;
      });
      setSelectedProducts(newList);
    } else {
      let number = parseInt(tag);
      let newList = selectedProducts.map((product) => {
        if (product.id === item.id) {
          if (isNaN(number)) {
            product.qty = 1;
          } else if (number < 1) {
            product.qty = 1;
          } else {
            product.qty = number;
          }
        }
        return product;
      });
      setSelectedProducts(newList);
    }

    console.log(selectedProducts);
  };

  const renderListItem = ({ item }) => {
    let currVal = item.qty;
    console.log(item.id, currVal);
    return (
      <View
        style={{
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flex: 1,
          paddingVertical: 10,
          backgroundColor: "white",
          margin: 10,
          borderRadius: 15,
        }}
      >
        <IconAnt
          style={{
            padding: 8,
            position: "absolute",
            bottom: -10,
            right: -8,
            backgroundColor: "red",
            borderRadius: 20,
            zIndex: 100,
          }}
          name="delete"
          size={10}
          color="white"
        />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: "black",
              width: 200,
              fontFamily: "sans-serif-light",
              paddingLeft: 15,
              fontSize: 15,
            }}
          >
            {item.itemName}
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
            }}
          >
            <IconAnt
              style={{
                padding: 0,
                backgroundColor: "white",
                flex: 1 / 3,
                textAlign: "center",
              }}
              name="minuscircle"
              size={20}
              color="#000"
              onPress={() => changeQty({ tag: "sub", item: item })}
            />

            <TextInput
              style={{
                backgroundColor: "white",
                paddingHorizontal: 5,
                textAlign: "center",
                flex: 1 / 3,
              }}
              value={currVal.toString()}
              keyboardType={"number-pad"}
              onChangeText={(text) => changeQty({ tag: text, item: item })}
            />

            <IconAnt
              style={{
                padding: 0,
                backgroundColor: "white",
                flex: 1 / 3,
                textAlign: "center",
              }}
              name="pluscircle"
              size={20}
              color="#000"
              onPress={() => changeQty({ tag: "add", item: item })}
            />
          </View>
        </View>
        <View>
          <Text style={[styles.lightText, { fontFamily: "sans-serif" }]}>
            Unit Price: {item.unitPrice}
          </Text>
          <Text
            style={{
              color: "green",
              width: 200,
              fontFamily: "sans-serif",
              paddingLeft: 15,
              fontSize: 14,
            }}
          >
            Total Price: {item.unitPrice * item.qty}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ backgroundColor: "white" }}>
        <Header title={"Select Quantity"} />

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Icon
            style={{ padding: 8 }}
            name="ios-search"
            size={20}
            color="#000"
          />
          <TextInput
            placeholder="Search Products ..."
            underlineColorAndroid="transparent"
            style={{ width: "100%" }}
          />
        </View>
      </View>

      <View>
        <FlatList
          data={selectedProducts}
          renderItem={renderListItem}
          keyExtractor={(item) => item.id}
          initialNumToRender={10}
          style={{
            backgroundColor: "#212121",
            borderRadius: 10,
            marginTop: 10,
            paddingVertical: 10,
          }}
        />
      </View>
    </View>
  );
};

export default CurrentOrder;

const Header = ({ title }) => (
  <View
    style={{
      marginTop: 20,
      marginLeft: 8,
      backgroundColor: "white",
    }}
  >
    <Text
      style={{
        fontSize: 20,
        fontFamily: "sans-serif",
        textAlign: "left",
      }}
    >
      {title}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 8,
    backgroundColor: "white",
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  list: {
    paddingVertical: 20,
    margin: 3,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 10,
    zIndex: -1,
  },
  lightText: {
    color: "black",
    width: 200,
    fontFamily: "sans-serif-light",
    paddingLeft: 15,
    fontSize: 12,
  },
  line: {},
  icon: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    bottom: 20,
    right: 0,
    zIndex: 1,
    backgroundColor: "white",
    borderRadius: 50,
    borderColor: "black",
    borderWidth: 1,
  },
  numberBox: {
    position: "absolute",
    bottom: 75,
    width: 30,
    height: 30,
    borderRadius: 15,
    left: 330,
    zIndex: 3,
    backgroundColor: "#e3e3e3",
    justifyContent: "center",
    alignItems: "center",
  },
  number: { fontSize: 14, color: "#000" },
  selected: { backgroundColor: "#FA7B5F" },
  searchSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "white",
    color: "#424242",
  },
});
