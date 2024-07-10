import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from "react-native";
import CustomModal from "../components/CustomModal";
import { useNavigation } from "@react-navigation/native";
import BackArrow from "../assets/arrow-circle-left.png";

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nin, setNin] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    navigation.navigate("LandingScreen", { myActiveTab: "Ticket" });
  };

  const handleContinue = () => {
    // Perform form validation and submission logic here
    openModal();
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
          <Text style={styles.header}>Complete Your Reservation</Text>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.ticketBox}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.topper}>
              <Image
                source={require("../assets/CamWiGo_logo.png")} // Replace with your logo
                style={styles.logo}
              />
              <View style={styles.topperText}>
                <Text style={styles.title}>CamWiGo</Text>
                <Text style={styles.subHeader}>No stress, travel easy..</Text>
              </View>
            </View>
            <Text style={styles.label}>First Name <Text style={styles.star}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Enter first name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <Text style={styles.label}>Last Name <Text style={styles.star}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Enter last name"
              value={lastName}
              onChangeText={setLastName}
            />
            <Text style={styles.label}>National Identification Number <Text style={styles.star}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Enter NIN (as it is on your national identity card)"
              value={nin}
              onChangeText={setNin}
            />
            <Text style={styles.label}>Phone Number <Text style={styles.star}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Enter tel"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter email address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <TouchableOpacity style={styles.button} onPress={handleContinue}>
              <Text style={styles.buttonText}>Continue ➔</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>

      <CustomModal
        visible={modalVisible}
        onClose={closeModal}
        // onClose={() => navigation.navigate("RegistrationScreen")}
        icon={require("../assets/success-tick.png")}
        headerText="Success"
        bodyText="Your payment was successfully received."
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#D9DBE7",
  },
  backgroundDiv: {
    height: "17%",
  },
  another: {
    height: "95%",
    backgroundColor: "#070C35",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 15,
  },
  backArrowContainer: {
    position: "absolute",
    left: 15,
    top: "29%",
    transform: [{ translateY: -12 }],
    zIndex: 1, // Ensure it's on top
  },
  backArrow: {
    width: 30,
    height: 30,
    tintColor: "#CDD2F8",
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
    height: "93%",
    marginTop: -(2.1 * StatusBar.currentHeight),
    justifyContent: "space-between",
  },
  ticketBox: {
    padding: 20,
    backgroundColor: "#ffffff",
    height: "99%",
    borderRadius: 20,
  },
  topper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: '10%',
    marginBottom: '7%',
  },
  topperText: {
    marginLeft: '5%',
  },
  title: {
    // textAlign: "center",
    color: "#000",
    fontSize: 30,
    fontWeight: "900",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  logo: {
    width: 100,
    height: 100,
    // alignSelf: "center",
    marginBottom: 10,
  },
  subHeader: {
    // textAlign: "center",
    color: "#000",
    fontSize: 16,
    marginBottom: 20,
  },
  star: {
    color: '#FF0B45',
  },
  button: {
    backgroundColor: "#00103D",
    padding: 12,
    borderRadius: 20,
    alignItems: "center",
    marginTop: '5%',
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default RegistrationScreen;
