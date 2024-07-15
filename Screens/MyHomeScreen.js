import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  ScrollView,
  View,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import SearchForm from "../components/SearchForm";
import JourneyCard from "../components/JourneyCard";
import Logo from "../assets/CamWiGo_logo.png";
import ProfileIcon from "../assets/default_profile.png";
import { useNavigation } from "@react-navigation/native";
import useGetTopTravelJourneys from "../utils/useGetTopTravelJourney";

const MyHomeScreen = () => {
  const navigation = useNavigation();
  const [journeys, setJourneys] = useState([]);
  const appToken = "sekurity$227";
  const { allTopTravelJourneys: topTravelJourneys, loading: loading } =
    useGetTopTravelJourneys(appToken);

  useEffect(() => {
    try {
      setJourneys(topTravelJourneys);
    } catch (error) {
      // Do something
    }
  }, [topTravelJourneys]);

  // console.log('The journeys here: ', journeys);

  const handleSearch = async (searchParams) => {
    navigation.navigate("ListScreen", {
      searchParams,
    });
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
          <Text style={styles.topic}>Today's Top Travel Journeys</Text>
          {loading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator
                size="large"
                color="#070C35"
                style={styles.loader}
              />
            </View>
          ) : (
            <ScrollView
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
            >
              {journeys.map((journey) => (
              <JourneyCard key={journey.id} journey={journey} />
            ))}
            </ScrollView>
          )}
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
    height: "36%",
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
    borderRadius: 25,
  },
  scrollView: {
    marginTop: 3,
    height: "53.8%",
  },
  loader: {
    marginTop: "40%",
  },
});

export default MyHomeScreen;
