import React from "react";
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
// import { captureRef } from "react-native-view-shot";
// import RNFetchBlob from "rn-fetch-blob";
// import PDFLib, { PDFDocument, PDFPage } from "react-native-pdf-lib";
import BackArrow from "../assets/arrow-circle-left.png";
import JourneyFleetDetails from "../components/JourneyFleetDetails";
import DownloadIcon from "../assets/download.png";
import useUserStore from "../zustand/useUserStore";
import ProfileIcon from "../assets/default_profile.png";
import DashedLine from "../assets/dashed-line.png";
import QrCode from "../assets/qr_code.png"; // Temporal

const TicketDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { journey } = route.params;

  const { firstName, lastName } = useUserStore((state) => ({
    firstName: state.firstName,
    lastName: state.lastName,
  }));

  const baseUrl = "http://192.168.107.124:8000";
  const imageBaseUrl = `${baseUrl}/storage`;
  const imageIconLink = `${imageBaseUrl}${journey.QR_code_image_link}`;

  const generatePDF = async () => {
    //
  };

  const handleDownload = () => {
    generatePDF();
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
          <Text style={styles.header}>Ticket Details</Text>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.ticketBox}>
          <View style={styles.profileContainer}>
            <Image source={ProfileIcon} style={styles.profileImage} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{`${firstName} ${lastName}`}</Text>
              <Text style={styles.userType}>Passenger</Text>
            </View>
          </View>
          <View style={styles.breaker}>
            <View style={styles.ticketCut}></View>
            <Image source={DashedLine} style={styles.delimiter} />
            <View style={styles.ticketCut}></View>
          </View>
          <View style={styles.fleetDetails}>
            <JourneyFleetDetails
              journey={journey.reservation.vehicle_route_destination}
              seating={false}
              status={false}
              none={true}
            />
          </View>
          <View style={styles.breaker}>
            <View style={styles.ticketCut}></View>
            <Image source={DashedLine} style={styles.delimiter} />
            <View style={styles.ticketCut}></View>
          </View>
          <View style={styles.statusContainer}>
            <View style={styles.statusBox}>
              <Text style={styles.statusLabel}>Status</Text>
              <View style={styles.detailBox}>
                <Text
                  style={
                    journey.status === "used" ? styles.status : styles.type
                  }
                >
                  {journey.status.toUpperCase()}
                </Text>
              </View>
            </View>
            <View style={styles.positionBox}>
              <Text style={styles.positionLabel}>Position</Text>
              <View style={styles.detailBox}>
                <Text
                  style={styles.position}
                >{`${journey.reservation.reservation_positions
                  .map((position) => position.seat_number)
                  .join(", ")}`}</Text>
              </View>
            </View>
          </View>
          <View style={styles.qrCodeContainer}>
            <Image source={{ uri: imageIconLink }} style={styles.qrCode} />
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleDownload}>
          <Text style={styles.buttonText}>
            <Image source={DownloadIcon} style={styles.downloadIcon} /> Download
            Ticket
          </Text>
        </TouchableOpacity>
      </View>
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
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: "15%",
    justifyContent: "left",
    padding: 25,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flexDirection: "column",
    marginLeft: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  userType: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#A1A3AE",
  },
  fleetDetails: {
    backgroundColor: "#ffffff",
    padding: 10,
    marginVertical: 15,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 7,
    borderRadius: 20,
  },
  ticketCut: {
    backgroundColor: "#D9DBE7",
    width: 25,
    height: 25,
    borderRadius: 15,
  },
  breaker: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -10,
    marginBottom: -5,
  },
  button: {
    backgroundColor: "#00103D",
    padding: 12,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  label: {
    fontWeight: "bold",
  },
  ticketBox: {
    padding: 10,
    backgroundColor: "#ffffff",
    height: "92%",
    // shadowColor: "#000",
    // shadowOffset: { width: 4, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 7,
    borderRadius: 20,
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  statusBox: {
    alignItems: "center",
    marginRight: 5,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  statusValue: {
    fontSize: 16,
    color: "green",
    fontWeight: "bold",
  },
  positionBox: {
    // flex: 1,
    alignItems: "center",
    marginLeft: 5,
  },
  positionLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  positionValue: {
    fontSize: 16,
    color: "blue",
    fontWeight: "bold",
  },
  type: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#18BA82",
    backgroundColor: "#E0F4EC",
    paddingHorizontal: 30,
    paddingVertical: 6,
    borderRadius: 5,
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FF0B45",
    backgroundColor: "#FCB9BD",
    paddingHorizontal: 30,
    paddingVertical: 6,
    borderRadius: 5,
  },
  position: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#070C35",
    backgroundColor: "#ABB5FE",
    paddingHorizontal: 30,
    paddingVertical: 2,
    borderRadius: 5,
  },
  qrCodeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  qrCode: {
    width: 280,
    height: 280,
  },
  downloadIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  delimiter: {
    width: "98%",
  },
});

export default TicketDetailsScreen;
