import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Icon } from 'react-native-elements'

import RecordsList from '../components/RecordsList';


/*
  
*/

export class RecordsListScreen extends Component {
static navigationOptions = {
    title: 'My Records'
  };

  render() {
    return (
      <View>
              <RecordsList> </RecordsList>
              <Icon
                raised
                name='heartbeat'
                type='font-awesome'
                color='#f50'
              onPress={() => this.props.navigation.navigate('NewRecordScreen')} />
           
               </View>
    )
  }
};

export default RecordsListScreen;