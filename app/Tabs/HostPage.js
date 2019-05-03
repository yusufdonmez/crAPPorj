import React, { Component } from 'react';
import {View,Text,Platform,StyleSheet} from "react-native";


export default class HostPage extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>Host</Text>
            </View>
        );
    }

}