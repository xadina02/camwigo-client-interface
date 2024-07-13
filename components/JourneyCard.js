import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import BusIcon from "../assets/bus.png";
import JourneyFleetDetails from './JourneyFleetDetails'
import { useNavigation } from '@react-navigation/native'

const JourneyCard = ({ journey }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.vehicleInfo}>
          <Image source={BusIcon} style={styles.vehicleIcon} />
          <Text style={styles.vehicleName}>{journey.vehicle.name}</Text>
        </View>
        <Text style={styles.type}>{journey.vehicle.vehicle_category.name.en.toUpperCase()}</Text>
      </View>

      <JourneyFleetDetails journey={journey} seating={true} status={false} none={false}/>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ReservationScreen", {
                journey: journey
            })}>
        <Text style={styles.buttonText}>View details ➔</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderColor: "#41D635",
    borderWidth: 2,
    borderRadius: 20,
    overflow: "hidden",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  vehicleInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  vehicleIcon: {
    width: 23,
    height: 23,
    marginRight: 8,
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#070C35",
    marginLeft: -6,
  },
  type: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#18BA82",
    backgroundColor: "#E0F4EC",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
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
});

export default JourneyCard;
