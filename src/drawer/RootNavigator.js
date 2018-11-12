import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Feed from '../screens/Feed';
import UserDetail from '../screens/UserDetail';
import BasicHeaderView from '../components/header/BasicHeaderView';

const FeedScreen = ({ navigation }) => (
   <Feed navigation={navigation} />
);

const FeedStack = createStackNavigator({
     Feed:  FeedScreen,
});
export default FeedStack;