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
  ActivityIndicator,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import BackArrow from "../assets/arrow-circle-left.png";
import useGetUser from "../utils/useGetUser";
import useUserStore from "../zustand/useUserStore";
import { toast } from "react-toastify";

const RegistrationScreen = () => {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nin, setNin] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const { accessToken } = useUserStore((state) => ({
    accessToken: state.accessToken,
  }));

  const appToken = "sekurity$227";

  const { loading, fetchUser } = useGetUser();

  const handleContinue = async () => {
    const data = {
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.trim(),
      phone: phoneNumber.trim(),
      NIN: nin.trim(),
    };

    // Client-side validation
    if (!data.first_name || !data.last_name || !data.phone || !data.NIN) {
      toast.error("All required fields must be filled.");
      return;
    }

    console.log("Handle Continue Called with data: ", data);

    await fetchUser(
      data,
      appToken, 
    );

    // Check the user data in the store
    const userData = useUserStore.getState();
    console.log("User Data after Registration: ", userData); // Add this line

    navigation.navigate("PaymentScreen");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#070C35" />
      <View style={styles.backgroundDiv}>
        <View style={styles.another}>
          <View style={styles.backArrowParent}>
            <TouchableOpacity
              style={styles.backArrowContainer}
              onPress={() => navigation.goBack()}
              accessible={true}
              accessibilityLabel="Back"
              accessibilityHint="Navigates to the previous screen"
            >
              <Image source={BackArrow} style={styles.backArrow} />
            </TouchableOpacity>
          </View>
          <View style={styles.heading}>
            <Text style={styles.header}>Complete Your Registration</Text>
          </View>
        </View>
      </View>

      <View style={styles.container}>
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
          <Text style={styles.label}>
            First Name <Text style={styles.star}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter first name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <Text style={styles.label}>
            Last Name <Text style={styles.star}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter last name"
            value={lastName}
            onChangeText={setLastName}
          />
          <Text style={styles.label}>
            National Identification Number <Text style={styles.star}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter NIN (as it is on your national identity card)"
            value={nin}
            onChangeText={setNin}
          />
          <Text style={styles.label}>
            Phone Number <Text style={styles.star}>*</Text>
          </Text>
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
            {loading ? (
              <ActivityIndicator
                size="large"
                color="#f5f5f5"
                style={styles.loader}
              />
            ) : (
              <Text style={styles.buttonText}>Continue ➔</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#070c35",
  },
  backgroundDiv: {
    height: "12%",
    // backgroundColor: "#f5f5f5",
    //height: "17%",
  },
  another: {
    height: "95%",
    //backgroundColor: "#070C35",
    //  backgroundColor: "red",

    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    //justifyContent:"center"
  },
  backArrowParent: {
    // backgroundColor: 'green',
  },
  backArrowContainer: {
    // position: "absolute",
    left: 8,
    //top: "29%",
    // transform: [{ translateY: -12 }],
    // zIndex: 1, // Ensure it's on top
  },
  backArrow: {
    width: 30,
    height: 30,
    tintColor: "#CDD2F8",
  },
  heading: {
    marginLeft: "10%",
  },
  header: {
    color: "#CDD2F8",
    fontSize: 25,
    fontWeight: "900",
    // marginLeft: '-4%',
  },
  container: {
    paddingHorizontal: 15,
    paddingVertical: 25,
    height: "90%",
    position: "relative",
    // marginTop: -(0.77 * StatusBar.currentHeight),
    backgroundColor: "#f5f5f5",
    //backgroundColor: "red",

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  topper: {
    flexDirection: "row",
    alignItems: "center",
    // marginTop: '3%',
    marginBottom: "5%",
  },
  topperText: {
    marginLeft: "5%",
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
    color: "#FF0B45",
  },
  button: {
    backgroundColor: "#00103D",
    padding: 12,
    borderRadius: 20,
    alignItems: "center",
    marginTop: "5%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  loader: {
    height: 18.1,
  },
});

export default RegistrationScreen;
