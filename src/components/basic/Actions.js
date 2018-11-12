import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View, ViewPropTypes } from 'react-native';
import Color from './Color';

export default class Actions extends Component {

    constructor(props) {
        super(props);
        this.onActionsPress = this.onActionsPress.bind(this);
    }

    onActionsPress() {
        if (this.props.onPressActionButton) {
            this.props.onPressActionButton(this.props)
        } else {
            const { options } = this.props;
            const optionKeys = Object.keys(options);
            const cancelButtonIndex = optionKeys.indexOf('Cancel');
            this.props.showActionSheetWithOptions(
                {
                    options: optionKeys,
                    cancelButtonIndex,
                    tintColor: this.props.optionTintColor,
                },
                (buttonIndex) => {
                    const key = optionKeys[buttonIndex];
                    if (key) {
                        options[key](this.props);
                    }

                },
            );
        }

    }

    renderIcon() {
        if (this.props.icon) {
            return this.props.icon();
        }
        return (
            <View style={[styles.wrapper, this.props.wrapperStyle]}>
                <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
            </View>
        );
    }

    render() {
        return (
            <TouchableOpacity style={[styles.container, this.props.containerStyle]} onPress={this.onActionsPress}>
                {this.renderIcon()}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 5,
        marginBottom: 10,
    },
    wrapper: {
        borderRadius: 13,
        borderColor: Color.themeColor,
        borderWidth: 2,
        flex: 1,
    },
    iconText: {
        color: Color.themeColor,
        fontWeight: 'bold',
        fontSize: 16,
        backgroundColor: Color.backgroundTransparent,
        textAlign: 'center',
    },
});


Actions.defaultProps = {
    onSend: () => { },
    options: {},
    optionTintColor: Color.optionTintColor,
    icon: null,
    containerStyle: {},
    iconTextStyle: {},
    wrapperStyle: {},
    showActionSheetWithOptions: () => { },
};

Actions.propTypes = {
    onSend: PropTypes.func,
    options: PropTypes.object,
    optionTintColor: PropTypes.string,
    icon: PropTypes.func,
    onPressActionButton: PropTypes.func,
    wrapperStyle: ViewPropTypes.style,
    containerStyle: ViewPropTypes.style,
    iconTextStyle: Text.propTypes.style,
    showActionSheetWithOptions: PropTypes.func,
};