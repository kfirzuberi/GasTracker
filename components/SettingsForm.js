import React, { Component } from 'react';
import { View, Text } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { connect } from 'react-redux';
import { globalOperations } from '../duck/index';

class SettingsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carID : ''
        };

        this.props.getUserSettings();
    }

    componentWillReceiveProps(newProps){
        this.setState({...newProps })
     }

    handleOnSaveUserSettings = event => {
        this.props.saveUserSettings(this.state);
    }

    render() {
        return (
            <View style={{ paddingVertical: 20 }}>
                <Card>
                    <FormLabel>Car ID</FormLabel>
                    <FormInput value={this.state.carID} placeholder="Car ID..." onChangeText={carID => this.setState({ carID })} />
                    <Button
                        buttonStyle={{ marginTop: 20 }}
                        backgroundColor="#03A9F4"
                        title="SAVE"
                        onPress={this.handleOnSaveUserSettings}
                    />
                </Card>
            </View>

        )
    }
};

const mapStateToProps = state => {
    return {
        ...state.settings,
    };
}
const mapDispatchToProps = dispatch => ({
    saveUserSettings: settings => dispatch(globalOperations.saveUserSettingsDispatcher(settings)),
    getUserSettings: () => dispatch(globalOperations.getUserSettingsDispatcher())

})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsForm)