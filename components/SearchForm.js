import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  FlatList,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import DatePicker from "react-native-date-picker";
import { useNavigation } from "@react-navigation/native";
import OriginIcon from "../assets/direct-down.png";
import DestinationIcon from "../assets/location.png";
import ScheduleIcon from "../assets/clock2.png";
import DateIcon from "../assets/calendar.png";

const dummyData = {
  origins: [
    { label: "Douala", value: "Douala" },
    { label: "Yaounde", value: "Yaounde" },
    // Add more towns
  ],
  destinations: {
    Douala: [
      { label: "Bamenda", value: "Bamenda" },
      { label: "Buea", value: "Buea" },
      // Add more destinations
    ],
    Yaounde: [
      { label: "Bafoussam", value: "Bafoussam" },
      { label: "Garoua", value: "Garoua" },
      // Add more destinations
    ],
  },
  schedules: {
    Bamenda: [
      { label: "Morning", value: "Morning" },
      { label: "Evening", value: "Evening" },
      // Add more schedules
    ],
    Buea: [
      { label: "Afternoon", value: "Afternoon" },
      { label: "Night", value: "Night" },
      // Add more schedules
    ],
    // Add more schedules for other destinations
  },
  dates: {
    Morning: [new Date("2024-07-21"), new Date("2024-07-22")],
    Evening: [new Date("2024-07-23"), new Date("2024-07-24")],
    // Add more dates for other schedules
  },
};

const SearchForm = ({ onSearch }) => {
  const navigation = useNavigation();

  const [origins, setOrigins] = useState(dummyData.origins);
  const [destinations, setDestinations] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [dates, setDates] = useState([]);

  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedSchedule, setSelectedSchedule] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [openDatePicker, setOpenDatePicker] = useState(false);

  useEffect(() => {
    setFilteredData(origins);
  }, []);

  useEffect(() => {
    if (selectedOrigin) {
      setDestinations(dummyData.destinations[selectedOrigin] || []);
    } else {
      setDestinations([]);
    }
    setSelectedDestination("");
    setSelectedSchedule("");
    setSelectedDate(null);
    setSchedules([]);
    setDates([]);
  }, [selectedOrigin]);

  useEffect(() => {
    if (selectedDestination) {
      setSchedules(dummyData.schedules[selectedDestination] || []);
    } else {
      setSchedules([]);
    }
    setSelectedSchedule("");
    setSelectedDate(null);
    setDates([]);
  }, [selectedDestination]);

  useEffect(() => {
    if (selectedSchedule) {
      setDates(dummyData.dates[selectedSchedule] || []);
    } else {
      setDates([]);
    }
    setSelectedDate(null);
  }, [selectedSchedule]);

  const handleSearch = () => {
    onSearch({
      origin: selectedOrigin,
      destination: selectedDestination,
      schedule: selectedSchedule,
      date: selectedDate,
    });
  };

  const openModal = (type) => {
    setModalType(type);
    if (type === "origin") {
      setFilteredData(origins);
    } else if (type === "destination") {
      setFilteredData(destinations);
    } else if (type === "schedule") {
      setFilteredData(schedules);
    }
    setModalVisible(true);
  };

  const handleItemPress = (item) => {
    if (modalType === "origin") {
      setSelectedOrigin(item.value);
    } else if (modalType === "destination") {
      setSelectedDestination(item.value);
    } else if (modalType === "schedule") {
      setSelectedSchedule(item.value);
    }
    setModalVisible(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setOpenDatePicker(false);
  };

  const renderModalItem = ({ item }) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => handleItemPress(item)}
    >
      <Text style={styles.modalItemText}>{item.label}</Text>
    </TouchableOpacity>
  );

  const renderModal = () => (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.modalSearchInput}
            placeholder="Search..."
            onChangeText={(text) =>
              setFilteredData(
                (modalType === "origin"
                  ? origins
                  : modalType === "destination"
                  ? destinations
                  : schedules
                ).filter((item) =>
                  item.label.toLowerCase().includes(text.toLowerCase())
                )
              )
            }
          />
          <FlatList
            data={filteredData}
            renderItem={renderModalItem}
            keyExtractor={(item) => item.value}
          />
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#00103D" />}
      <Text style={styles.topic}>Describe your one-way trip</Text>

      <TouchableOpacity
        style={styles.inputs}
        onPress={() => openModal("origin")}
      >
        <Image source={OriginIcon} style={styles.elementIcon}/>
        <Text style={styles.elementLabel}>{selectedOrigin ? selectedOrigin : "Select Origin"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.inputs}
        onPress={() => openModal("destination")}
        disabled={!selectedOrigin}
      >
        <Image source={DestinationIcon} style={styles.elementIcon}/>
        <Text style={styles.elementLabel}>
          {selectedDestination ? selectedDestination : "Select Destination"}
        </Text>
      </TouchableOpacity>

      <View style={styles.period}>
        <TouchableOpacity
          style={[styles.inputs, styles.halfInput]}
          onPress={() => openModal("schedule")}
          disabled={!selectedDestination}
        >
        <Image source={ScheduleIcon} style={styles.elementIcon}/>
          <Text style={styles.elementLabel}>{selectedSchedule ? selectedSchedule : "Pick Schedule"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.inputs, styles.halfInput]}
          onPress={() => setOpenDatePicker(true)}
          disabled={!selectedSchedule}
        >
        <Image source={DateIcon} style={styles.elementIcon}/>
          <Text style={styles.elementLabel}>
            {selectedDate ? selectedDate.toDateString() : "Choose Date"}
          </Text>
        </TouchableOpacity>
      </View>

      <DatePicker
        modal
        open={openDatePicker}
        date={selectedDate || new Date()}
        onConfirm={handleDateChange}
        onCancel={() => setOpenDatePicker(false)}
        minimumDate={dates.length > 0 ? new Date(dates[0]) : new Date()}
        maximumDate={
          dates.length > 0 ? new Date(dates[dates.length - 1]) : new Date()
        }
        mode="date"
      />

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ListScreen", {
            origin: selectedOrigin,
            destination: selectedDestination,
            date: selectedDate ? selectedDate.toDateString() : "",
            time: selectedSchedule,
          })
        }
        style={styles.button}
      >
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      {renderModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 22,
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 7,
  },
  button: {
    backgroundColor: "#070C35",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    marginVertical: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  inputs: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#070C35",
    alignItems: "left",
    flexDirection: "row",
    marginVertical: 3,
  },
  elementLabel: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  elementIcon: {
    width: 14,
    height: 15,
  },
  period: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    width: "49%",
  },
  topic: {
    fontSize: 21,
    fontWeight: "900",
    marginTop: 5,
    marginBottom: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  modalItemText: {
    fontSize: 18,
  },
  modalSearchInput: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
  },
});

export default SearchForm;
