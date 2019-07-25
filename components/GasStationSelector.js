import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { ButtonGroup } from 'react-native-elements'
import { connect } from 'react-redux'
import GasStationFinder from '../services/GasStationFinder';

const gasStationMap = ['Sonol', 'Paz', 'Delek', 'DorAlon'];

class GasStationSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: 0,
      loading: false
    }

    this.updateIndex = this.updateIndex.bind(this)
  }

  componentDidMount() {
    this.setState({ loading: true });
    if (this.props.autoSelect === true) {
      GasStationFinder.getClosestGasStation().then(data => {
        if (data.gasStation) {
          this.updateIndex(data.gasStation.id);
        }

        this.props.updateLocation(data.position);
      }).catch(error => {
        this.props.updateLocation( { longitude:0, latitude:0, accuracy :0});
      }).then(() => {
        this.setState({ loading: false });
      });
    }
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
    this.props.updateGasStation(gasStationMap[selectedIndex]);
  }

  render() {
    const component1 = () => <Image style={styles.fieldIcon} source={require('../assets/images/gasStationIcons/sonol.png')} />
    const component2 = () => <Image style={styles.fieldIcon} source={require('../assets/images/gasStationIcons/paz.png')} />
    const component3 = () => <Image style={styles.fieldIcon} source={require('../assets/images/gasStationIcons/delek.png')} />
    const component4 = () => <Image style={styles.fieldIcon} source={require('../assets/images/gasStationIcons/dorAlon.png')} />

    const buttons = [{ element: component1 }, { element: component2 }, { element: component3 }, { element: component4 }]
    const { selectedIndex } = this.state;

    if (this.state.loading)
      return <Image style={styles.fieldIcon} source={require('../assets/images/common/loading.gif')} />;

    return (
      <ButtonGroup onPress={this.updateIndex} selectedIndex={selectedIndex} buttons={buttons} containerStyle={{ height: 50, flex: 1 }} />
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

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(GasStationSelector)