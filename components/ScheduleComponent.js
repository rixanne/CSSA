import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Animatable from 'react-native-animatable';

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windows: 1,
      gutters: false,
      date: new Date(),
      showCalendar: false
    };
  }

  static navigationOptions = {
    title: 'Schedule Services'
  };

  handleSchedule() {
    console.log(JSON.stringify(this.state));
  }
  resetForm() {
    this.setState({
      windows: 1,
      gutters: false,
      date: new Date(),
      showCalendar: false
    });
  }

  async presentLocalNotification(date) {
    function sendNotification() {
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true
        })
      });

      Notifications.scheduleNotificationAsync({
        content: {
          title: 'Your Service Schedule Search',
          body: `Search for ${date} requested`
        },
        trigger: null
      });
    }

    let permissions = await Notifications.getPermissionsAsync();
    if (!permissions.granted) {
      permissions = await Notifications.requestPermissionsAsync();
    }
    if (permissions.granted) {
      sendNotification();
    }
  }

  render() {
    return (
      <ScrollView>
        <Animatable.View animation="zoomIn" duration={2000} delay={1000}>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Number of Windows</Text>
            <Picker
              style={styles.formItem}
              selectedValue={this.state.windows}
              onValueChange={(itemValue) => this.setState({ windows: itemValue })}
            >
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="6" />
              <Picker.Item label="7" value="7" />
              <Picker.Item label="8" value="8" />
              <Picker.Item label="9" value="9" />
              <Picker.Item label="10" value="10" />
              <Picker.Item label="11" value="11" />
              <Picker.Item label="12" value="12" />
              <Picker.Item label="13" value="13" />
              <Picker.Item label="14" value="14" />
              <Picker.Item label="15" value="15" />
              <Picker.Item label="More than 15" value="16" />
            </Picker>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Add Gutters?</Text>
            <Switch
              style={styles.formItem}
              value={this.state.gutters}
              trackColor={{ true: '#3b70b0', false: null }}
              onValueChange={(value) => this.setState({ gutters: value })}
            />
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Date</Text>
            <Button
              onPress={() => this.setState({ showCalendar: !this.state.showCalendar })}
              title={this.state.date.toLocaleDateString('en-US')}
              color="#3b70b0"
              accessibilityLabel="Tap me to select Schedule date"
            />
          </View>
          {this.state.showCalendar && (
            <DateTimePicker
              value={this.state.date}
              mode={'date'}
              display="default"
              onChange={(event, selectedDate) => {
                selectedDate && this.setState({ date: selectedDate, showCalendar: false });
              }}
              style={styles.formItem}
            />
          )}
          <View style={styles.formRow}>
            <Button
              onPress={() =>
                Alert.alert(
                  'Begin Search?',
                  'Number of Windows ' +
                    this.state.windows +
                    '\n' +
                    'Gutters ' +
                    this.state.gutters +
                    '\n' +
                    'Date:' +
                    this.state.date.toLocaleDateString('en-US'),
                  [
                    {
                      text: 'Cancel',
                      style: 'cancel'
                    },
                    {
                      text: 'OK'
                    }
                  ]
                )
              }
              title="Search"
              color="#3b70b0"
              accessibilityLabel="Tap me to search for available services to schedule"
            />
          </View>
        </Animatable.View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  formRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 20
  },
  formLabel: {
    fontSize: 18,
    flex: 2
  },
  formItem: {
    flex: 1
  },
  modal: {
    justifyContent: 'center',
    margin: 20
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#3b70b0',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 20
  },
  modalText: {
    fontSize: 18,
    margin: 10
  }
});
export default Schedule;
