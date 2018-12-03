import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Image, TextInput, ScrollView, Button } from 'react-native';


import { connect } from 'react-redux'
import { globalOperations } from '../duck/index';

import GasStationSelector from './GasStationSelector';

//
class NewRecordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 0,
      liters: 0,
      km: 0,
      gasStation: ''
    };
  }

  handleOnPress = event => {
    this.props.addNewRecord(this.state);
  }

  render() {

    return (
      <View>


        <View style={styles.fieldRow}>
          <Image style={styles.fieldIcon} source={require('../assets/images/formIcons/price.png')} />

          <TextInput
            style={styles.fieldInputText}
            placeholder="0" onChangeText={(price) => this.setState({ price })}
          />
          <Text style={styles.label}>₪ </Text>
        </View>


        <View style={styles.fieldRow}>
          <Image style={styles.fieldIcon} source={require('../assets/images/formIcons/liter.png')} />


          <TextInput
            style={styles.fieldInputText}
            placeholder="0" onChangeText={(liters) => this.setState({ liters })}
          />
          <Text style={styles.label}>Liters </Text>
        </View>



        <View style={styles.fieldRow}>
          <Image style={styles.fieldIcon} source={require('../assets/images/formIcons/km.png')} />


          <TextInput
            style={styles.fieldInputText}
            placeholder="0" onChangeText={(km) => this.setState({ km })}
          />
          <Text style={styles.label}>KM </Text>
        </View>

        <View style={styles.fieldRow}>
          <Image style={styles.fieldIcon} source={require('../assets/images/formIcons/gas.png')} />

          <GasStationSelector updateGasStation={(gasStation) => { this.setState({ gasStation }) }} />
        </View>
        <Button
          onPress={this.handleOnPress}
          title="Save"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        /></View>
    );
  }
}

const styles = StyleSheet.create({
  fieldIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginLeft: 10,
    marginRight: 10
  },

  fieldInputText: {
    height: 40,
    fontSize: 32
  },
  fieldRow: { flex: 1, flexDirection: 'row', marginBottom: 10 },
  label: {
    height: 40,
    fontSize: 14,
    marginTop: 20
  }

});


const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  addNewRecord: newRecord => dispatch(globalOperations.addNewRecordDispatcher(newRecord))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewRecordForm)