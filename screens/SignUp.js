import React, { Component } from 'react';
import { View } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import firebase from '@firebase/app';
import 'firebase/firestore';

export class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: '',
          fullName : ''
        };
      }

    handleOnSignUp = event => {
        const { email, password } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((user) => {
            // If you need to do anything with the user, do it here
            // The user will be logged in automatically by the
            // `onAuthStateChanged` listener we set up in App.js earlier
          })
          .catch((error) => {
            const { code, message } = error;
            // For details of error codes, see the docs
            // The message contains the default Firebase string
            // representation of the error
          });
    }

    render() {
      return (
        <View style={{ paddingVertical: 20 }}>
        <Card>
          <FormLabel>Email</FormLabel>
          <FormInput placeholder="Email address..." onChangeText={(email) => this.setState({ email })} />
          <FormLabel>Password</FormLabel>
          <FormLabel>Full Name</FormLabel>
          <FormInput placeholder="Full Name..." onChangeText={(fullName) => this.setState({ fullName })} />
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
  
  export default SignUp;