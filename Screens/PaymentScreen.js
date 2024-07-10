import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import PaymentMethodCard from "../components/PaymentMethodCard";
import BackArrow from "../assets/arrow-circle-left.png";
import MtnLogo from "../assets/mtn_momo.png";
import OrangeLogo from "../assets/orange_money.png";
import StripeLogo from "../assets/stripe.jpg";
import VisaLogo from "../assets/visa.png";

const PaymentScreen = ({ route }) => {
  const navigation = useNavigation();
  const { journey } = route.params;
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardSelect = (cardName) => {
    setSelectedCard((prevCard) => (prevCard === cardName ? null : cardName));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#070C35" />
      <View style={styles.backgroundDiv}>
        <View style={styles.another}>
          <View>
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
            <Text style={styles.header}>Make Payment</Text>
          </View>
        </View>
      </View>

      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
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
            imageSource={VisaLogo}
            paymentMethodName="Visa Card Pay"
            isSelected={selectedCard === "Visa Card Pay"}
            onCardSelect={() => handleCardSelect("Visa Card Pay")}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: "#f5f5f5",
    backgroundColor: "#070c35",
  },
  backgroundDiv: {
    height: "12%",
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
  backArrowContainer: {
    // position: "absolute",
    left: 15,
    //top: "29%",
    // transform: [{ translateY: -12 }],
    // zIndex: 1, // Ensure it's on top
  },
  backArrow: {
    width: 30,
    height: 30,
    tintColor: "#CDD2F8",
  },
  header: {
    color: "#CDD2F8",
    fontSize: 25,
    fontWeight: "900",
  },
  container: {
    paddingHorizontal: 15,
    paddingVertical: 25,
    height: "90%",
    position: "relative",
    // marginTop: -(0.77 * StatusBar.currentHeight),
    backgroundColor: "#fff",
    //backgroundColor: "red",

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 20,
    color: "#070C35",
  },
  heading: {
    marginLeft: "20%",
  },
});

export default PaymentScreen;
