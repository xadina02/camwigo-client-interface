import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import useGetTravelJourneys from "../utils/useGetTravelJourney";
import DateFilterCard from "../components/DateFilterCard";
import JourneyCard from "../components/JourneyCard";
import BackArrow from "../assets/arrow-circle-left.png";
import { useNavigation } from "@react-navigation/native";

const ListScreen = ({ route }) => {
  const navigation = useNavigation();
  const { searchParams } = route.params;
  const {
    origin,
    destination,
    journey_date,
    date,
    dates,
    route_schedule,
    time,
  } = searchParams;
  const [loading, setLoading] = useState(true);
  const [journeys, setJourneys] = useState([]);
  const [selectedDate, setSelectedDate] = useState(journey_date);
  const [labelDate, setLabelDate] = useState(date);
  const appToken = "sekurity$227";
  const { allTravelJourneys: travelJourneys } = useGetTravelJourneys(
    route_schedule,
    selectedDate,
    appToken
  );

  const handleDateChange = (newDate) => {
    const formattedDate = newDate.split("T")[0];
    setSelectedDate(formattedDate);

    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const dateObject = new Date(newDate);
    const formattedDisplayDate = new Intl.DateTimeFormat(
      "en-US",
      options
    ).format(dateObject);
    setLabelDate(formattedDisplayDate);
  };

  useEffect(() => {
    setLoading(true);
    try {
      setJourneys(travelJourneys);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [selectedDate, travelJourneys]);

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const formattedTime = formatTime(time);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#070C35" />
      <View style={styles.backgroundDiv}>
        <TouchableOpacity
          style={styles.backArrowContainer}
          onPress={() => navigation.goBack()}
        >
          <Image source={BackArrow} style={styles.backArrow} />
        </TouchableOpacity>
        <Text style={styles.header}>
          {origin} - {destination}
        </Text>
        <Text style={styles.headerSubText}>
          {labelDate} | {formattedTime}
        </Text>
      </View>
      <DateFilterCard
        dates={dates}
        chosenDate={journey_date}
        onDateChange={handleDateChange}
      />
      <View style={styles.container}>
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
              <View style={styles.separator} key={journey.id}>
                <JourneyCard key={journey.id} journey={journey} />
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  backgroundDiv: {
    height: "7%",
    backgroundColor: "#070C35",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  backArrowContainer: {
    position: "absolute",
    left: 15,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  backArrow: {
    width: 30,
    height: 30,
    tintColor: "#CDD2F8",
  },
  header: {
    textAlign: "center",
    color: "#CDD2F8",
    fontSize: 25,
    fontWeight: "900",
  },
  headerSubText: {
    textAlign: "center",
    color: "#C7C7C7",
    marginLeft: 4,
  },
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  separator: {
    marginBottom: 4,
  },
  scrollView: {
    marginTop: 4,
    height: "81.5%",
  },
  topic: {
    fontSize: 25,
    fontWeight: "900",
    color: "#A6A6A6",
    textAlign: "center",
    marginTop: 200,
  },
  loader: {
    marginTop: "40%",
  },
});

export default ListScreen;
