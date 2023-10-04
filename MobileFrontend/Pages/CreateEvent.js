import {
  Avatar,
  ChevronDownIcon,
  GluestackUIProvider,
  Icon,
  Input,
  InputField,
  SearchIcon,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  Textarea,
  TextareaInput,
  config,
  DatePicker,
} from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  StatusBar,
  Dimensions,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { set } from "react-native-reanimated";
import { listTimeZones } from "timezone-support";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;



const CreateEvent = ({ route }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [Day, setDay] = useState(route.params.date);
  const [time, setTime] = useState(route.params.time);
  const [isCalendarVisible, setisCalendarvisible] = useState(false);
  console.log("date",route.params.date);
  console.log("time",route.params.time);
  const timezones = listTimeZones();
  const timeLst = time.split(":");
  const [startTimeHour,setStartTimeHour]= useState(timeLst[0]);
  const [startTimeMinute,setStartTimeMinute] = useState(timeLst[1]);
  const [finishingTimeHour,setFinishingTimeHour] = useState('');
  const [finishingTimeMinute,setFinishingTimeMinute] = useState('');
  const handleCreateEvent = () => {
    // You would typically send this data to your backend server,
    // which would then use the Google Calendar API to create the event.
    const eventData = {
      title,
      description,
      Day,
      time,
    };

    // Perform the API request to create the event here
    // (not shown in this simplified example).
  };
  // const handleDateChange = (newDate) => {
  //   // Update the Day state when the date is changed
  //   setDay(newDate);
  // };

  // useEffect(() => {
  //   setDay(route.params.date);
  //   setTime(route.params.time);
  // }, []);
  return (
    <GluestackUIProvider config={config.theme}>
      <View style={styles.container}>
        <Input
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputField placeholder="Add Title" />
        </Input>
        <Select>
          <SelectTrigger>
            <SelectInput placeholder="Account" />
            <SelectIcon mr="$3">
              <Icon as={ChevronDownIcon} />
            </SelectIcon>
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectItem label="Red" value="red" />
              <SelectItem label="Blue" value="blue" />
              <SelectItem label="Black" value="black" />
              <SelectItem label="Pink" value="pink" isDisabled={true} />
              <SelectItem label="Green" value="green" />
            </SelectContent>
          </SelectPortal>
        </Select>
        <Input
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputField placeholder="Date" />
        </Input>
        <Select>
          <SelectTrigger>
            <SelectInput
              placeholder="select Date"
              value={Day}
              onFocus={() => {
                setisCalendarvisible(false);
              }}
            />
            <SelectIcon mr="$3">
              <Icon as={ChevronDownIcon} />
            </SelectIcon>
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent >
            <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <Calendar 
              current={Day}
              onDayPress={(selectDay)=>{
                setDay(selectDay.dateString);
                setisCalendarvisible(false);
              }}
              />
            </SelectContent>
          </SelectPortal>
        </Select>
        <Input
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          {/* <DatePicker // Use the DatePicker component
            value={Day}
            onChange={handleDateChange}
          /> */}
          <InputField placeholder="Time" />
        </Input>


      {/* Start Time Input */}
      <View style={styles.timeContainer}>
        <Text>Start Time</Text>
        <TextInput
          style={styles.timeInput}
          value={startTimeHour}
          onChangeText={(text) => setStartTimeHour(text)}
          keyboardType="numeric"
          maxLength={2}
        />
        <Text>:</Text>
        <TextInput
          style={styles.timeInput}
          value={startTimeMinute}
          onChangeText={(text) => setStartTimeMinute(text)}
          keyboardType="numeric"
          maxLength={2}
        />
      </View>

      {/* Finishing Time Input */}
      <View style={styles.timeContainer}>
        <Text>Finishing Time</Text>
        <TextInput
          style={styles.timeInput}
          onChangeText={(text) => setFinishingTimeHour(text)}
          keyboardType="numeric"
          maxLength={2}
        />
        <Text>:</Text>
        <TextInput
          style={styles.timeInput}
          onChangeText={(text) => setFinishingTimeMinute(text)}
          keyboardType="numeric"
          maxLength={2}
        />
      </View>




        <Textarea
          size="md"
          isReadOnly={false}
          isInvalid={false}
          isDisabled={false}
          w="$full"
        >
          <TextareaInput placeholder="Description" />
        </Textarea>
        {/* select the time zone he wanted from this */}
        <Select>
          <SelectTrigger>
            <SelectInput placeholder="Time Zone" />
            <SelectIcon mr="$3">
              <Icon as={ChevronDownIcon} />
            </SelectIcon>
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectItem label="Red" value="red" />
              <SelectItem label="Blue" value="blue" />
              <SelectItem label="Black" value="black" />
              <SelectItem label="Pink" value="pink" isDisabled={false} />
              <SelectItem label="Green" value="green" />
            </SelectContent>
          </SelectPortal>
        </Select>
        <Select>
          <SelectTrigger>
            <SelectInput placeholder="Does not repeat" />
            <SelectIcon mr="$3">
              <Icon as={ChevronDownIcon} />
            </SelectIcon>
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectItem label="Repeat" value="repeat" />
              <SelectItem label="Does not repeat" value="doesnt" />
            </SelectContent>
          </SelectPortal>
        </Select>
        <Select>
          <SelectTrigger>
            <SelectInput placeholder="Color" />
            <SelectIcon mr="$3">
              <Icon as={ChevronDownIcon} />
            </SelectIcon>
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectItem label="Red" value="red" />
              <SelectItem label="Blue" value="blue" />
              <SelectItem label="Black" value="black" />
              <SelectItem label="Pink" value="pink" isDisabled={true} />
              <SelectItem label="Green" value="green" />
            </SelectContent>
          </SelectPortal>
        </Select>
        <Input
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputField placeholder="Attachments" />
        </Input>
        <Button title="Save Event" onPress={handleCreateEvent} />
      </View>
    </GluestackUIProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    width: "95%",
    marginLeft: "2.5%",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height*0.01,
    marginLeft: width*0.05,
  },
  timeInput: {
    width: 40,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginHorizontal: 4,
    textAlign: "center",
  },
});

export default CreateEvent;
