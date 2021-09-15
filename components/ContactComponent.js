import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
class Contact extends Component {
  static navigationOptions = {
    title: 'Contact Us'
  };

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
          </Card>
        </Animatable.View>
      </ScrollView>
    );
  }
}
export default Contact;
