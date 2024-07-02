import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

// SeatCard Component
const SeatCard = ({ seatIcon, seatNumber, isReserved, onSeatSelect }) => {
  return (
    <TouchableOpacity 
      style={[styles.card, isReserved && styles.reservedCard]} 
      onPress={onSeatSelect} 
      disabled={isReserved}
    >
      <View style={styles.numberContainer}>
        <Text style={styles.seatNumber}>{seatNumber}</Text>
      </View>
      <Image source={seatIcon} style={styles.seatIcon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 40,
    height: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
  },
  numberContainer: {
    width: '100%',
    backgroundColor: '#070C35',
    alignItems: 'center',
    paddingVertical: 3,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  seatNumber: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  seatIcon: {
    width: 22,
    height: 22,
    marginTop: 1,
  },
});

export default SeatCard;
