import React, { Component } from "react";
import { Dimensions, Image, StatusBar, StyleSheet, Text, View } from "react-native";

const {width,height} = Dimensions.get('window')

class CarDetails extends Component {
    render() {
        return (
            <View style={{flex: 1, backgroundColor: global.programPrimaryColor }}>
                <StatusBar backgroundColor={global.programPrimaryColor} barStyle="light-content" />
                <Image style={{width:'100%',height:'40%',resizeMode:'cover'}} source={require('../assets/3.jpg')} ></Image>
                <View style={styles.carInfoContainer}>
                    <View style={{flex:9}}>
                        <Text style={styles.ownerText}>Owner Name</Text>
                        <Text style={styles.carNameText}>{'Car Name'.toUpperCase()}</Text>
                        <Text style={styles.tripNumberText}># of trip</Text>
                    </View>
                    <View style={{position:"absolute",right:0,top:-20,backgroundColor:'white',padding:20,borderTopLeftRadius:20}}>
                        <Text style={styles.priceText}>39</Text>
                        <Text style={styles.normalTextStyle}>SAR</Text>
                        <Text style={styles.normalTextStyle}>per day</Text>
                    </View>
                </View>

            </View>
        );
    }
}
export default CarDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height:300
    },
    normalTextStyle: {
        color: 'black',
        fontWeight:'400',
        fontSize:13,
        textAlign:'center'
    },
    carInfoContainer: {
        flex:1,
        flexDirection:'row',
        backgroundColor:'white',
        padding:10,
        position:'relative',
        borderBottomWidth: 5,
        borderBottomColor: 'gray'
    },
    ownerText: {
        color:'black',
        fontWeight:'600',
        fontSize:15
    },
    carNameText: {
        color:'black',
        fontWeight:'600',
        fontSize:25
    },
    tripNumberText: {
        color:'black',
        fontWeight:'600',
        fontSize:13
    },
    priceText: {
        color: 'black',
        fontWeight:'900',
        fontSize:35
    },
});