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
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

class HistoryTrips extends Component {
    constructor(props){
        super(props)
        this.state ={
            isLoading:true,
            noRecordsFound:true,
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
                            pastTrips: responseJson,
                            noRecordsFound:false});
            }
            else {
                this.setState({isLoading:false,noRecordsFound:true});
                console.log('PASTTRIPS - no records found');
            }
        })
        .catch((error) => {
            console.error('-pastTrips- '+error.message + '  at line 52');
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
        <View style={styles.listItem}>
            <View style={styles.itemHead}>
                    <Text>{item.FromDate} -{ item.ToDate}</Text>
            </View>
            <View style={styles.itemBody}>
                <View style={styles.itemContent}>
                    <Text>{item.Name}'s {item.ModelYear} {item.Make} {item.Brand}</Text>
                </View>
                <Image source={{uri: global.appAddress+'/Image?imagePath='+ item.Photo}}
                                                    style={styles.itemImage}/>
            </View>
        </View>
    )
    render() {
        if(this.state.noRecordsFound){
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
        } else {
            return(
                <FlatList 
                data={this.state.pastTrips}
                renderItem={this._renderItem}
                keyExtractor={(item) => item.id.toString()}
                />
            );
        }
    }
}
export default HistoryTrips;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listItem:{
        borderBottomWidth:1,
        borderBottomColor: '#888',
    },
    itemHead:{
        flex:1,
        padding:10,
        alignItems: 'center',
        borderBottomWidth:1,
        borderBottomColor: '#666',
    },
    itemBody:{
        flex:3,
        flexDirection:'row',
        padding:10,
    },
    itemContent:{
        flex:2,
        justifyContent: 'center',
    },
    itemImage:{
        height: 100,
        flex:1,
    }
});