import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import PaymentMethodCard from "../components/PaymentMethodCard";
import BackArrow from "../assets/arrow-circle-left.png";
import MtnLogo from '../assets/mtn_momo.png';
import OrangeLogo from '../assets/orange_money.png';
import StripeLogo from '../assets/stripe.jpg';
import VisaLogo from '../assets/visa.png';

const PaymentScreen = ({ route }) => {
  const navigation = useNavigation();
  const { journey } = route.params;
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardSelect = (cardName) => {
    setSelectedCard(prevCard => (prevCard === cardName ? null : cardName));
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
          <Text style={styles.header}>Make Payment</Text>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Choose payment method</Text>
        <PaymentMethodCard
          imageSource={MtnLogo}
          paymentMethodName="MTN Mobile Money"
          isSelected={selectedCard === "MTN Mobile Money"}
          onCardSelect={() => handleCardSelect("MTN Mobile Money")}
        />
        <PaymentMethodCard
          imageSource={OrangeLogo}
          paymentMethodName="Orange Money"
          isSelected={selectedCard === "Orange Money"}
          onCardSelect={() => handleCardSelect("Orange Money")}
        />
        <PaymentMethodCard
          imageSource={StripeLogo}
          paymentMethodName="Stripe Test Pay"
          isSelected={selectedCard === "Stripe Test Pay"}
          onCardSelect={() => handleCardSelect("Stripe Test Pay")}
        />
        <PaymentMethodCard
          imageSource={VisaLogo}
          paymentMethodName="Visa Card Pay"
          isSelected={selectedCard === "Visa Card Pay"}
          onCardSelect={() => handleCardSelect("Visa Card Pay")}
        />
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
    paddingVertical: 25,
    height: "93%",
    marginTop: -(1.77 * StatusBar.currentHeight),
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: 'center',
    marginBottom: 20,
    color: '#070C35'
  },
});

export default PaymentScreen;
