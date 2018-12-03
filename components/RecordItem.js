import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { List, ListItem } from 'react-native-elements'
import moment from 'moment';


export class RecordItem extends Component {


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

    return (

      <ListItem
        roundAvatar
        //title='Limited supply! Its like digital gold!'
        subtitle={
          <View style={styles.subtitleView}>


            <View style={{ flex: 1, flexDirection: 'row' }}>

              <Image style={styles.fieldIcon} source={require('../assets/images/formIcons/km_bw.png')} />
              <Text style={styles.item}>{this.props.item.km}km</Text>

              <Image style={styles.fieldIcon} source={require('../assets/images/formIcons/price_bw.png')} />
              <Text style={styles.item}>{this.props.item.price}₪</Text>

              <Image style={styles.fieldIcon} source={require('../assets/images/formIcons/liter_bw.png')} />
              <Text style={styles.item}>{this.props.item.liters}L</Text>

            </View>
            <Text style={styles.ratingText}>{moment((this.props.item.timestamp ?this.props.item.timestamp.toDate():'')).fromNow()}</Text>
          </View>
        }
        avatar={this.getGasImage(this.props.item.gasStation)}
        avatarStyle={styles.avatarIcon}
      />



    );
  }
}

const styles = StyleSheet.create({
  avatarIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain'
  },
  fieldIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginLeft: 15,
    marginRight: 5,
    marginTop: 2
  },
  item: {
    fontSize: 18,
  },
});