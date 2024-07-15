import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  ScrollView,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import BackArrow from "../assets/arrow-circle-left.png";
import ReservedIcon from "../assets/bus_seat_reserved.png";
import SelectedIcon from "../assets/bus_seat_selected.png";
import AvailableIcon from "../assets/bus_seat.png";
import ReserveIcon from "../assets/reserve.png";
import JourneyFleetDetails from "../components/JourneyFleetDetails";
import SeatCard from "../components/SeatCard";
import Delimiter from "../assets/delimiter.png";

const ReservationScreen = ({ route }) => {
  const navigation = useNavigation();
  const { journey } = route.params;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    // Initialize seats based on vehicle category size and reservations
    const initializeSeats = () => {
      const vehicleSize = journey.vehicle.vehicle_category.size;
      const reservedSeats = journey.reservations.map((res) => res.position);
      const seatArray = [];

      for (let i = 1; i <= vehicleSize; i++) {
        seatArray.push({
          seatNumber: i.toString(),
          isReserved: reservedSeats.includes(i),
        });
      }

      setSeats(seatArray);
    };

    initializeSeats();
  }, [journey]);

  // Function to split seats into two columns layout
  const getSeatRows = (seats) => {
    const seatRows = [];
    for (let i = 0; i < seats.length; i += 6) {
      seatRows.push(seats.slice(i, i + 6));
    }
    return seatRows;
  };

  const seatRows = getSeatRows(seats);

  // Handle seat selection
  const handleSeatSelect = (seatNumber) => {
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatNumber)) {
        return prevSelectedSeats.filter((seat) => seat !== seatNumber);
      } else {
        return [...prevSelectedSeats, seatNumber];
      }
    });
  };

  const handleReserve = () => {
    navigation.navigate("RegistrationScreen", {
      journey: journey,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#070C35" />
      <View style={styles.backgroundDiv}>
        <View style={styles.another}>
          <TouchableOpacity
            style={styles.backArrowContainer}
            onPress={() => navigation.goBack()}
            accessible={true}
            accessibilityLabel="Back"
            accessibilityHint="Navigates to the previous screen"
          >
            <Image source={BackArrow} style={styles.backArrow} />
          </TouchableOpacity>
          <Text style={styles.header}>Make Reservation</Text>
          <View style={styles.fleetDetails}>
            <JourneyFleetDetails
              journey={journey}
              seating={true}
              status={false}
              none={false}
            />
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.aboutSeats}>
          <View style={styles.instructions}>
            <View style={styles.index}>
              <Image source={AvailableIcon} style={styles.seatIcon} />
              <Text style={styles.label}>Available</Text>
            </View>
            <View style={styles.index}>
              <Image source={ReservedIcon} style={styles.seatIcon} />
              <Text style={styles.label}>Reserved</Text>
            </View>
            <View style={styles.index}>
              <Image source={SelectedIcon} style={styles.seatIcon} />
              <Text style={styles.label}>Selected</Text>
            </View>
          </View>
          <Image source={Delimiter} style={styles.delimiter} />
          <ScrollView
            style={styles.seatList}
            showsVerticalScrollIndicator={false}
          >
            {seatRows.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                <View style={styles.column}>
                  {row.slice(0, 3).map((seat) => (
                    <SeatCard
                      key={seat.seatNumber}
                      seatIcon={
                        seat.isReserved
                          ? ReservedIcon
                          : selectedSeats.includes(seat.seatNumber)
                          ? SelectedIcon
                          : AvailableIcon
                      }
                      seatNumber={seat.seatNumber}
                      isReserved={seat.isReserved}
                      onSeatSelect={() =>
                        !seat.isReserved && handleSeatSelect(seat.seatNumber)
                      }
                    />
                  ))}
                </View>
                <View style={styles.column}>
                  {row.slice(3, 6).map((seat) => (
                    <SeatCard
                      key={seat.seatNumber}
                      seatIcon={
                        seat.isReserved
                          ? ReservedIcon
                          : selectedSeats.includes(seat.seatNumber)
                          ? SelectedIcon
                          : AvailableIcon
                      }
                      seatNumber={seat.seatNumber}
                      isReserved={seat.isReserved}
                      onSeatSelect={() =>
                        !seat.isReserved && handleSeatSelect(seat.seatNumber)
                      }
                    />
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleReserve}>
          <Text style={styles.buttonText}>
            <Image source={ReserveIcon} /> Reserve
          </Text>
        </TouchableOpacity>
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
    height: "23%",
  },
  another: {
    height: "65%",
    backgroundColor: "#070C35",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 15,
  },
  backArrowContainer: {
    position: "absolute",
    left: 15,
    top: "33%",
    transform: [{ translateY: -12 }],
    zIndex: 1, // Ensure it's on top
  },
  backArrow: {
    width: 30,
    height: 30,
    tintColor: "#CDD2F8", // Apply tint color if the arrow image is monochrome
  },
  header: {
    textAlign: "center",
    color: "#CDD2F8",
    fontSize: 25,
    fontWeight: "900",
  },
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  fleetDetails: {
    backgroundColor: "#fff",
    padding: 10,
    marginTop: 25,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 7,
    borderRadius: 20,
  },
  button: {
    backgroundColor: "#00103D",
    padding: 12,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  aboutSeats: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    marginTop: 5,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 7,
    borderRadius: 20,
    height: "79%",
  },
  instructions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  index: {
    alignItems: "center",
  },
  seatIcon: {
    width: 22,
    height: 22,
  },
  label: {
    fontWeight: "bold",
  },
  delimiter: {
    marginTop: 5,
    marginBottom: 3,
    width: "100%",
  },
  seatList: {
    marginTop: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  column: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ReservationScreen;
