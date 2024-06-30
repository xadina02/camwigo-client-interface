import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native'
// import axios from 'axios';

const SearchForm = ({ onSearch }) => {
  const navigation = useNavigation()
  
  const [origins, setOrigins] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [dates, setDates] = useState([]);

  const [selectedOrigin, setSelectedOrigin] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedSchedule, setSelectedSchedule] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData('origins');
  }, []);

  const fetchData = async (type, params = {}) => {
    setLoading(true);
    // try {
    //   const response = await axios.get(`https://api.example.com/${type}`, { params });
    //   if (type === 'origins') setOrigins(response.data);
    //   if (type === 'destinations') setDestinations(response.data);
    //   if (type === 'schedules') setSchedules(response.data);
    //   if (type === 'dates') setDates(response.data);
    // } catch (error) {
    //   console.error(error);
    // }
    setLoading(false);
  };

  const handleSearch = () => {
    onSearch({ origin: selectedOrigin, destination: selectedDestination, schedule: selectedSchedule, date: selectedDate });
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#00103D" />}
      <Text style={styles.topic}>Describe your one-way trip</Text>
      <TextInput style={styles.inputs} placeholder="Select Origin"></TextInput>
      <TextInput style={styles.inputs} placeholder="Select Destination"></TextInput>
      <View style={styles.period}>
        <TextInput style={[styles.inputs, styles.halfInput]} placeholder="Pick Schedule"></TextInput>
        <TextInput style={[styles.inputs, styles.halfInput]} placeholder="Choose Date"></TextInput>
      </View>
      {/* <TouchableOpacity onPress={handleSearch} style={styles.button}> */}
      <TouchableOpacity onPress={() => navigation.navigate("ListScreen", {
                origin: "Douala",
                destination: "Yaounde",
                date: "Sunday, July 21 2024",
                time: "07:30 AM"
            })} style={styles.button}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 7,
  },
  button: {
    backgroundColor: '#070C35',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 4
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  inputs: {
    paddingVertical: 2,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#070C35",
    alignItems: 'center',
    marginVertical: 4,
  },
  period: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    width: "49%"
  },
  topic: {
    fontSize: 21,
    fontWeight: "900",
    marginTop: 5
  },
});

export default SearchForm;
