import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Image, TextInput, ScrollView, Button, Dimensions,TouchableHighlight } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import { connect } from 'react-redux'
import { globalOperations } from '../duck/index';

import GasStationSelector from './GasStationSelector';

  const widthWin = Dimensions.get('window').width; //full width
  const heightWin = Dimensions.get('window').height; //full height


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
    };
  }

  handleOnPress = event => {
    this.props.addNewRecord(this.state);
  }

 captureImage = imageObjectName => {
    ImagePicker.openCamera({
      width: 300,
      includeExif : true,
      mediaType: 'photo',
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
      switch (imageObjectName){
      case 'kmImage':
        this.setState({ kmImage : image });
        break;

         case 'receiptImage':
              this.setState({ receiptImage : image });
              break;
            }

    });
  }

  render() {
    let kmImageObject, receiptImageObject;

    if (this.state.kmImage==='') {
      kmImageObject = <TouchableHighlight onPress={this.captureImage.bind(this,'kmImage')}><Image  style={styles.uploadImage} source={require('../assets/images/formIcons/picture.png')} /></TouchableHighlight>;
    } else {
      kmImageObject = <Image style={styles.uploadImage} source={{uri: this.state.kmImage.path}} />;
    }

   if (this.state.receiptImage==='') {
      receiptImageObject = <TouchableHighlight onPress={this.captureImage.bind(this,'receiptImage')}><Image  style={styles.uploadImage} source={require('../assets/images/formIcons/picture.png')} /></TouchableHighlight>;
    } else {
      receiptImageObject = <Image style={styles.uploadImage} source={{uri: this.state.receiptImage.path}} />;
    }


    return (
   <View >

    <View style={styles.row}>
        <View style={styles.col}>
            <Image style={styles.imageIcon} source={require('../assets/images/formIcons/price.png')} />
            <TextInput style={styles.inputField} placeholder="0" keyboardType='numeric' onChangeText={(price) => this.setState({ price })}/>
            <Text style={styles.label}>₪ </Text>
        </View>
        <View style={styles.col}>
            <Image style={styles.imageIcon} source={require('../assets/images/formIcons/liter.png')} />
            <TextInput style={styles.inputField} placeholder="0" keyboardType='numeric' onChangeText={(liters) => this.setState({ liters })}/>
            <Text style={styles.label}>L</Text>
        </View>
    </View>

    <View style={styles.row}>
        <View style={styles.fullCol}>
            <Image style={styles.imageIcon} source={require('../assets/images/formIcons/km.png')} />
            <TextInput style={styles.inputField} placeholder="00000000" keyboardType='numeric' onChangeText={(km) => this.setState({ km })}/>
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
          onPress={this.captureImage}
          title="capture"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />

            <View style={styles.fullRow}>
                <View style={styles.imageContainer}>
                 {kmImageObject}
                                                 <Text>Kilometrage</Text>

                </View>
                    <View style={styles.imageContainer}>
                                 {receiptImageObject}
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
row :{
    flexDirection: 'row',
    height: 80,
    padding: 5,
},
fullRow:{
   flexDirection: 'row',
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
uploadImage: {
    width: 128,
    height: 128,
    resizeMode: 'contain',
 //   marginRight: 10
},

imageContainer:{
flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin:'auto'
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
});


const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  addNewRecord: newRecord => dispatch(globalOperations.addNewRecordDispatcher(newRecord))
})

export default connect(  mapStateToProps,  mapDispatchToProps)(NewRecordForm)