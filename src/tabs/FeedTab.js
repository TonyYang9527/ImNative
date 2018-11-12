import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import BasicHeaderView from '../components/header/BasicHeaderView';
import SegmentedControlView from '../components/SegmentedControlView';
import Conversations from '../screens/Conversations';
import GroupChat from '../screens/GroupChat';
import Me from '../screens/Me';
import Settings from '../screens/Settings';
import Album from '../screens/Album';
import Color from '../components/basic/Color';


const FeedTab = createStackNavigator({
  Feed: Conversations,
  Chat: GroupChat,
  Me: Me,
  Settings: Settings,
  Album: Album,
},
  {
    headerLayoutPreset: 'center',
    navigationOptions: {
      headerStyle: {
        backgroundColor: Color.themeColor,
      }
    }
  }
);
export default FeedTab;