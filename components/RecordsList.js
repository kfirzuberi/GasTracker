import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity,TouchableHighlight  } from 'react-native';
import { RecordItem } from './RecordItem';

import { connect } from 'react-redux';
import { List, ListItem } from 'react-native-elements'
import NavigationService from '../services/NavigationService'

import { globalOperations } from '../duck/index';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

class RecordsList extends React.Component {
  constructor(props) {
    super(props);

    this.props.watchRecordsDispatcher();
  }

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={() =>NavigationService.navigate('RecordDetailsScreen', {item})}>
    <View>
    <RecordItem item={item} />
    </View>
   
     </TouchableOpacity>
  );

  render() {
    return (
      <View style={styles.container}>
        <List>
          <FlatList data={this.props.records} renderItem={this.renderItem} />
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height * 0.5
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

const mapStateToProps = (state) => {
  return {
    records: state.global.records
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    watchRecordsDispatcher: () => dispatch(globalOperations.watchRecordsDispatcher())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordsList);