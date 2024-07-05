import React, { useState } from 'react';
import { SafeAreaView, Text, Image, ScrollView, View, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import DateFilterCard from '../components/DateFilterCard';
import JourneyCard from '../components/JourneyCard';
import dummyJourneys from '../dummy/journeys';
import BackArrow from '../assets/arrow-circle-left.png'; // Assuming you placed the arrow image in the assets folder

const ListScreen = ({ route }) => {
  const navigation = useNavigation();
  const { origin, destination, date, time } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#070C35" />
      <View style={styles.backgroundDiv}>
        <TouchableOpacity style={styles.backArrowContainer} onPress={() => navigation.goBack()}>
          <Image source={BackArrow} style={styles.backArrow} />
        </TouchableOpacity>
        <Text style={styles.header}>{origin} - {destination}</Text>
        <Text style={styles.headerSubText}>{date} | {time}</Text>
      </View>
      <DateFilterCard />
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {dummyJourneys.map((journey) => (
            <View style={styles.separator} key={journey.id}>
                <JourneyCard key={journey.id} journey={journey} />
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  backgroundDiv: {
    height: '7%',
    backgroundColor: '#070C35',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backArrowContainer: {
    position: 'absolute',
    left: 15,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  backArrow: {
    width: 30,
    height: 30,
    tintColor: '#CDD2F8', // Apply tint color if the arrow image is monochrome
  },
  header: {
    textAlign: 'center',
    color: '#CDD2F8',
    fontSize: 25,
    fontWeight: '900',
  },
  headerSubText: {
    textAlign: 'center',
    color: '#C7C7C7',
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
    height: '81.5%',
  },
  topic: {
    fontSize: 25,
    fontWeight: '900',
    color: '#A6A6A6',
    textAlign: 'center',
    marginTop: 200,
  },
});

export default ListScreen;
