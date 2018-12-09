import React, { Component } from 'react';
import { View } from "react-native";
import { Card, Button, Text } from "react-native-elements";
import { connect } from 'react-redux';
import { globalOperations } from '../duck/index';

class Profile extends Component {

    handleOnSignOut = event => {
        this.props.signOut();
    }

    render() {
        return (
            <View style={{ paddingVertical: 20 }}>
                <Card title="John Doe">
                    <View
                        style={{
                            backgroundColor: "#bcbec1",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 80,
                            height: 80,
                            borderRadius: 40,
                            alignSelf: "center",
                            marginBottom: 20
                        }}>
                        <Text style={{ color: "white", fontSize: 28 }}>JD</Text>
                    </View>
                    <Button
                        backgroundColor="#03A9F4"
                        title="SIGN OUT"
                        onPress={this.handleOnSignOut}
                    />
                </Card>
            </View>
        )
    }
};

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(globalOperations.signOutDispatcher())
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)