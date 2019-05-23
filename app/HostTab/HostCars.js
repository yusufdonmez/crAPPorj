import React, { Component } from "react";
import { 
    StyleSheet,
    Text, 
    View, 
    Image,
    SafeAreaView
} from "react-native";
import {Container,Content,CardItem,Card,Left,Button,Icon,List,ListItem, Right} from "native-base";
import {Actions} from 'react-native-router-flux'
import { TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight } from "react-native-gesture-handler";
import * as theme from '../assets/theme';

class HostCars extends Component {
    constructor(props){
        super(props)
        this.state ={
            isLoading:true,
            hostCars : []
        };
    }

    getHostCars(){
        console.log(global.appAddress + '/service/c1/json/PrivateService/getUserCars/en_US?userID='+ (global.userId) +'&userSecStamp='+encodeURIComponent(global.userSecStamp))
        
        fetch(global.appAddress + '/service/c1/json/PrivateService/getUserCars/en_US?userID='+ (global.userId) +'&userSecStamp='+encodeURIComponent(global.userSecStamp),
        {
            credentials: 'include',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log('-hostcars-Component Did Mount Data List: '+ responseJson);
            if( responseJson != undefined && responseJson.length != 0 ){
                console.log('<--- hostCars service loaded from server --->');
                this.setState({isLoading:false,
                            hostCars: responseJson});
            }
            else {
                this.setState({isLoading:false,noRecordsFound:true});
            }
        })
        .catch((error) => {
            console.error('-hostcars- '+error.message + '  at line 41');
        });
    }

    componentDidMount(){
        this.getHostCars();
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

    render() { 
        return (
            <SafeAreaView style={{flex:1,backgroundColor: theme.COLORS.Primary}}>
                <Container>
                    <Content>                        
                        <List dataArray={this.state.hostCars} renderRow={item => 
                            <ListItem key={item.id} onPress={() => (Actions.CarDetails({title:item.Make,itemDetails:item}))}>
                                    <Card style={{flex:1,backgroundColor:'white'}}>
                                        <CardItem style={{position:'relative'}} cardBody>
                                            <Image source={{uri: global.appAddress+'/Image?imagePath='+ item.Photo}}
                                                style={styles.cardImage}/>
                                            <View style={styles.priceContainer}>
                                                <Text style={styles.priceText}> {item.DailyCost} SAR/Day </Text>
                                            </View>
                                        </CardItem>
                                        <CardItem style={ { height: 30,marginTop:10 } }>
                                            <Left>
                                                <Button transparent onPress={() => (Actions.CarDetails({title:item.Make,itemDetails:item}))}>
                                                    <Text style={styles.carNameText}>{item.Make} {item.Brand} </Text>
                                                    <Text style={styles.yearText}>{item.ModelYear}</Text>
                                                </Button>
                                            </Left>
                                        </CardItem>
                                        <CardItem style={ { height: 20 } }>
                                            <Left>
                                                <Button transparent  onPress={() => (Actions.CarDetails({title:item.Make,itemDetails:item}))}>
                                                    {item.tripCount != undefined && (
                                                        <Text style={styles.tripNumberText}>{item.tripCount} Trip { this._renderReviewStars(item.NoOfStar) }</Text>
                                                    )}
                                                </Button>
                                            </Left>
                                        </CardItem>
                                    </Card>
                            </ListItem>
                        }/>
                    </Content>
                </Container>
            </SafeAreaView>
        );
    }
}
export default HostCars;

const styles = StyleSheet.create({
    carNameText: {
        color:'black',
        fontWeight:'600',
        fontSize:25
    },
    yearText: {
        color:'black',
        fontWeight:'400',
        fontSize:16,
        marginStart:3
    },
    tripNumberText: {
        color:'black',
        fontWeight:'600',
        fontSize:13
    },
    priceContainer: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        backgroundColor: 'white',
        position:'absolute',
        right: 10,
        bottom:10,
    },
    priceText:{
        fontSize:10,
        color:'black',
        fontWeight: '900',
        padding:8,
    },
    cardImage: {
        height: 200,
        width: null, 
        flex: 1,
        borderRadius:20
    }
});