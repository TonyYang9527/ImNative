import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Settings from '../screens/Settings';


const SignInNavigator = createStackNavigator(
  {
    Playground: {
      screen: Settings
    }
  },
  {
    headerMode: 'none'
  }
);

SignInNavigator.navigationOptions = {
  drawerLabel: 'Settings',
  drawerIcon: ({ tintColor, focused }) => (
    <Icon name="settings" size={30} iconStyle={{ width: 30, height: 30 }} type="material-community" color={tintColor} />
  ),
};

export default SignInNavigator;
