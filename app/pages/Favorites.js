import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    SafeAreaView
} from "react-native";
import { Container, Content, List, ListItem, CardItem,  Left, Button, Thumbnail } from "native-base";
import { TouchableHighlight } from "react-native-gesture-handler";

import * as theme from '../assets/theme'

const {width,height} = Dimensions.get('window')

class Favorites extends Component {
    render() { 
        const data = [{id:1,img:require('../assets/1.png'),name:'Ford Mustang SRT',owner:'Joey',year:'2018',star:'5',price:55,tripNumber:19,features:[{icon:'bluetooth'},{icon:'calendar'},{icon:'car'},{icon:'radio'},{icon:'bluetooth'},{icon:'calendar'},{icon:'car'},{icon:'radio'}]},
                        {id:2,img:require('../assets/2.png'),name:'Car Name 2',owner:'Joe',year:'2016',star:'2',price:12,tripNumber:3,features:[{icon:'bluetooth'},{icon:'calendar'},{icon:'car'},{icon:'radio'}]},
                        {id:3,img:require('../assets/3.png'),name:'Porche Carerra',owner:'Mike',year:'2018',star:'4',price:45,tripNumber:123,features:[{icon:'bluetooth'},{icon:'calendar'},{icon:'car'},{icon:'radio'}]},
                        {id:4,img:require('../assets/4.png'),name:'Audi RS',owner:'Paul',year:'2013',star:'2',price:56,tripNumber:5,features:[{icon:'bluetooth'},{icon:'calendar'},{icon:'car'},{icon:'radio'}]},
                        {id:5,img:require('../assets/5.png'),name:'Car Name 5',owner:'Frank',year:'2012',star:'5',price:76,tripNumber:574,features:[{icon:'bluetooth'},{icon:'calendar'},{icon:'car'},{icon:'radio'}]},
                        {id:6,img:require('../assets/6.png'),name:'Car Name 6',owner:'Jose',year:'2018',star:'1',price:78,tripNumber:34,features:[{icon:'bluetooth'},{icon:'calendar'},{icon:'car'},{icon:'radio'}]},
                        {id:7,img:require('../assets/7.png'),name:'Car Name 7',owner:'Jack',year:'2018',star:'5',price:90,tripNumber:12,features:[{icon:'bluetooth'},{icon:'calendar'},{icon:'car'},{icon:'radio'}]},
                        {id:8,img:require('../assets/8.png'),name:'Car Name 8',owner:'Lisa',year:'2019',star:'3',price:25,tripNumber:43,features:[{icon:'bluetooth'},{icon:'calendar'},{icon:'car'},{icon:'radio'}]},
                        {id:9,img:require('../assets/9.png'),name:'Car Name 9',owner:'Martin',year:'2018',star:'5',price:49,tripNumber:84,features:[{icon:'bluetooth'},{icon:'calendar'},{icon:'car'},{icon:'radio'}]},
                        {id:10,img:require('../assets/10.png'),name:'Car Name 10',owner:'Ali',year:'2018',star:'0',price:100,tripNumber:23,features:[{icon:'bluetooth'},{icon:'calendar'},{icon:'car'},{icon:'radio'}]}];

        return (
            <SafeAreaView style={{flex:1,backgroundColor: theme.COLORS.Primary}}>
                <Container>
                    <Content>
                        {data.map((item, i) =>
                            <View style={{flex:1,margin:15,flexDirection:'column'}}>
                                <View style={{flex:1,position:'relative'}}>
                                    <Image style={{height: 200, width: null, flex: 1}} source={item.img} />
                                    <View style={styles.priceContainer}>
                                        <Text style={styles.priceText}>{item.tripNumber} trips</Text>
                                    </View>
                                </View>
                                <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignContent: 'center'}}>
                                    <Text style={styles.carNameText}>{item.name.toUpperCase()}</Text>
                                    <Text style={styles.yearText}>{item.year}</Text>
                                </View>
                            </View>
                        )}
                    </Content>
                </Container>
            </SafeAreaView>
        );
    }
}
export default Favorites;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    carNameText: {
        color:'black',
        fontWeight:'700',
        fontSize:27,
        paddingTop: 15,
        textAlign:  'center',
        flex:1

    },
    yearText: {
        color:'black',
        fontWeight:'400',
        fontSize:16,
        marginStart:3,
        textAlign: 'center'
    },
    priceContainer: {
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 20,
        padding:8,
        width: 100,
        height: 40,
        position:'absolute',
        left:  ( width / 2 ) - 75,
        bottom: -15
    },
    priceText:{
        fontSize:18,
        color:'black',
        fontWeight: '900',
        justifyContent:'center',
    }
});