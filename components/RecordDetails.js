import React, { Component } from 'react';
import { View, Text } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { connect } from 'react-redux';
import { globalOperations } from '../duck/index';

class RecordDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {
        const item = this.props.item;
        return (
            <View style={{ paddingVertical: 20 }}>
                <Text> {item.km}</Text>
            </View>

        )
    }
};

const mapStateToProps = state => {
    return {

    };
}
const mapDispatchToProps = dispatch => ({


})

export default connect(mapStateToProps, mapDispatchToProps)(RecordDetails)