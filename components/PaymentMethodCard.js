import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import Delimiter from "../assets/delimiterForm.png";

// Define the PaymentMethodButton component
const PaymentMethodCard = ({
  imageSource,
  paymentMethodName,
  isSelected,
  onCardSelect,
}) => {
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");

  // Handle form submission
  const handlePay = () => {
    console.log("Account Number:", accountNumber);
    console.log("Amount to Pay:", amount);
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
        <>
          <Image source={Delimiter} style={styles.delimiter} />
          <View style={styles.form}>
            <Text style={styles.label}>Account number</Text>
            <TextInput
              style={styles.input}
              value={accountNumber}
              onChangeText={setAccountNumber}
              placeholder="Enter account number"
            />
            <Text style={styles.label}>Amount to pay</Text>
            <TextInput
              style={styles.input}
              value={amount}
              onChangeText={setAmount}
              placeholder="Enter amount"
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.payButton} onPress={handlePay}>
              <Text style={styles.payButtonText}>Pay</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

// Define the styles
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
    // backgroundColor: "bisque",
  },
  card: {
    // flex: 1,
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
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  payButton: {
    backgroundColor: "#000080",
    borderRadius: 5,
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
});

export default PaymentMethodCard;
