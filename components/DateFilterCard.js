import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Import icons if using expo

const DateFilterCard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Generate an array of dates for the date picker
  const getDateArray = () => {
    let dateArray = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      let date = new Date(today);
      date.setDate(today.getDate() + i);
      dateArray.push(date);
    }
    return dateArray;
  };

  const dateArray = getDateArray();

  // Format date to display
  const formatDate = (date) => {
    const day = date.getDate();
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    return { day, dayName };
  };

  const renderDate = ({ item }) => {
    const { day, dayName } = formatDate(item);
    const isSelected = selectedDate.toDateString() === item.toDateString();

    return (
      <TouchableOpacity
        style={[styles.dateButton, isSelected && styles.selectedDateButton]}
        onPress={() => setSelectedDate(item)}
      >
        <Text style={[styles.dateText, isSelected && styles.selectedDateText]}>{day}</Text>
        <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>{dayName}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Filter By Date</Text>
        <TouchableOpacity>
          <MaterialIcons name="calendar-today" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      <Text style={styles.subHeader}>Day</Text>
      <FlatList
        horizontal
        data={dateArray}
        renderItem={renderDate}
        keyExtractor={(item) => item.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dateList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#E4E6F6',
    // padding: 15,
    paddingVertical: 10,
    paddingHorizontal: 29,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    // marginHorizontal: 20,
    // marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 3,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  subHeader: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  dateList: {
    flexDirection: 'row',
  },
  dateButton: {
    backgroundColor: '#E4E6F6',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#070C35',
    alignItems: 'center',
    marginRight: 10,
  },
  selectedDateButton: {
    backgroundColor: '#070C35',
    borderColor: '#070C35',
  },
  dateText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  selectedDateText: {
    color: '#fff',
  },
  dayText: {
    fontSize: 14,
    color: '#666',
  },
  selectedDayText: {
    color: '#fff',
  },
});

export default DateFilterCard;
