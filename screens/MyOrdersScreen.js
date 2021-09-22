import React, { useEffect } from "react";
import { StyleSheet, Text, View, TextInput, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { db, firebase } from "../firebase/firebaseConfig";
const MyOrdersScreen = () => {
  const [orders, setOrders] = React.useState([{ id: 1, name: "test" }]);

  useEffect(() => {
    let user = firebase.auth().currentUser;
    console.log("Running useEffect on MyOrders");
    let firstSet = db
      .collection("users")
      .doc(user.uid)
      .collection("orders")
      .orderBy("createdAt")
      .limit(10);

    firstSet
      .get()
      .then((documentSnapshots) => {
        var lastVisible =
          documentSnapshots.docs[documentSnapshots.docs.length - 1];
        documentSnapshots.forEach((doc) => {});
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      console.log("cleaning after useEffect on MyOrders");
    };
  }, []);

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

  const renderListItem = ({ item }) => {
    let currVal = item.qty;
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
            {item.name}
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
            }}
          ></View>
        </View>
        <View>
          <Text>Unit Price:</Text>
          <Text
            style={{
              color: "green",
              width: 200,
              fontFamily: "sans-serif",
              paddingLeft: 15,
              fontSize: 14,
            }}
          >
            Total Price:
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ backgroundColor: "white" }}>
        <Header title={"My Orders"} />

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
            placeholder="Search Orders ..."
            onChangeText={(text) => console.log(text)}
            underlineColorAndroid="transparent"
            style={{ width: "100%" }}
          />
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          data={orders}
          renderItem={renderListItem}
          keyExtractor={(item) => item.id}
          initialNumToRender={10}
          style={{
            backgroundColor: "#212121",
            borderRadius: 10,
            marginTop: 10,
          }}
        />
      </View>
    </View>
  );
};

export default MyOrdersScreen;
