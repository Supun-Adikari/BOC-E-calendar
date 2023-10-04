import { Text } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Dimensions,
  Modal
} from "react-native";
import {
  CalendarProvider,
  TimelineList,
  WeekCalendar,
} from "react-native-calendars";
import { set } from "react-native-reanimated";

const INITIAL_TIME = { hour: 9, minutes: 0 };
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const Weekly = () => {
  const navigation = useNavigation();
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // To control modal visibility
  const [timeObject, setTimeObject] = useState(INITIAL_TIME);
  const [selectedOption, setSelectedOption] = useState(null);

  const onDateChanged = (date, updateSource) => {
    console.log("Weekly onDateChanged: ", date, updateSource);
    setCurrentDate(date);
    console.log("Current Date", currentDate);
  };

  const createNewEvent = (timeString, timeObject) => {
    console.log("Weekly createNewEvent: ", timeString, timeObject);
    setTimeObject(timeObject);
    setModalVisible(true);
    console.log("Modal Visible", modalVisible);
    console.log("Time Object1", timeObject);
  };
  const timelineProps = {
    format24h: true,
    onBackgroundLongPress: createNewEvent,
    // Add any other timeline properties you need
  };
  const handleChoice = (choice) => {
    setSelectedOption(choice);
    console.log("Modal Visible1", modalVisible);
    setModalVisible(false);

    // Navigate to the appropriate screen with selected choice, date, and time
    navigation.navigate(choice, {
      date: currentDate,
      time: `${timeObject.hour}:${timeObject.minutes}`,
      // choice: choice,
    });
  };
  return (
    <CalendarProvider
      date={currentDate}
      onDateChanged={onDateChanged}
      showTodayButton
    >
      <View style={styles.container}>
        <WeekCalendar />
        {/* You can add other components or headers here */}
        <TimelineList
          events={events}
          timelineProps={{ onBackgroundLongPress: createNewEvent }}
          showNowIndicator
          scrollToFirst={false}
          // initialTime={INITIAL_TIME}
        />
      </View>

      {/* Modal for creating an event, reminder, or appointment */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          console.log("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Select an Option:</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleChoice("CreateEvent")}
            >
              <Text style={styles.modalButtonText}>Create Event</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleChoice("CreateReminder")}
            >
              <Text style={styles.modalButtonText}>Create Reminder</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleChoice("CreateAppointment")}
            >
              <Text style={styles.modalButtonText}>Create Appointment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </CalendarProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Add any other styles you need for the container
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: "7%",
    borderRadius: width * 0.02,
    alignItems: "center",
  },
  modalText: {
    fontSize: height * 0.02,
    fontWeight: "bold",
    marginBottom: height * 0.02,
  },
  modalButton: {
    backgroundColor: "#FCC507AB",
    padding: "3.5%",
    borderRadius: 5,
    margin: height * 0.01,
  },
  modalButtonText: {
    fontSize: height * 0.02,
    // fontWeight: 'bold',
    color: "black",
  },
});

export default Weekly;
