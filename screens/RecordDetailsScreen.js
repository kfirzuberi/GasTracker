import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Icon } from 'react-native-elements'

import RecordDetails from '../components/RecordDetails';


export class RecordDetailsScreen extends Component {
  static navigationOptions = {
    title: 'Records Details'
  };

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('item', 'NO-ID');

    return (
      <View>
        <RecordDetails item={item}> </RecordDetails>
        <Icon
          raised
          name='gear'
          type='font-awesome'
          color='#f50'
          onPress={() => this.props.navigation.navigate('HomeScreen')} />
      </View>
    )
  }
};

export default RecordDetailsScreen;