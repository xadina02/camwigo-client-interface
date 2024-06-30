import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import BusIcon from '../assets/bus.png'
import Line from '../assets/Line.jpg'
import { useNavigation } from '@react-navigation/native'

const JourneyCard = ({ journey }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.vehicleInfo}>
          <Image source={BusIcon} style={styles.vehicleIcon} />
          <Text style={styles.vehicleName}>{journey.route}</Text>
        </View>
        <Text style={styles.type}>{journey.type.toUpperCase()}</Text>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.locationBox1}>
          <Text style={styles.locationLabel}>Origin</Text>
          <Text style={styles.location}>{journey.origin}</Text>
        </View>
        <View style={styles.indicatorBox}>
          <Image source={Line} style={styles.line}/>
          <View style={styles.indicator}>
              <Image source={BusIcon} style={styles.indicatorIcon} />
          </View>
        </View>
        <View style={styles.locationBox2}>
          <Text style={styles.locationLabel}>Destination</Text>
          <Text style={styles.location}>{journey.destination}</Text>
        </View>
      </View>

      <View style={styles.detailsRow}>
        <View style={styles.detailBox}>
          <View style={styles.detailWrapper1}>
            <Text style={styles.timeIcon}>🕒</Text>
            <View>
              <Text style={styles.time}>{journey.time}</Text>
              <Text style={styles.date}>{journey.date}</Text>
            </View>
          </View>
        </View>
        <View style={styles.detailBox}>
            <Text style={journey.status === 'used' ? styles.status : styles.type}>{journey.status.toUpperCase()}</Text>
        </View>
        <View style={styles.detailBox}>
          <View style={styles.detailWrapper3}>
            <View style={styles.pricing}>
              <View style={styles.fareHeader}>
              <Text style={styles.fareIcon}>💵</Text>
                <Text style={styles.detailLabel2}>Fleet Fare</Text>
              </View>
              <Text style={styles.fare}>{journey.fare}</Text>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("TicketDetailsScreen", {
                journey: journey
            })}>
        <Text style={styles.buttonText}>View ticket ➔</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderColor: '#18BA82',
    borderWidth: 2,
    borderRadius: 20,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  vehicleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vehicleIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  vehicleName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#070C35',
  },
  type: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#18BA82',
    backgroundColor: '#E0F4EC',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF0B45',
    backgroundColor: '#FCB9BD',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationBox1: {
    alignItems: 'left',
  },
  locationBox2: {
    alignItems: 'center',
  },
  locationLabel: {
    fontSize: 11,
    color: '#666',
    // marginBottom: 4,
  },
  location: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  indicatorBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -15,
  },
  indicator: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ABB5FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  line: {
    marginBottom: -20,
  },
  indicatorIcon: {
    width: 20,
    height: 20,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailBox: {
    alignItems: 'center',
    flex: 1,
  },
  detailWrapper1: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#CDD2F8',
    padding: 3,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#070C35',
    borderStyle: 'dashed',
  },
  detailWrapper2: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FCF6E7',
    padding: 4,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#B88400',
    borderStyle: 'dashed',
  },
  detailWrapper3: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D5FAED',
    padding: 4,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#5CE4B5',
    borderStyle: 'dashed',
  },
  timeIcon: {
    fontSize: 18,
    color: '#333',
    marginRight: 2,
    marginTop: -15
  },
  time: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  date: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  seatIcon: {
    fontSize: 24,
    color: '#333',
    marginRight: 8,
  },
  seating: {
    alignItems: "center"
  },
  pricing: {
    alignItems: "center"
  },
  detailLabel1: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#B88400'
  },
  detailLabel2: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#626689',
  },
  seats: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#B88400',
    marginTop: -4
  },
  availableSeats: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#9B978E',
    fontWeight: 'bold',
  },
  fareHeader: {
    flexDirection: 'row',
    alignItems: 'bottom'
  },
  fareIcon: {
    fontSize: 18,
    color: '#333',
    marginRight: 3,
    marginTop: -3
  },
  fare: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#18BA82',
  },
  button: {
    backgroundColor: '#00103D',
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default JourneyCard;
