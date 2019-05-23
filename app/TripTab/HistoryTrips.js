import React, { Component } from "react";
import { 
    StyleSheet,
    Text, 
    View, 
    Image,
    SafeAreaView,
    FlatList
} from "react-native";
import {Container,Content,CardItem,Card,Left,Button,Icon,List,ListItem, Right} from "native-base";
import {Actions} from 'react-native-router-flux'
import { TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight } from "react-native-gesture-handler";
import * as theme from '../assets/theme';

class HistoryTrips extends Component {
    constructor(props){
        super(props)
        this.state ={
            isLoading:true,
            pastTrips : []
        };
    }

    getPastTrips(){
        console.log(global.appAddress + '/service/c1/json/PrivateService/getPastTrips/en_US?userID='+ (global.userId) +'&userSecStamp='+encodeURIComponent(global.userSecStamp))
        
        fetch(global.appAddress + '/service/c1/json/PrivateService/getPastTrips/en_US?userID='+ (global.userId) +'&userSecStamp='+encodeURIComponent(global.userSecStamp),
        {
            credentials: 'include',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log('-pastTrips-Component Did Mount Data List: '+ responseJson);
            if( responseJson != undefined && responseJson.length != 0 ){
                console.log('<--- pastTrips service loaded from server --->');
                this.setState({isLoading:false,
                            pastTrips: responseJson});
            }
            else {
                this.setState({isLoading:false,noRecordsFound:true});
            }
        })
        .catch((error) => {
            console.error('-pastTrips- '+error.message + '  at line 48');
        });
    }

    componentDidMount(){
        this.getPastTrips();
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
    _renderItem = ({item}) => (
        <View key={item.id}>
        <Text>flatlist:{item.id}</Text>
            <Text>{item.FromDate}</Text>
            <Text>{item.ToDate}</Text>
            <Text>{item.Make}</Text>
            <Text>{item.Name}</Text>
        </View>
    )
    render() {
        return (
                        <View style={styles.container}><Text>History Trips</Text></View>
                  
        );
    }
}
export default HistoryTrips;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }   
});