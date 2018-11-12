import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Me from '../screens/Me';
import Settings from '../screens/Settings';


const MeStack = createStackNavigator({
  Me: Me,
  Settings: Settings,
});

export default MeStack;
