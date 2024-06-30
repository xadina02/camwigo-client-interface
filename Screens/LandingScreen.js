import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  ScrollView,
  View,
  StyleSheet,
  StatusBar,
} from "react-native";
import SearchForm from "../components/SearchForm";
import JourneyCard from "../components/JourneyCard";
import FloatingBottomTab from "../components/FloatingBottomTab";
import Logo from "../assets/CamWiGo_logo.png";
import ProfileIcon from "../assets/default_profile.png";
import dummyJourneys from "../dummy/journeys";
import TicketScreen from "./TicketScreen";
import MyHomeScreen from "./MyHomeScreen";
// import axios from 'axios'

const LandingScreen = () => {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <>
      {activeTab === "Home" ? (
        <MyHomeScreen />
      ) : (
        <TicketScreen />
      )}
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
