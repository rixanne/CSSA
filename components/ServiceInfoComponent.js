import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  FlatList,
  Modal,
  Button,
  StyleSheet,
  Alert,
  PanResponder,
  Share
} from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { postComment } from '../redux/ActionCreators';
import { postFavorite } from '../redux/ActionCreators';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = (state) => {
  return {
    services: state.services,
    comments: state.comments,
    favorites: state.favorites
  };
};

const mapDispatchToProps = {
  postFavorite: (serviceId) => postFavorite(serviceId),
  postComment: (serviceId, rating, author, text) => postComment(serviceId, rating, author, text)
};

function RenderService(props) {
  const { service } = props;

  const view = React.createRef();

  const recognizeDrag = ({ dx }) => (dx < -200 ? true : false);

  const recognizeComment = ({ dx }) => (dx > 200 ? true : false);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      view.current
        .rubberBand(1000)
        .then((endState) => console.log(endState.finished ? 'finished' : 'canceled'));
    },
    onPanResponderEnd: (e, gestureState) => {
      console.log('pan responder end', gestureState);
      if (recognizeDrag(gestureState)) {
        Alert.alert(
          'Add Favorite',
          'Are you sure you wish to add' + service.name + 'to favorite?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
              onPress: () => console.log('Cancel Pressed')
            },
            {
              text: 'OK',
              onPress: () =>
                props.favorite ? console.log('Already set as a favorite') : props.markFavorite()
            }
          ],
          { cancelable: false }
        );
      } else if (recognizeComment(gestureState)) {
        props.onShowModal();
      }
    }
  });

  const shareService = (title, message, url) => {
    Share.share(
      {
        title: title,
        message: `${title}: ${message} ${url}`,
        url: url
      },
      {
        dialogTitle: 'Share ' + title
      }
    );
  };

  if (service) {
    return (
      <Animatable.View
        animation="fadeInDown"
        duration={2000}
        delay={1000}
        ref={view}
        {...panResponder.panHandlers}
      >
        <Card featuredTitle={service.name} image={{ uri: baseUrl + service.image }}>
          <Text style={{ margin: 10 }}>{service.description}</Text>
          <View style={styles.cardRow}>
            <Icon
              name={props.favorite ? 'star' : 'star-o'}
              type="font-awesome"
              color="#f50"
              raised
              reverse
              onPress={() =>
                props.favorite ? console.log('Already a favorite') : props.markFavorite()
              }
            />
            <Icon
              name="pencil"
              type="font-awesome"
              color="#3b70b0"
              raised
              reverse
              onPress={() => {
                props.onShowModal();
              }}
            />
            <Icon
              name={'share'}
              type="font-awesome"
              color="#3b70b0"
              raised
              reverse
              onPress={() =>
                shareService(service.name, service.description, baseUrl + service.image)
              }
            />
          </View>
        </Card>
      </Animatable.View>
    );
  }
  return <View />;
}

function RenderComments({ comments }) {
  const renderCommentItem = ({ item }) => {
    return (
      <View style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.text}</Text>
        <Rating
          startingValue={item.rating}
          imageSize={10}
          style={{ alignItems: 'flex-start', paddingVerical: '5%' }}
          readonly={true}
        />
        <Text style={{ fontSize: 12 }}>{`--${item.text}, ${item.date}`}</Text>
      </View>
    );
  };

  return (
    <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
      <Card title="Comments">
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCommentItem}
        />
      </Card>
    </Animatable.View>
  );
}
class ServiceInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      rating: 5,
      author: '',
      text: ''
    };
  }

  markFavorite(serviceId) {
    this.props.postFavorite(serviceId);
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handleComment(serviceId) {
    this.props.postComment(serviceId, this.state.rating, this.state.author, this.state.text);
    this.toggleModal();
  }

  resetForm() {
    this.setState({
      favorite: false,
      showModal: false,
      rating: 5,
      author: '',
      text: ''
    });
  }
  static navigationOptions = {
    title: 'Service Information'
  };

  render() {
    const serviceId = this.props.navigation.getParam('serviceId');
    const service = this.props.services.services.filter((service) => service.id === serviceId)[0];
    const comments = this.props.comments.comments.filter(
      (comment) => comment.serviceId === serviceId
    );
    return (
      <ScrollView>
        <RenderService
          service={service}
          favorite={this.props.favorites.includes(serviceId)}
          markFavorite={() => this.markFavorite(serviceId)}
          onShowModal={() => this.toggleModal()}
        />
        <RenderComments comments={comments} />
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={() => this.toggleModal()}
        >
          <View style={styles.modal}>
            <Rating
              showRating={true}
              startingValue={this.state.rating}
              imageSize={40}
              onFinishRating={(rating) => this.setState({ rating: rating })}
              style={{ paddingVerical: 10 }}
            />
            <Input
              placeholder="Author"
              leftIcon={{ type: 'font-awesome', name: 'user-o' }}
              leftIconContainerStyle={{ paddingRight: 10 }}
              onChangeText={(author) => {
                this.setState({ author: author });
              }}
              value={this.state.author}
            />
            <Input
              placeholder="Comment"
              leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
              leftIconContainerStyle={{ paddingRight: 10 }}
              onChangeText={(text) => {
                this.setState({ text: text });
              }}
              value={this.state.text}
            />
            <View>
              <Button
                title="Submit"
                color="#5637DD"
                onPress={() => {
                  this.handleComment(serviceId);
                  this.resetForm();
                }}
              />
            </View>
            <View style={{ margin: 10 }}>
              <Button
                onPress={() => {
                  this.toggleModal();
                  this.resetForm();
                }}
                color="#808080"
                title="Cancel"
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  cardRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 20
  },
  modal: {
    justifyContent: 'center',
    margin: 20
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(ServiceInfo);
