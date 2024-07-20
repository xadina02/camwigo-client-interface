import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import CustomModal from "../components/CustomModal";
import { useNavigation } from "@react-navigation/native";
import useMakeReservation from "../utils/useMakeReservation";
import useMakePayment from "../utils/useMakePayment";
import useReservationStore from "../zustand/useReservationStore";
import useUserStore from "../zustand/useUserStore";
import Delimiter from "../assets/delimiterForm.png";

const PaymentMethodCard = ({
  imageSource,
  paymentMethodName,
  isSelected,
  onCardSelect,
}) => {
  const navigation = useNavigation();

  const [accountNumber, setAccountNumber] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const { reservation, loading1, makeReservation } = useMakeReservation();
  const { payment, loading2, makePayment } = useMakePayment();
  const { journeyId, seats, totalPrice } = useReservationStore((state) => ({
    journeyId: state.journeyId,
    seats: state.seats,
    totalPrice: state.totalPrice,
  }));
  const { accessToken } = useUserStore((state) => ({
    accessToken: state.accessToken,
  }));
  const clearReservation = useReservationStore(state => state.clearReservation);

  const appToken = "sekurity$227";

  const handlePay = async () => {
    console.log("Account Number:", accountNumber);
    console.log("Amount to Pay:", totalPrice);
    setLoading(true)
    await makeReservation(
      accessToken,
      journeyId,
      appToken,
      {
        position: seats,
      },
      async (fetchedReservation) => {
        await makePayment(
          fetchedReservation.id,
          appToken,
          {
            amount: totalPrice,
          },
          () => {
            setLoading(false)
            openModal()
          }
        );
      }
    );

    // clearReservation()
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
              value={totalPrice}
              placeholder={`XAF ${totalPrice}`}
              keyboardType="numeric"
              editable={false}
              selectTextOnFocus={false}
            />
            <TouchableOpacity
              style={styles.payButton}
              onPress={handlePay}
            >
              {loading ? (
              <ActivityIndicator
                size="large"
                color="#f5f5f5"
                style={styles.loader}
              />
            ) : (
              <Text style={styles.payButtonText}>Pay</Text>
            )}
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
  loader: {
    height: 18.1,
  },
});

export default PaymentMethodCard;
