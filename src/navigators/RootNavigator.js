import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import { List, ListItem } from 'react-native-elements'
import HomeNavigator from './HomeNavigator';
import { sideMenus } from '../mock/data';

const SCREEN_WIDTH = Dimensions.get('window').width;

export const CustomDrawerContentComponent = (props) => (
    <View style={{ flex: 1, backgroundColor: '#ededed' ,marginTop:16}} >
        <List>
            {
                sideMenus.map((item) => (
                    <ListItem key={item.title} title={item.title} leftIcon={{ name: item.icon }} onPress={() => props.navigation.navigate('Me')} />
                ))
            }
        </List>
    </View>
);
export const Root = DrawerNavigator(
    {
        Home: {
            path: '/Home',
            screen: HomeNavigator,
        },
    },
    {
        headerLayoutPreset:'center',
        initialRouteName: 'Home',
        contentOptions: {
            activeTintColor: '#548ff7',
            activeBackgroundColor: 'transparent',
            inactiveTintColor: '#ffffff',
            inactiveBackgroundColor: 'transparent',
            labelStyle: {
                fontSize: 15,
                marginLeft: 0,
            },
        },
        drawerWidth: SCREEN_WIDTH * 0.8,
        contentComponent: CustomDrawerContentComponent,
    });