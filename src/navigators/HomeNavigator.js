import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import  FeedTab from '../tabs/FeedTab';
import  MeTab from '../tabs/MeTab';

const Components = createBottomTabNavigator(
    {
        Feed: {
            screen: FeedTab,
            path: '/feed',
            navigationOptions: {
                tabBarLabel: 'Feed',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Icon name="format-list-bulleted" size={30} type="material-community" color={tintColor} />
                ),
            },
        },
        Me: {
            screen: MeTab,
            path: '/me',
            navigationOptions: {
                tabBarLabel: 'Me',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Icon name="security-account" size={30} type="material-community"  color={tintColor} />
                ),
            },
        },
    },
    {
        initialRouteName: 'Feed',
        animationEnabled: false,
        swipeEnabled: true,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            activeTintColor: '#e91e63',
            showIcon: true,
        },
    }
);

Components.navigationOptions = {
    drawerLabel: 'Components',
    drawerIcon: ({ tintColor }) => (
        <Icon name="settings"  size={30}  iconStyle={{ width: 30,height: 30 }} type="material-community"  color={tintColor} />
    ),
};
export default createStackNavigator(
    {
        ComponentsTabs: {
            screen: Components
        },
    },
    {
        headerMode: 'none',
    }
);