import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import CustomModal from "../components/CustomModal";
import { useNavigation } from "@react-navigation/native";
import Delimiter from "../assets/delimiterForm.png";

const PaymentMethodCard = ({
  imageSource,
  paymentMethodName,
  isSelected,
  onCardSelect,
  data,
}) => {
  const navigation = useNavigation();

  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState(data.fare);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePay = () => {
    console.log("Account Number:", accountNumber);
    console.log("Amount to Pay:", amount);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    navigation.navigate("LandingScreen", { myActiveTab: "Ticket" });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onCardSelect} style={styles.card}>
        <Image source={imageSource} style={styles.image} />
        <Text style={styles.text}>{paymentMethodName}</Text>
        {isSelected && (
          <Image
            source={require("../assets/selected-type.png")}
            style={styles.tick}
          />
        )}
      </TouchableOpacity>

      {isSelected && (
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          nestedScrollEnabled={true} // This ensures that scrolling inside the card works independently
        >
          <Image source={Delimiter} style={styles.delimiter} />
          <View style={styles.form}>
            <Text style={styles.label}>Account number</Text>
            <TextInput
              style={styles.input}
              value={accountNumber}
              onChangeText={setAccountNumber}
              placeholder="Enter account number"
              keyboardType="numeric"
            />
            <Text style={styles.label}>Amount to pay</Text>
            <TextInput
              style={styles.input}
              value={amount}
              onChangeText={setAmount}
              placeholder="Enter amount"
              keyboardType="numeric"
              editable={false}
              selectTextOnFocus={false}
            />
            <TouchableOpacity
              style={styles.payButton}
              onPress={openModal}
              // onPress={() => navigation.navigate("RegistrationScreen")}
            >
              <Text style={styles.payButtonText}>Pay</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      <CustomModal
        visible={modalVisible}
        onClose={closeModal}
        icon={require("../assets/success-tick.png")}
        headerText="Success"
        bodyText="Your payment was successfully received."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  image: {
    width: 90,
    height: 35,
    marginRight: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
  },
  text: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 2,
  },
  tick: {
    width: 20,
    height: 20,
  },
  form: {
    padding: 10,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  payButton: {
    backgroundColor: "#070C35",
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: "center",
  },
  payButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  delimiter: {
    marginTop: 5,
    marginBottom: 3,
    width: "100%",
  },
  scrollViewContent: {
    paddingVertical: 10,
    flexGrow: 1,
  },
});

export default PaymentMethodCard;
