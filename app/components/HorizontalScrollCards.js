import React from 'react';

import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity} from "react-native";


import {Icon} from "native-base";

let scrnWidth = Dimensions.get('window').width;

export default class HorizontalScrollCards extends React.Component {
    constructor(props){
        super(props);

        this._renderReviewStars = this._renderReviewStars.bind(this);
    }
    
    _renderReviewStars(star){
        let stars = [];
		for (var i = 1; i <= 5; i++) {
			let starName = 'star';
			if (i > star) {
				starName = 'star-outline';
			}
			stars.push((<Icon style={styles.reviewStar} name={starName} ></Icon>));
        }
        return stars
    }

    render(){
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
        <View style={{marginTop:20,marginBottom:5,backgroundColor:'white'}}>
            <Text style={{marginLeft:10}}>YOU MIGHT LIKE</Text>
            <ScrollView style={styles.scrollContainer} horizontal={true} showsHorizontalScrollIndicator={false}>
            {data.map((item, i) =>
                <View key={i} style={styles.cardContainer}>
                    <TouchableOpacity style={{flex:1}} onPress={ () => {this.props.openCarDetailsNav(item)}}>
                        <Image style={{width:null,height:'80%',resizeMode:'cover'}} source={item.img} ></Image>
                        <View style={styles.carInfoContainer}>
                            <View style={{flex:9}}>
                                <Text style={styles.carNameText}>{item.name}</Text>
                                <Text style={styles.tripNumberText}> { this._renderReviewStars(item.star) } {item.tripNumber} Trip</Text>
                            </View>
                            <View style={styles.priceConteiner}>
                                <Text style={styles.priceText}>{item.price}</Text>
                                <Text style={styles.normalTextStyle}>SAR</Text>
                                <Text style={styles.normalTextStyle}>per day</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                
            )}
            </ScrollView>
        </View>
        );
    }

}
const styles = StyleSheet.create({
    scrollContainer: {
        height:240
    },
    normalTextStyle: {
        color: 'black',
        fontWeight:'400',
        fontSize:13,
        textAlign:'center'
    },
    cardContainer: {
        height:240,
        width: scrnWidth - 50,
        marginRight:10,
        marginLeft:10,
        position:'relative',
        backgroundColor:'white'
    },
    carInfoContainer: {
        flex:1,
        flexDirection:'row',
        backgroundColor:'white',
        padding:10,
        position:'relative',
    },
    carNameText: {
        color:'black',
        fontWeight:'600',
        fontSize:18
    },
    tripNumberText: {
        color:'black',
        fontWeight:'600',
        fontSize:13
    },
    priceText: {
        color: 'black',
        fontWeight:'900',
        fontSize:25
    },
    priceConteiner:{
        position: "absolute", 
        textAlign:'center',
        right: 0, 
        top: -20, 
        backgroundColor: 'white', 
        paddingLeft:20,
        paddingRight: 10,
        paddingBottom: 20,
        paddingTop: 5,
        borderTopLeftRadius: 20
    },
    reviewStar: {
        color:'red',
        fontSize:10,
        marginEnd:3
    },
});