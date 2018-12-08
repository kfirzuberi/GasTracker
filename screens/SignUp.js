import React, { Component } from 'react';
import { View } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { connect } from 'react-redux';
import { globalOperations } from '../duck/index';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            fullName: ''
        };
    }

    handleOnSignUp = event => {
        this.props.signUp(this.state);
    }

    render() {
        return (
            <View style={{ paddingVertical: 20 }}>
                <Card>
                    <FormLabel>Email</FormLabel>
                    <FormInput placeholder="Email address..." onChangeText={(email) => this.setState({ email })} />
                    <FormLabel>Full Name</FormLabel>
                    <FormInput placeholder="Full Name..." onChangeText={(fullName) => this.setState({ fullName })} />
                    <FormLabel>Password</FormLabel>
                    <FormInput secureTextEntry placeholder="Password..." onChangeText={(password) => this.setState({ password })} />
                    <FormLabel>Confirm Password</FormLabel>
                    <FormInput secureTextEntry placeholder="Confirm Password..." onChangeText={(password) => this.setState({ password })} />

                    <Button
                        buttonStyle={{ marginTop: 20 }}
                        backgroundColor="#03A9F4"
                        title="SIGN UP"
                        onPress={this.handleOnSignUp}
                    />
                    <Button
                        buttonStyle={{ marginTop: 20 }}
                        backgroundColor="transparent"
                        textStyle={{ color: "#bcbec1" }}
                        title="Sign In"
                        onPress={() => this.props.navigation.navigate("SignIn")}
                    />
                </Card>
            </View>
        )
    }
};

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
    signUp: newUser => dispatch(globalOperations.signUpDispatcher(newUser))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)