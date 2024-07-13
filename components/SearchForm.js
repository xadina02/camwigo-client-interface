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
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import useGetOrigins from "../utils/useGetOrigin";
import useGetDestinations from "../utils/useGetDestination";
import useGetSchedules from "../utils/useGetSchedule";
import useGetDates from "../utils/useGetDate";
import { useNavigation } from "@react-navigation/native";
import OriginIcon from "../assets/direct-down.png";
import DestinationIcon from "../assets/location.png";
import ScheduleIcon from "../assets/clock2.png";
import DateIcon from "../assets/calendar.png";
import dummyData from "../dummy/tripDefinition";

const SearchForm = ({ onSearch }) => {
  const navigation = useNavigation();
  const appToken = "sekurity$227";

  const { origins } = useGetOrigins(appToken);
  const [destinations, setDestinations] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [dates, setDates] = useState([]);
  const [time, setTime] = useState("");

  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [selectedOriginId, setSelectedOriginId] = useState(0);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedDestinationId, setSelectedDestinationId] = useState(0);
  const [selectedSchedule, setSelectedSchedule] = useState("");
  const [selectedScheduleId, setSelectedScheduleId] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [openDatePicker, setOpenDatePicker] = useState(false);

  // Fetch destinations whenever selectedOriginId changes
  const { destinations: fetchedDestinations } = useGetDestinations(
    selectedOriginId,
    appToken
  );
  const { schedules: fetchedSchedules } = useGetSchedules(
    selectedDestinationId,
    appToken
  );
  const { dates: fetchedDates } = useGetDates(selectedScheduleId, appToken);

  useEffect(() => {
    setFilteredData(origins);
  }, [origins]);

  useEffect(() => {
    if (selectedOriginId) {
      setDestinations(fetchedDestinations);
    } else {
      setDestinations([]);
    }
    setSelectedDestination("");
    setSelectedSchedule("");
    setSelectedDate(null);
    setSchedules([]);
    setDates([]);
  }, [selectedOriginId, fetchedDestinations]);

  useEffect(() => {
    if (selectedDestinationId) {
      setSchedules(fetchedSchedules);
    } else {
      setSchedules([]);
    }
    setSelectedSchedule("");
    setSelectedDate(null);
    setDates([]);
  }, [selectedDestinationId, fetchedSchedules]);

  useEffect(() => {
    if (selectedScheduleId) {
      setDates(fetchedDates);
    } else {
      setDates([]);
    }
    setSelectedDate(null);
  }, [selectedScheduleId, fetchedDates]);

  const handleSearch = () => {
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      // Format the selectedDate to 'Tue, Jul 16 2024'
      const options = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      const formattedDisplayDate = new Intl.DateTimeFormat(
        "en-US",
        options
      ).format(selectedDate);
      onSearch({
        origin: selectedOrigin,
        destination: selectedDestination,
        time: time,
        date: formattedDisplayDate,
        route_schedule: selectedScheduleId,
        journey_date: formattedDate,
      });
    }
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
      setSelectedOrigin(item.origin.en);
      setSelectedOriginId(item.id);
    } else if (modalType === "destination") {
      setSelectedDestination(item.destination.en);
      setSelectedDestinationId(item.id);
    } else if (modalType === "schedule") {
      setSelectedSchedule(item.label.en + " - " + item.departure_time);
      setTime(item.departure_time);
      setSelectedScheduleId(item.id);
    }
    setModalVisible(false);
  };

  const handleDateChange = (event, date) => {
    setSelectedDate(date);
    setOpenDatePicker(false);
  };

  const renderModalItem = ({ item }) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => handleItemPress(item)}
    >
      <Text style={styles.modalItemText}>
        {modalType === "origin" && item.origin.en}
        {modalType === "destination" && item.destination.en}
        {modalType === "schedule" &&
          item.label.en + " - " + item.departure_time}
      </Text>
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
            keyExtractor={(item) => item.id}
            style={styles.modalList}
          />
        </View>
      </View>
    </Modal>
  );

  // Calculate minimum and maximum date
  const journeyDates = dates.map((date) => new Date(date.journey_date));

  // Calculate minimum and maximum date
  const minDate = journeyDates.length
    ? new Date(Math.min(...journeyDates))
    : new Date();
  const maxDate = journeyDates.length
    ? new Date(Math.max(...journeyDates))
    : new Date();

  // Function to check if a date is enabled (selectable)
  const isDateEnabled = (date) => {
    return journeyDates.some(
      (availableDate) => availableDate.getTime() === date.getTime()
    );
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#00103D" />}
      <Text style={styles.topic}>Describe your one-way trip</Text>

      <TouchableOpacity
        style={styles.inputs}
        onPress={() => openModal("origin")}
      >
        <Image source={OriginIcon} style={styles.elementIcon} />
        <Text style={styles.elementLabel}>
          {selectedOrigin ? selectedOrigin : "Select Origin"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.inputs}
        onPress={() => openModal("destination")}
        disabled={!selectedOrigin}
      >
        <Image source={DestinationIcon} style={styles.elementIcon} />
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
          <Image source={ScheduleIcon} style={styles.elementIcon} />
          <Text style={styles.elementLabel}>
            {selectedSchedule
              ? selectedSchedule.length > 14
                ? `${selectedSchedule.substring(0, 14)}...`
                : selectedSchedule
              : "Pick Schedule"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.inputs, styles.halfInput]}
          onPress={() => setOpenDatePicker(true)}
          disabled={!selectedSchedule}
        >
          <Image source={DateIcon} style={styles.elementIcon} />
          <Text style={styles.elementLabel}>
            {selectedDate ? selectedDate.toDateString() : "Choose Date"}
          </Text>
        </TouchableOpacity>
      </View>

      {openDatePicker && (
        <DateTimePicker
          testID="datePicker"
          value={selectedDate || new Date()}
          mode="date"
          onChange={handleDateChange}
          minimumDate={minDate}
          maximumDate={maxDate}
          enabledDates={(date) => isDateEnabled(date)}
        />
      )}

      <TouchableOpacity onPress={handleSearch} style={styles.button}>
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
    borderColor: "#999999",
    alignItems: "left",
    flexDirection: "row",
    marginVertical: 3,
  },
  elementLabel: {
    marginLeft: 10,
    fontSize: 14,
    // fontWeight: 'bold',
  },
  elementIcon: {
    width: 14,
    height: 15,
  },
  modalList: {
    height: "40%",
    // flex: 1
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
