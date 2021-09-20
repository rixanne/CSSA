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
      recipients: ['info@bandbwg.com'],
      subject: 'Inquiry',
      body: 'To whom it may concern:'
    });
  }

  render() {
    return (
      <ScrollView>
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
          <Card title={'Contact Information'} wrapperStyle={{ margin: 20 }}>
            <Text style={{ marginBottom: 2 }}>{'B&B Window and Gutter Cleaning'}</Text>
            <Text style={{ marginBottom: 2 }}>{'P.O. Box 2344'}</Text>
            <Text style={{ marginBottom: 2 }}>{'Orangevale, CA 95662'}</Text>
            <Text style={{ marginBottom: 10 }}>{'U.S.A.'}</Text>
            <Text style={{ marginBottom: 2 }}>{'Phone: 1-510-644-1415'}</Text>
            <Text style={{ marginBottom: 2 }}>{'Email: info@bandbwg.com'}</Text>

            <Button
              title="Call Us"
              buttonStyle={{ backgroundColor: '#3b70b0', margin: 10 }}
              icon={
                <Icon
                  name="phone"
                  type="font-awesome"
                  color="#fff"
                  iconStyle={{ marginRight: 10 }}
                />
              }
              onPress={() => Linking.openURL('tel:1-510-644-1415')}
            />

            <Button
              title="Send Email"
              buttonStyle={{ backgroundColor: '#3b70b0', margin: 10 }}
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
