import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Image, TextInput, ScrollView, Button, Dimensions } from 'react-native';


import { connect } from 'react-redux'
import { globalOperations } from '../duck/index';

import GasStationSelector from './GasStationSelector';

  var widthWin = Dimensions.get('window').width; //full width
  var heightWin = Dimensions.get('window').height; //full height

    console.log("ssss" + widthWin);

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
   <View >

    <View style={styles.row}>
        <View style={styles.col}>
            <Image style={styles.imageIcon} source={require('../assets/images/formIcons/price.png')} />
            <TextInput style={styles.inputField} placeholder="0" onChangeText={(price) => this.setState({ price })}/>
            <Text style={styles.label}>₪ </Text>
        </View>
        <View style={styles.col}>
            <Image style={styles.imageIcon} source={require('../assets/images/formIcons/liter.png')} />
            <TextInput style={styles.inputField} placeholder="0" onChangeText={(liters) => this.setState({ liters })}/>
            <Text style={styles.label}>L</Text>
        </View>
    </View>

    <View style={styles.row}>
        <View style={styles.fullCol}>
            <Image style={styles.imageIcon} source={require('../assets/images/formIcons/km.png')} />
            <TextInput style={styles.inputField} placeholder="00000000" onChangeText={(km) => this.setState({ km })}/>
            <Text style={styles.label}>KM</Text>
        </View>
    </View>
      <View style={styles.row}>
        <View style={styles.fullCol}>
            <Image style={styles.imageIcon} source={require('../assets/images/formIcons/gas.png')} />
            <GasStationSelector updateGasStation={(gasStation) => { this.setState({ gasStation }) }} />
        </View>
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
row :{
    flexDirection: 'row',
    height: 80,
    padding: 5,
},
col:{
    padding: 5,
    flexDirection: 'row',
    flex: 0.5,
},
fullCol:{
    padding: 5,
    flexDirection: 'row',
    flex: 1,
},
imageIcon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginRight: 10
},
    inputField:{
    flex : 1,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    paddingBottom: 5,
    fontSize: 40,
    textAlign: 'center'
},
label:{
    fontSize: 20,
    marginTop: 35
}



/*
inputFieldsView : {
  height: 400,
},

col : {
width : 200,
flex: 1, flexDirection: 'row'
},

row : {
width : 300,
height:40
},

  fieldIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginLeft: 10,
    marginRight: 10
  },

  fieldInputText: {
    height: 32,
    fontSize: 32
  },
  fieldRow: { flex: 1, flexDirection: 'row', marginBottom: 10 },
  label: {
    height: 40,
    fontSize: 14,
    marginTop: 20
  }

  */

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