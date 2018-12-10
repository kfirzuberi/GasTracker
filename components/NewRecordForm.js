import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Image, TextInput, ScrollView, Button, Dimensions, TouchableHighlight } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux'
import { globalOperations } from '../duck/index';
import GasStationSelector from './GasStationSelector';

class NewRecordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 0,
      liters: 0,
      km: 0,
      gasStation: '',
      kmImage: '',
      receiptImage: '',
      location : {
        latitude: 0,
        longitude : 0
      }
    };
  }

  handleOnPress = event => {
    this.props.addNewRecord(this.state);
  }

  captureImage = imageObjectName => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      includeExif: true,
      mediaType: 'photo',
      cropping: true
    }).then(image => {
      this.setState(imageObjectName === 'kmImage' ? { kmImage: image } : { receiptImage: image });
    });
  }

  render() {
    return (
      <View >
        <View style={styles.row}>
          <View style={styles.col}>
            <Image style={styles.imageIcon} source={require('../assets/images/formIcons/price.png')} />
            <TextInput style={styles.inputField} placeholder="0" keyboardType='numeric' onChangeText={(price) => this.setState({ price })} />
            <Text style={styles.label}>₪ </Text>
          </View>
          <View style={styles.col}>
            <Image style={styles.imageIcon} source={require('../assets/images/formIcons/liter.png')} />
            <TextInput style={styles.inputField} placeholder="0" keyboardType='numeric' onChangeText={(liters) => this.setState({ liters })} />
            <Text style={styles.label}>L</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.fullCol}>
            <Image style={styles.imageIcon} source={require('../assets/images/formIcons/km.png')} />
            <TextInput style={styles.inputField} placeholder="00000000" keyboardType='numeric' onChangeText={(km) => this.setState({ km })} />
            <Text style={styles.label}>KM</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.fullCol}>
            <Image style={styles.imageIcon} source={require('../assets/images/formIcons/gas.png')} />
            <GasStationSelector autoSelect={true} updateLocation=  {(location) => { this.setState({ location }) }}
            updateGasStation={(gasStation) => { this.setState({ gasStation }) }} />
          </View>
        </View>

        <View style={styles.fullRow}>
          <View style={styles.imageContainer}>
            <TouchableHighlight onPress={this.captureImage.bind(this, 'kmImage')}>
              <Image style={styles.uploadImage} source={this.state.kmImage !== '' ? { uri: this.state.kmImage.path } : require('../assets/images/formIcons/picture.png')} />
            </TouchableHighlight>
            <Text>Kilometrage</Text>
          </View>
          <View style={styles.imageContainer}>
            <TouchableHighlight onPress={this.captureImage.bind(this, 'receiptImage')}>
              <Image style={styles.uploadImage} source={this.state.receiptImage !== '' ? { uri: this.state.receiptImage.path } : require('../assets/images/formIcons/picture.png')} />
            </TouchableHighlight>
            <Text>Receipt</Text>
          </View>

        </View>

        <Button
          onPress={this.handleOnPress}
          title="Save"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    height: 80,
    padding: 5,
  },
  fullRow: {
    flexDirection: 'row',
    padding: 5,
  },
  col: {
    padding: 5,
    flexDirection: 'row',
    flex: 0.5,
  },
  fullCol: {
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
  uploadImage: {
    width: 128,
    height: 128,
    resizeMode: 'contain',
  },

  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputField: {
    flex: 1,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    paddingBottom: 5,
    fontSize: 40,
    textAlign: 'center'
  },
  label: {
    fontSize: 20,
    marginTop: 35
  }
});

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  addNewRecord: newRecord => dispatch(globalOperations.addNewRecordDispatcher(newRecord))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewRecordForm)