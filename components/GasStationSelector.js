import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { ButtonGroup } from 'react-native-elements'
import { connect } from 'react-redux'

const gasStationMap = ['Sonol', 'Paz', 'Delek', 'DorAlon'];

class GasStationSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: 0
    }
    this.updateIndex = this.updateIndex.bind(this)
  }
  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
    this.props.updateGasStation(gasStationMap[selectedIndex]);

  }
  //https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=32.0041473,34.8194882&radius=1500&keyword=gas&key=AIzaSyDhQ07lVAQaV83qLQo6QyJt4H0KpHtZyYU&type=gas_station


  render() {
    const component1 = () => <Image style={styles.fieldIcon} source={require('../assets/images/gasStationIcons/sonol.png')} />
    const component2 = () => <Image style={styles.fieldIcon} source={require('../assets/images/gasStationIcons/paz.png')} />
    const component3 = () => <Image style={styles.fieldIcon} source={require('../assets/images/gasStationIcons/delek.png')} />
    const component4 = () => <Image style={styles.fieldIcon} source={require('../assets/images/gasStationIcons/dorAlon.png')} />

    const buttons = [{ element: component1 }, { element: component2 }, { element: component3 }, { element: component4 }]
    const { selectedIndex } = this.state

    return (
      <ButtonGroup
        onPress={this.updateIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={{ height: 50, flex: 1 }} />
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
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GasStationSelector)