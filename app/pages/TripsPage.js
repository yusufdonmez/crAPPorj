import React, { Component } from 'react';
import {Button,View,Text,Platform,StyleSheet} from "react-native";
import { Actions } from 'react-native-router-flux';

class TripsPage extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <View style={styles.container}>
                <Text>Trips</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});


export default TripsPage;