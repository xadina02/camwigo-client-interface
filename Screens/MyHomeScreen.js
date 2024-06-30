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
import Logo from "../assets/CamWiGo_logo.png";
import ProfileIcon from "../assets/default_profile.png";
import dummyJourneys from "../dummy/journeys";
// import axios from 'axios'

const MyHomeScreen = () => {
  const [journeys, setJourneys] = useState([]);
//   const [activeTab, setActiveTab] = useState("Home");

  const handleSearch = async (searchParams) => {
    // Replace with your actual search endpoint
    const response = await axios.get("https://api.example.com/search", {
      params: searchParams,
    });
    setJourneys(response.data);
  };

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar backgroundColor="#070C35" />
        <View style={styles.backgroundDiv}>
          <View style={styles.another}>
            <View style={styles.header}>
              <View>
                <View style={styles.mainDiv}>
                  <Image source={Logo} style={styles.logo} />
                  <Text style={styles.headerText}>CamWiGo</Text>
                </View>
                <Text style={styles.headerSubText}>
                  No stress, travel easy..
                </Text>
              </View>
              <Image style={styles.profileIcon} source={ProfileIcon}></Image>
            </View>
            <View>
              <SearchForm onSearch={handleSearch} />
            </View>
          </View>
        </View>
        <View style={styles.container}>
          <Text style={styles.topic}>Recent popular journeys</Text>
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            {dummyJourneys.map((journey) => (
              <JourneyCard key={journey.id} journey={journey} />
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
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

export default MyHomeScreen;
