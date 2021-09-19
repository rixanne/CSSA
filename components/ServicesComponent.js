import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = (state) => {
  return {
    services: state.services
  };
};

class Services extends Component {
  static navigationOptions = {
    title: 'Services'
  };

  render() {
    const { navigate } = this.props.navigation;

    const renderServicesItem = ({ item }) => {
      return (
        <Animatable.View animation="fadeInRightBig" duration={2000}>
          <Tile
            title={item.name}
            caption={item.description}
            featured
            onPress={() => navigate('ServiceInfo', { serviceId: item.id })}
            imageSrc={{ uri: baseUrl + item.image }}
          />
        </Animatable.View>
      );
    };

    if (this.props.services.isLoading) {
      return <Loading />;
    }
    if (this.props.services.errMess) {
      return (
        <View>
          <Text>{this.props.services.errMess}</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={this.props.services.services}
        renderItem={renderServicesItem}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  }
}

export default connect(mapStateToProps)(Services);
