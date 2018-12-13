import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

import NewRecordForm from '../components/NewRecordForm';

export class NewRecordScreen extends Component {
  static navigationOptions = {
    title: 'Log new record'
  };

  render() {
    return (
      <View>
        <NewRecordForm> </NewRecordForm>
      </View>
    )
  }
};

export default NewRecordScreen;