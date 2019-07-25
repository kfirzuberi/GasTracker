import React, { Component } from 'react';
import { View, Text } from "react-native";
import { Card, Button, FormLabel, FormInput, Avatar, PricingCard } from "react-native-elements";
import { connect } from 'react-redux';
import { globalOperations } from '../duck/index';
import moment from 'moment';

class RecordDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  getGasImage = (gasStation) => {
    switch ((gasStation + "").toLowerCase()) {
      case 'sonol':
        return require('../assets/images/gasStationIcons/sonol.png');
      case 'delek':
        return require('../assets/images/gasStationIcons/delek.png');
      case 'paz':
        return require('../assets/images/gasStationIcons/paz.png');
      case 'doralon':
        return require('../assets/images/gasStationIcons/dorAlon.png');
    }
  }


  render() {
    const item = this.props.item;
    const date = moment(item.timestamp ? item.timestamp.toDate() : '').format('LLLL');

    return (
      <View style={{ paddingVertical: 20 }}>
        <Avatar
          large rounded
          source={this.getGasImage(item.gasStation)}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
        />

        <PricingCard
          color='#4f9deb'
          title={item.liters + ' liters'}
          price={item.price + '₪'}
          info={[date]}
          button={{ title: 'GET STARTED', icon: 'flight-takeoff' }}
        />
      </View>

    )
  }
};

const mapStateToProps = state => {
  return {
  };
}
const mapDispatchToProps = dispatch => ({ })

export default connect(mapStateToProps, mapDispatchToProps)(RecordDetails)