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
        <Button onPress={() => this.props.navigation.navigate('HomeScreen')} title="Home" />
      </View>
    )
  }
};

export default NewRecordScreen;