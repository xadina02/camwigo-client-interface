import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, BackHandler } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import FloatingBottomTab from "../components/FloatingBottomTab";
import TicketScreen from "./TicketScreen";
import MyHomeScreen from "./MyHomeScreen";
// import axios from 'axios'

const LandingScreen = ({ route }) => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("Home");

  useEffect(() => {
    if (route?.params?.myActiveTab) {
      setActiveTab(route.params.myActiveTab);
    }
  }, [route?.params]);

  console.log("The props value: " + route?.params?.myActiveTab);
  console.log("The effected value: " + activeTab);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (activeTab === "Ticket") {
          setActiveTab("Home");
          return true;
        }
        return false;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => backHandler.remove();
    }, [activeTab])
  );

  return (
    <>
      {activeTab === "Home" ? <MyHomeScreen /> : <TicketScreen />}
      <FloatingBottomTab activeTab={activeTab} onTabPress={setActiveTab} />
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    padding: 15,
  },
  placeholderText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
    color: "#666",
  },
  backgroundDiv: {
    height: "38%",
  },
  another: {
    height: "60%",
    backgroundColor: "#070C35",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 15,
  },
  header: {
    marginVertical: 10,
    marginTop: -7,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 3,
    color: "#f5f5f5",
    marginBottom: -5,
    // backgroundColor: "#0000ff"
  },
  headerSubText: {
    color: "#C7C7C7",
    marginLeft: 4,
  },
  topic: {
    fontSize: 20,
    fontWeight: "900",
  },
  mainDiv: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: 3,
  },
  logo: {
    width: 30,
    height: 30,
  },
  profileIcon: {
    width: 50,
    height: 50,
  },
  scrollView: {
    marginTop: 7,
    height: "51.2%",
  },
});

export default LandingScreen;
