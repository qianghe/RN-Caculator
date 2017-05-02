import React , { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableHighlight,
} from 'react-native';

export default class labelButton extends Component{
    constructor(props){
        super(props);
    }

    render(){
        let {
            onPressButton,
            attrs,
            itemStyle,
            itemTextStyle,
            value,
        } = this.props;

        return (
            <TouchableHighlight onPress={onPressButton} activeOpacity={1} underlayColor={attrs.underlayColor} style={itemStyle}>
                <Text style={itemTextStyle}>{value}</Text>
            </TouchableHighlight>
        )
    }
}
