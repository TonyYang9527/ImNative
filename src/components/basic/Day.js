import React from 'react';
import { StyleSheet, Text, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import { isSameDay } from './utils';


export default function Day({ dateFormat, currentMessage, previousMessage, nextMessage, containerStyle, wrapperStyle, textStyle, inverted, local }) {
    if (!isSameDay(currentMessage, inverted ? previousMessage : nextMessage)) {
        return (
            <View style={[styles.container, containerStyle]}>
                <View style={wrapperStyle}>
                    <Text style={[styles.text, textStyle]}>
                        {
                            moment(currentMessage.createdAt).locale(local).format(dateFormat).toUpperCase()
                        }
                    </Text>
                </View>
            </View>
        );
    }
    return <View/>;
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 10,
    },
    text: {
        backgroundColor: 'transparent',
        color: '#b2b2b2',
        fontSize: 12,
        fontWeight: '600',
    },
});

Day.defaultProps = {
    currentMessage: {
        createdAt: null,
    },
    previousMessage: {},
    nextMessage: {},
    containerStyle: {},
    wrapperStyle: {},
    textStyle: {},
    dateFormat: 'll',
    local: 'en'
};

Day.propTypes = {
    currentMessage: PropTypes.object,
    previousMessage: PropTypes.object,
    nextMessage: PropTypes.object,
    inverted: PropTypes.bool,
    containerStyle: ViewPropTypes.style,
    wrapperStyle: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
    dateFormat: PropTypes.string,
    local: PropTypes.string,
};