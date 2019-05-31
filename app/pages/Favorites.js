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
import {Actions} from 'react-native-router-flux'
import { TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight } from "react-native-gesture-handler";

import * as theme from '../assets/theme'

const {width,height} = Dimensions.get('window')

class Favorites extends Component {  
    constructor(props){
        super(props)
        this.state ={
            isLoading:true,
            favoritesData : []
        };
    }

    getFavorites(){
        console.log(global.appAddress + '/service/c1/json/PublicService/userFavorites/en_US?id=' + this.props.userID )
        
        fetch(global.appAddress + '/service/c1/json/PublicService/userFavorites/en_US?id=' + this.props.userID ,
        {
            credentials: 'include',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log('Component Did Mount Data List: '+ responseJson);
            if( responseJson != undefined && responseJson.length != 0 ){
                console.log('<--- reviews service loaded from server --->');
                this.setState({isLoading:false,
                            favoritesData: responseJson});
            }
            else {
                this.setState({isLoading:false,noRecordsFound:true});
            }
        })
        .catch((error) => {
            console.error(error.message + ' on Favorites at line 50');
        });
    }

    componentDidMount(){
        this.getFavorites();
    }

    render() { 
        const data = this.state.favoritesData;
        /*
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
        */
        return (
            <SafeAreaView style={{flex:1,backgroundColor: theme.COLORS.Primary}}>
                <Container>
                    <Content>
                        {data.map((item, i) =>
                        <TouchableWithoutFeedback key={item.id} onPress={() => (Actions.CarDetails({title:item.Make,itemDetails:item}))} >
                            <View  style={{flex:1,margin:15,flexDirection:'column'}}>
                                <View style={{flex:1,position:'relative'}}>
                                    <Image style={{height: 200, width: null, flex: 1}} 
                                            source={{uri: global.appAddress+'/Image?imagePath='+ item.Photo}}/>
                                    <View style={styles.priceContainer}>
                                        <Text style={styles.priceText}>{item.NoOfTrip} trips</Text>
                                    </View>
                                </View>
                                <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignContent: 'center'}}>
                                    <Text style={styles.carNameText}> {item.Make.toUpperCase()} {item.Brand.toUpperCase()} </Text>
                                    <Text style={styles.yearText}>{item.ModelYear}</Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>                        
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