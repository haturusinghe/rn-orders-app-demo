import React, { useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import IconAnt from "react-native-vector-icons/AntDesign";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import { COLORS, SIZES, FONTS, icons, images } from "../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { ScrollView } from "react-native-gesture-handler";
import { db } from "../firebase/firebaseConfig";

const productList = [
  {
    id: "1",
    itemName: "Levothyroxine Sodium",
    unitPrice: 115.91,
    icon: icons.orders,
    selected: false,
  },
  {
    id: "2",
    itemName: "Hydrocodone Bitartrate and Acetaminophen",
    unitPrice: 140.75,
    icon: icons.orders,
    selected: false,
  },
  {
    id: "3",
    itemName: "bupivacaine hydrochloride",
    unitPrice: 120.21,
    icon: icons.orders,
    selected: false,
  },
  {
    id: "4",
    itemName: "Balsalazide Disodium",
    unitPrice: 54.88,
    icon: icons.orders,
    selected: false,
  },
  {
    id: "5",
    itemName: "Spleen,",
    unitPrice: 71.62,
    icon: icons.orders,
    selected: false,
  },
  {
    id: "6",
    itemName: "ketorolac tromethamine",
    unitPrice: 99.23,
    icon: icons.orders,
    selected: false,
  },
  {
    id: "7",
    itemName: "Salicylic Acid",
    unitPrice: 127.38,
    icon: icons.orders,
    selected: false,
  },
  {
    id: "8",
    itemName: "adenosine",
    unitPrice: 88.42,
    icon: icons.orders,
    selected: false,
  },
  {
    id: "9",
    itemName: "Desoximetasone",
    unitPrice: 73.2,
    icon: icons.orders,
    selected: false,
  },
  {
    id: "10",
    itemName: "SODIUM FLUORIDE",
    unitPrice: 12.42,
    icon: icons.orders,
    selected: false,
  },
];

const countInit = { count: 0 };

const SelectItemsScreen = ({ navigation }) => {
  const [products, setProducts] = React.useState([]);
  const [selectedProducts, setSelectedProducts] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const [searchText, setSearchText] = React.useState("");

  useEffect(() => {
    console.log("Rendering Items Page");
    let recivedItems = [];

    db.collection("items")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          let docId = doc.id;
          let { icon, itemName, selected, unitPrice } = doc.data();
          // console.log(doc.id, " => ", doc.data());
          console.log({ id: docId, icon, itemName, selected, unitPrice });
          recivedItems.push({ id: docId, icon, itemName, selected, unitPrice });
        });
        setProducts(recivedItems);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    return () => {
      console.log("Cleaning Items Page");
      setSelectedProducts([]);
      products.map((product) => (product.selected = false));
    };
  }, []);

  //Filters item list when user enters text in Search Bar
  const handleInputChange = (text) => {
    if (text === "") {
      setProducts(productList);
    } else {
      let newData = productList.filter((item) =>
        item.itemName.toLowerCase().includes(text.toLowerCase())
      );
      setProducts(newData);
    }
  };

  //Handles when user clicks on an item on the Flatlist and adds it to selected list
  //Removes it from the selected list when its clicked on again
  const handleItemSelect = (item) => {
    let { id, itemName, unitPrice } = item;
    let newItem = { id: id, itemName: itemName, unitPrice, qty: 1 };

    if (selectedProducts.find((product) => product.id === id)) {
      //Removes the item from the Selected List if it already is in it
      let newArray = selectedProducts.filter((product) => {
        if (product.id != id) {
          return product;
        }
      });
      setSelectedProducts(newArray);
      let newCount = count - 1;
      setCount(newCount);
    } else {
      //Adds the item to the Selected List
      let newArray = selectedProducts;
      newArray.push(newItem);
      setSelectedProducts(newArray);
      let newCount = count + 1;
      setCount(newCount);
    }

    //This function sets the selected status for the current item
    setProducts(
      products.map((product) => {
        if (product.id === item.id && product.itemName == item.itemName) {
          product.selected = !product.selected;
          return product;
        } else {
          return product;
        }
      })
    );
    // console.log(selectedProducts);
  };

  //Confirmation Dialog box
  const confirmation = () => {
    if (selectedProducts.length > 0) {
      Alert.alert(
        "Proceed to Checkout ?",
        `You have selected ${count} items.\nDo you want to proceed ?`,
        [
          {
            text: "NO",
            onPress: () => console.log("No Pressed"),
            style: "cancel",
          },
          { text: "YES", onPress: () => checkoutProceed() },
        ]
      );
    } else {
      Alert.alert(
        "Please select atleast 1 item",
        `You have selected ${0} items.\nSelect items to proceed`,
        [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
            style: "cancel",
          },
        ]
      );
    }
  };

  const checkoutProceed = () => {
    if (selectedProducts.length > 0) {
      console.log(selectedProducts);
      navigation.navigate("Home", {
        screen: "CurrentOrder",
        params: { selectedProducts: selectedProducts },
      });
    } else {
      alert("You have not selected any Items");
    }
  };

  //Flat List header component
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

  //Flat List Footer component
  const Footer = ({ title }) => (
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

  const headerWithSearch = (props) => (
    <View>
      <Text>Header with Search</Text>
    </View>
  );

  //Function to render each flatlist item
  const renderItem = ({ item }) => {
    //Sets background color accordingly if item is in the selected list or not
    let styleVar = item.selected
      ? { backgroundColor: "#79B101" }
      : { backgroundColor: "white" };

    const headerTextStyle = {
      color: "black",
      width: 200,
      fontFamily: "sans-serif-light",
      paddingLeft: 15,
      fontSize: 12,
    };

    return (
      <TouchableOpacity
        style={[
          {
            paddingVertical: 20,
            margin: 3,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            borderRadius: 10,
            zIndex: -1,
          },
          styleVar,
        ]}
        onPress={() => handleItemSelect(item)}
      >
        <Image
          source={{ uri: item.icon }}
          resizeMode="contain"
          style={{
            height: 40,
            width: 40,
            marginLeft: 10,
            tintColor: "black",
          }}
        />

        <Text style={headerTextStyle}>{item.itemName}</Text>
        <Text style={[headerTextStyle, { fontFamily: "sans-serif" }]}>
          {item.unitPrice}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ backgroundColor: "white" }}>
        <Header title={"Select Items"} />

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
            onChangeText={(text) => handleInputChange(text)}
            underlineColorAndroid="transparent"
            style={{ width: "100%" }}
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={() => confirmation()}
        style={{
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
        }}
      >
        <View
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            backgroundColor: "#1A1A1A",
            height: 30,
            width: 30,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 50,
          }}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "sans-serif-light",
            }}
          >
            {count}
          </Text>
        </View>
        <Image
          source={icons.checkout}
          resizeMode="contain"
          style={{
            height: 40,
            width: 40,
            tintColor: "black",
            margin: 10,
          }}
        />
      </TouchableOpacity>

      <View>
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
          initialNumToRender={10}
          style={{ backgroundColor: "white" }}
        />
      </View>
    </View>
  );
};

const separator = () => (
  <View
    style={{
      paddingVertical: 20,
      margin: 3,
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      borderRadius: 10,
      zIndex: -1,
    }}
  />
);

export default SelectItemsScreen;

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
