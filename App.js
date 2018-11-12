
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import FeedTab from './src/tabs/FeedTab';
import { Root } from './src/navigators/RootNavigator';
import { ActionSheetProvider} from '@expo/react-native-action-sheet';
type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <ActionSheetProvider>
        <FeedTab />
      </ActionSheetProvider>
    );
  }
}

