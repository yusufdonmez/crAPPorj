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
			stars.push((<Icon key={Math.random()} style={styles.reviewStar} name={starName} ></Icon>));
        }
        return stars
    }

    render(){
        return (
            <View style={{marginTop:20,marginBottom:20,backgroundColor:'white'}}>
                <Text style={{marginLeft:10,fontWeight: '600',marginBottom:5,textTransform:'uppercase'}}>{this.props.headTitle}</Text>
                <ScrollView style={styles.scrollContainer} horizontal={true} showsHorizontalScrollIndicator={false}>
                    {this.props.datas.map((item, i) =>
                        <View key={`${this.props.headTitle}-${item.id}`}  style={styles.cardContainer}>
                            <TouchableOpacity style={{flex:1}} onPress={ () => {this.props.openCarDetailsNav(item)}}>
                                <Image style={{width:null,height:'80%',resizeMode:'cover'}}
                                        source={{uri: global.appAddress+'/Image?imagePath='+ item.Photo}}></Image>
                                <View style={styles.carInfoContainer}>
                                    <View style={{flex:9,marginRight:70}}>
                                        <View style={{flexDirection:'row'}}>
                                            <Text style={styles.carNameText} ellipsizeMode="tail" numberOfLines={1}>{item.Make} {item.Brand} </Text>
                                            <Text style={{fontSize:12,fontWeight:'600'}}>{item.ModelYear}</Text>
                                        </View>
                                        <Text style={styles.tripNumberText}> {item.tripCount} Trip  { this._renderReviewStars(item.NoOfStar) } </Text>
                                    </View>
                                    <View style={styles.priceConteiner}>
                                        <Text style={styles.priceText}>{item.DailyCost}</Text>
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
        height:280
    },
    normalTextStyle: {
        color: 'black',
        fontWeight:'400',
        fontSize:13,
        textAlign:'center'
    },
    cardContainer: {
        height:280,
        width: scrnWidth - 50,
        marginRight:10,
        marginLeft:10,
        position:'relative',
        backgroundColor:'white'
    },
    carInfoContainer: {
        flex:2,
        flexDirection:'row',
        backgroundColor:'white',
        paddingTop:10,
        paddingBottom:10,
        position:'relative',
    },
    carNameText: {
        color:'black',
        fontWeight:'600',
        fontSize:25,
    },
    carYearText: {
        color:'black',
        fontWeight:'600',
        fontSize:13,
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
        justifyContent:'center',
        alignItems:'center',
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
        fontSize:18,
        marginEnd:3
    },
});