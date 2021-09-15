import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as MailComposer from 'expo-mail-composer';
import * as Animatable from 'react-native-animatable';

class Contact extends Component {
  static navigationOptions = {
    title: 'Contact Us'
  };

  sendMail() {
    MailComposer.composeAsync({
      recipients: ['campsites@nucamp.co'],
      subject: 'Inquiry',
      body: 'To whom it may concern:'
    });
  }

  render() {
    return (
      <ScrollView>
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
          <Card title={'Contact Information'} wrapperStyle={{ margin: 20 }}>
            <Text style={{ marginBottom: 2 }}>{'1 Nucamp Way'}</Text>
            <Text style={{ marginBottom: 2 }}>{'Seattle, Wa, 98001'}</Text>
            <Text style={{ marginBottom: 10 }}>{'U.S.A'}</Text>
            <Text style={{ marginBottom: 2 }}>{'Phone: 1-206-555-1234'}</Text>
            <Text style={{ marginBottom: 2 }}>{'Email: campsites@nucamp.co'}</Text>
            <Button
              title="Send Email"
              buttonStyle={{ backgroundColor: '#5637DD', margin: 40 }}
              icon={
                <Icon
                  name="envelope-o"
                  type="font-awesome"
                  color="#fff"
                  iconStyle={{ marginRight: 10 }}
                />
              }
              onPress={() => this.sendMail()}
            />
          </Card>
        </Animatable.View>
      </ScrollView>
    );
  }
}
export default Contact;
