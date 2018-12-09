import React, { Component } from 'react';
import { View } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { connect } from 'react-redux';
import { globalOperations } from '../duck/index';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleOnSignIn = event => {
        this.props.signIn(this.state);
    }

    render() {
        return (
            <View style={{ paddingVertical: 20 }}>
                <Card>
                    <FormLabel>Email</FormLabel>
                    <FormInput placeholder="Email address..." onChangeText={(email) => this.setState({ email })} />
                    <FormLabel>Password</FormLabel>
                    <FormInput secureTextEntry placeholder="Password..." onChangeText={(password) => this.setState({ password })} />

                    <Button
                        buttonStyle={{ marginTop: 20 }}
                        backgroundColor="#03A9F4"
                        title="SIGN IN"
                        onPress={this.handleOnSignIn}
                    />
                </Card>
            </View>

        )
    }
};

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
    signIn: userData => dispatch(globalOperations.signInDispatcher(userData))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)