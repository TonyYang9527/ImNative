
import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, Platform, StyleSheet, Text, TouchableOpacity, View, ViewPropTypes, } from 'react-native';
import Color from './Color';

export default class LoadHistory extends React.Component {

    renderLoading() {
        if (this.props.isLoadingHistory === false) {
            return (
                <Text style={[styles.text, this.props.textStyle]}>
                    {this.props.label}
                </Text>
            );
        }
        return (
            <View>
                <Text style={[styles.text, this.props.textStyle, { opacity: 0 }]}>
                    {this.props.label}
                </Text>
                <ActivityIndicator color="white" size="small" style={[styles.activityIndicator, this.props.activityIndicatorStyle]} />
            </View>
        );
    }
    render() {
        return (
            <TouchableOpacity style={[styles.container, this.props.containerStyle]} disabled={this.props.isLoadingHistory === true}
                onPress={() => {
                    if (this.props.onLoadHistory) {
                        this.props.onLoadHistory();
                    }
                }}
                accessibilityTraits="button">

                <View style={[styles.wrapper, this.props.wrapperStyle]}>
                    {this.renderLoading()}
                </View>
            </TouchableOpacity>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 10,
    },
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.defaultColor,
        borderRadius: 15,
        height: 30,
        paddingLeft: 10,
        paddingRight: 10,
    },
    text: {
        backgroundColor: Color.backgroundTransparent,
        color: Color.white,
        fontSize: 12,
    },
    activityIndicator: {
        marginTop: Platform.select({
            ios: -14,
            android: -16,
        }),
    },
});

LoadHistory.defaultProps = {
    onLoadHistory: () => { },
    isLoadingHistory: false,
    label: 'Load earlier messages',
    containerStyle: {},
    wrapperStyle: {},
    textStyle: {},
    activityIndicatorStyle: {},
};

LoadHistory.propTypes = {
    onLoadHistory: PropTypes.func,
    isLoadingHistory: PropTypes.bool,
    label: PropTypes.string,
    containerStyle: ViewPropTypes.style,
    wrapperStyle: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
    activityIndicatorStyle: ViewPropTypes.style,
};