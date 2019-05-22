import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    SafeAreaView
} from "react-native";

import {Actions} from 'react-native-router-flux'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { Container, Content ,Button } from "native-base";

class BookedTrips extends Component {
    render() {
        return (
            <View style={styles.container}>
                <FontAwesomeIcon name='road' color='gray' size={130} />
                <Text style={{paddingTop:20,fontSize:40,fontWeight: '700',color:'gray'}}>No Trips</Text>
                <Button block bordered style={{margin:20,borderColor:'gray'}}
                        onPress={() => {Actions.Host();}}>
                    <Text style={{fontSize:22,fontWeight:'800',color:'gray'}}>List a car</Text>
                </Button>
                <Button block style={{backgroundColor:global.programSecondaryColor,margin:20}} 
                        onPress={() => {Actions.HomeScreen();}}>
                    <Text style={{fontSize:22,fontWeight:'800',color:'white'}}>Find a car</Text>
                </Button>
            </View>
        );
    }
}
export default BookedTrips;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});