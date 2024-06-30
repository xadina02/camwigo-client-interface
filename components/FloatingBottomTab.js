import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const FloatingBottomTab = ({ activeTab, onTabPress }) => {
  const navigation = useNavigation()
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity 
        style={[styles.tabButton, activeTab === 'Home' ? styles.activeTab : {}]} 
        onPress={() => { onTabPress('Home'); navigation.navigate("LandingScreen") }}
      >
        <FontAwesome name="home" size={24} color={activeTab === 'Home' ? "#070C35" : "white"} />
        {activeTab === 'Home' && <Text style={[styles.tabLabel, activeTab === 'Home' ? styles.activeTabLabel : {}]}>Home</Text>}
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.tabButton, activeTab === 'Ticket' ? styles.activeTab : {}]} 
        onPress={() => { onTabPress('Ticket'); navigation.navigate("TicketScreen")}}
      >
        <FontAwesome name="ticket" size={24} color={activeTab === 'Ticket' ? "#070C35" : "white"} />
        {activeTab === 'Ticket' && <Text style={[styles.tabLabel, activeTab === 'Ticket' ? styles.activeTabLabel : {}]}>Ticket</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    position: 'absolute',
    bottom: 3,
    left: "20%",
    right: "20%",
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#070C35',
    paddingVertical: 7,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    width: "60%",
    borderWidth: 1.5,
    borderColor: "#C7C7C7",
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  tabLabel: {
    marginLeft: 8,
    fontSize: 18,
    color: 'white',
  },
  activeTab: {
    paddingHorizontal: 36,
    backgroundColor: '#f5f5f5',
  },
  activeTabLabel: {
    color: '#070C35',
  },
});

export default FloatingBottomTab;
