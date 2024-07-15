import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import TicketCard from "../components/TicketCard";
import useGetTickets from "../utils/useGetTicket";

export default TicketScreen = () => {
  const [tickets, setTickets] = useState([]);
  const appToken = "sekurity$227";
  const { allTickets: allTickets, loading: loading } = useGetTickets(appToken);

  useEffect(() => {
    try {
      setTickets(allTickets);
    } catch (error) {
      // Do something
    }
  }, [allTickets]);

  // console.log('The tickets here: ', tickets);

  return (
    <>
      <SafeAreaView
        style={styles.safeArea}
        onRequestClose={() => setActiveTab("Ticket")}
      >
        <StatusBar backgroundColor="#070C35" />
        <View style={styles.backgroundDiv}>
          <Text style={styles.header}>Your Ticket History</Text>
        </View>
        <View style={styles.container}>
          {loading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator
                size="large"
                color="#070C35"
                style={styles.loader}
              />
            </View>
          ) : tickets ? (
            <ScrollView
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
            >
              {tickets.map((ticket) => (
                // <View style={styles.separator} key={journey.id}>
                <TicketCard
                  key={ticket.id}
                  journey={ticket}
                />
                // </View>
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.topic}>No available tickets</Text>
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
  backgroundDiv: {
    height: "10%",
    backgroundColor: "#070C35",
  },
  header: {
    textAlign: "center",
    color: "#CDD2F8",
    fontSize: 25,
    fontWeight: "900",
    marginTop: 20,
  },
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  separator: {
    marginBottom: 20,
  },
  scrollView: {
    marginTop: 7,
    //   marginBottom: 100,
    height: "83%",
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
