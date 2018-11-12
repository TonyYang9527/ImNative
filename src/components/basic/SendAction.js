import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import Color from './Color';

function onPress(text, onSend) {
    if (!text) {
        return;
    } else {
        onSend({ text: text.trim() }, true);
    }
};

export default function SendAction({ text, containerStyle, onSend, children, textStyle, label, alwaysShowSend }) {

    if (alwaysShowSend || text.trim().length > 0) {
        return (
            <TouchableOpacity accessibilityTraits="button" testID="send" accessible accessibilityLabel="send"  style={[styles.container, containerStyle]} onPress={() => { onPress(text, onSend); }}>
                <View style={[styles.wrapper]} >{children || <Text style={[styles.text, textStyle]}>{label}</Text>}</View>
            </TouchableOpacity>
        );
    }
    return <View />;
}

const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginRight: 5,
        marginBottom: 10,

    },
    wrapper: {
        borderColor: Color.defaultColor,
        flex: 1,
    },
    text: {
        color: Color.defaultBlue,
        fontWeight: '600',
        fontSize: 17,
        backgroundColor: Color.backgroundTransparent,
        marginBottom: 12,
        marginLeft: 10,
        marginRight: 10,
    },
});

SendAction.defaultProps = {
    text: '',
    onSend: () => { },
    label: 'Send',
    containerStyle: {},
    textStyle: {},
    children: null,
    alwaysShowSend: false,
};

SendAction.propTypes = {
    text: PropTypes.string,
    onSend: PropTypes.func,
    label: PropTypes.string,
    containerStyle: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
    children: PropTypes.element,
    alwaysShowSend: PropTypes.bool,
};
