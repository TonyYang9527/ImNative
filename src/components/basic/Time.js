import React from 'react';
import { StyleSheet, Text, View, ViewPropTypes } from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';

const containerStyle = {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
};
const textStyle = {
    fontSize: 10,
    backgroundColor: 'transparent',
    textAlign: 'right',
};

export default function Time({ position, containerStyle, currentMessage, timeFormat, textStyle, timeTextStyle ,local}) {
    return (
        <View style={[styles[position].container, containerStyle[position]]}>
            <Text style={[styles[position].text, textStyle[position], timeTextStyle[position]]}>
                {moment(currentMessage.createdAt).locale(local).format(timeFormat)}
            </Text>
        </View>
    )
};


const styles = {
    left: StyleSheet.create({
        container: { ...containerStyle, },
        text: { color: '#aaa', ...textStyle, },
    }),
    right: StyleSheet.create({
        container: { ...containerStyle, },
        text: { color: '#fff', ...textStyle, },
    }),
};


Time.defaultProps = {
    position: 'left',
    currentMessage: {
        createdAt: null,
    },
    containerStyle: {},
    textStyle: {},
    timeFormat: 'LT',
    timeTextStyle: {},
    local: 'en'
};

Time.propTypes = {
    position: PropTypes.oneOf(['left', 'right']),
    currentMessage: PropTypes.object,
    containerStyle: PropTypes.shape({
        left: ViewPropTypes.style,
        right: ViewPropTypes.style,
    }),
    textStyle: PropTypes.shape({
        left: Text.propTypes.style,
        right: Text.propTypes.style,
    }),
    timeFormat: PropTypes.string,
    timeTextStyle: PropTypes.shape({
        left: Text.propTypes.style,
        right: Text.propTypes.style,
    }),
    local: PropTypes.string,
};