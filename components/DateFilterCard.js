import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Import icons if using expo

const DateFilterCard = ({ dates, chosenDate, onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date(chosenDate));

  useEffect(() => {
    setSelectedDate(new Date(chosenDate));
  }, [chosenDate]);

  // Extract and sort the dates from the journey_date keys
  const getDateArray = () => {
    let dateArray = dates.map(date => new Date(date.journey_date));
    dateArray.sort((a, b) => a - b);
    return dateArray;
  };

  const dateArray = getDateArray();

  // Find the index of the chosen date
  const chosenDateIndex = dateArray.findIndex(date => date.toDateString() === new Date(chosenDate).toDateString());

  // Format date to display
  const formatDate = (date) => {
    const day = date.getDate();
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    return { day, dayName };
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    onDateChange(date.toISOString());
  };

  const renderDate = ({ item }) => {
    const { day, dayName } = formatDate(item);
    const isSelected = selectedDate.toDateString() === item.toDateString();

    return (
      <TouchableOpacity
        style={[styles.dateButton, isSelected && styles.selectedDateButton]}
        onPress={() => handleDateSelect(item)}
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
          <MaterialIcons name="calendar-today" size={21} color="#333" />
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
        initialScrollIndex={chosenDateIndex} // Set initial scroll position
        getItemLayout={(data, index) => (
          { length: 61, offset: 61 * index, index }
        )} // Ensure smooth scrolling
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#E4E6F6',
    paddingVertical: 10,
    paddingHorizontal: 29,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
    marginTop: -5,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  subHeader: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 1,
  },
  dateList: {
    flexDirection: 'row',
  },
  dateButton: {
    backgroundColor: '#E4E6F6',
    paddingVertical: 0,
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
