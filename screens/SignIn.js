import React, { Component } from 'react';
import { View } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import firebase from '@firebase/app';
import 'firebase/firestore';

export class SignIn extends Component {

    handleOnSignIn = event => {
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then((user) => {
            // If you need to do anything with the user, do it here
            // The user will be logged in automatically by the 
            // `onAuthStateChanged` listener we set up in App.js earlier
            this.props.navigation.navigate("SignedIn");
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
          <FormInput placeholder="Email address..."  onChangeText={(email) => this.setState({ email })} />
          <FormLabel>Password</FormLabel>
          <FormInput secureTextEntry placeholder="Password..."  onChangeText={(password) => this.setState({ password })} />
    
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
  
  export default SignIn;