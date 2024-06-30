import React, { useState, useEffect } from "react";
import { ScrollView, Text, View, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import dummyTickets from "../dummy/tickets";
import TicketCard from "../components/TicketCard";
import FloatingBottomTab from '../components/FloatingBottomTab';
import { useNavigation } from '@react-navigation/native'

const TicketScreen = () => {
  const navigation = useNavigation()

  const [journeys, setJourneys] = useState(true);
  const [activeTab, setActiveTab] = useState('Ticket');
  useEffect(() => {
    setActiveTab('Ticket');
  }, [{activeTab}]);
  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar backgroundColor="#070C35" />
        <View style={styles.backgroundDiv}>
          <Text style={styles.header}>Ticket History</Text>
        </View>
        <View style={styles.container}>
          {journeys ? (
            <ScrollView
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
            >
              {dummyTickets.map((journey) => (
                // <View style={styles.separator} key={journey.id}>
                <TicketCard key={journey.id} journey={journey} />
                // </View>
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.topic}>No available tickets</Text>
          )}
        </View>
      </SafeAreaView>
      <FloatingBottomTab activeTab={activeTab} onTabPress={setActiveTab} />
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
});

export default TicketScreen