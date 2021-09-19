import React, { Component } from 'react';
import { ScrollView, Text, FlatList } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = (state) => {
  return {
    partners: state.partners
  };
};

class About extends Component {
  static navigationOptions = {
    title: 'About Us'
  };

  render() {
    const renderPartner = ({ item }) => {
      return (
        <ListItem
          title={item.name}
          subtitle={item.description}
          leftAvatar={{ source: { uri: baseUrl + item.image } }}
        />
      );
    };

    if (this.props.partners.isLoading) {
      return (
        <ScrollView>
          <Mission />
          <Card title="Mission">
            <Loading />
          </Card>
        </ScrollView>
      );
    }
    if (this.props.partners.errMess) {
      return (
        <ScrollView>
          <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
            <Mission />
            <Card title="Mission">
              <Text>{this.props.partners.errMess}</Text>
            </Card>
          </Animatable.View>
        </ScrollView>
      );
    }
    return (
      <ScrollView>
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
          <Mission />
          <Card title="Social Media">
            <FlatList
              data={this.props.partners.partners}
              renderItem={renderPartner}
              keyExtractor={(item) => item.id.toString()}
            />
          </Card>
          <Bandb />
        </Animatable.View>
      </ScrollView>
    );
  }
}

function Mission() {
  return (
    <Card title="Our Mission">
      <Text>
        {
          'B & B Window and Gutter Cleaning specializes in window, gutter, solar panel cleaning, and pressure washing services. We have a working philosophy of high quality, trust and building lasting relationships with our clients. We try to please every client with friendly service and an attention to detail.'
        }
      </Text>
    </Card>
  );
}

function Bandb() {
  return (
    <Card title="About Us">
      <Text>
        {
          'Ben started B&B in 2003 with his father Bill while he was attending the University of California, Berkeley and Bill was teaching science in middle school. The business was started as a way for Ben to pay for college and for Bill to make extra money in the summer. After graduating Ben decided to continue running the business due to its success and flexibility and Bill still helps out in the summer.'
        }
      </Text>
    </Card>
  );
}
/*testing this comment for git*/
export default connect(mapStateToProps)(About);
