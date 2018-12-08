import React from "react";
import { Platform, StatusBar } from "react-native";
import { createAppContainer, createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from "react-navigation";
import Icon from 'react-native-vector-icons/FontAwesome';

import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import AppNavigator from "./screens/AppNavigator";
import Profile from "./screens/Profile";

const headerStyle = {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

export const SignedOut = createStackNavigator({
    SignUp: {
        screen: SignUp,
        navigationOptions: {
            title: "Sign Up",
            headerStyle
        }
    },
    SignIn: {
        screen: SignIn,
        navigationOptions: {
            title: "Sign In",
            headerStyle
        }
    }
});

export const SignedIn = createBottomTabNavigator(
    {
        AppNavigator: {
            screen: AppNavigator,
            navigationOptions: {
                tabBarLabel: "Home",
                tabBarIcon: ({ tintColor }) => (<Icon name='home' size={30} color={tintColor} />)

            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                tabBarLabel: "Profile",
                tabBarIcon: ({ tintColor }) => (<Icon name='gear' size={30} color={tintColor} />)

            }
        }
    },
    {
        tabBarOptions: {
            style: {
                paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
            }
        }
    }
);

export const createRootNavigator = (signedIn = false) => {
    return createAppContainer(createSwitchNavigator(
        {
            SignedIn: {
                screen: SignedIn
            },
            SignedOut: {
                screen: SignedOut
            }
        },
        {
            initialRouteName: signedIn ? "SignedIn" : "SignedOut"
        }
    ));
};