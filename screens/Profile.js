import React, { Component } from 'react';
import { View } from "react-native";
import { Card, Button, Text } from "react-native-elements";
import firebase from '@firebase/app';
import 'firebase/firestore';


export class Profile extends Component {

    handleOnSignOut = event => {
        firebase.auth().signOut().then(()=>{
            this.props.navigation.navigate("SignedOut");
        })
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
            }}
          >
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
  
  export default Profile;