import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Feed from '../screens/Feed';
import UserDetail from '../screens/UserDetail';
import BasicHeaderView from '../components/header/BasicHeaderView';

const FeedScreen = ({ navigation }) => (
  <Feed navigation={navigation} />
);
const UserDetailScreen = ({ navigation }) => (
  <UserDetail navigation={navigation} />
);


const FeedStack = createStackNavigator({
  Feed: {
    screen: FeedScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: null,
      headerTitle: (<BasicHeaderView navigation={navigation} />),

    }),
  },
  Details: {
    screen: UserDetailScreen,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name.first.toUpperCase()} ${navigation.state.params.name.last.toUpperCase()}`,
    }),
  },
});
export default FeedStack;