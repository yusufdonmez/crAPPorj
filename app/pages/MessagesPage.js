import React, { Component } from 'react';
import {DrawerLayoutAndroid,View,Text,Platform,StyleSheet} from "react-native";


export default class MessagesPage extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>Messages</Text>
            </View>
        );
    }

}