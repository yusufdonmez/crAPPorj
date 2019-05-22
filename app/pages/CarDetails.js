import React, { Component } from "react";
import { 
    Dimensions,
    Image,
    AsyncStorage,
    StyleSheet, 
    Text, 
    View,
    SafeAreaView,
    ScrollView,
    Animated
    } from "react-native";
    
import {Actions} from 'react-native-router-flux'

import PickupAndReturn from '../SubPages/PickupAndReturn'

import {Container,Content,Left,Button,Icon,Grid, Row,Body, Right, Header, ListItem, Thumbnail} from "native-base";
import { TouchableOpacity, TouchableHighlight } from "react-native-gesture-handler";

import * as theme from '../assets/theme'

const {width,height} = Dimensions.get('window')


class CarDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading:true,
            scrollY: new Animated.Value(0),
            displayPickup:false,
            carDetails:[],
            address:'Kocaeli Merkez mah. ecenaz sok. no:1'
        };

        this.handlePickupDisplay = this.handlePickupDisplay.bind(this);

        this._renderReviewStars = this._renderReviewStars.bind(this);
    }

    getCarDetails(){
        console.log(global.appAddress + '/service/c1/json/PublicService/carDetails/en_US')
        
        fetch(global.appAddress + '/service/c1/json/PublicService/carDetails/en_US?id=' + this.props.itemDetails.id ,
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
                console.log('<--- carDetails service loaded from server --->');
                this.setState({isLoading:false,
                            carDetails: responseJson});
            }
            else {
                this.setState({isLoading:false,noRecordsFound:true});
            }
        })
        .catch((error) => {
            console.error(error.message + ' on CarDetails at line 64');
        });
    }
    setRecentlyViewed(itemID){
        AsyncStorage.getItem('@MySuperStore:recentlyViewed')
        .then(req => JSON.parse(req)).then((value) => {
            if(value == null){
                value = [];
                value.unshift(itemID);
            }
            else if( value.length > 5  && !value.includes(itemID) ) {
                value.unshift(itemID);
                value.pop();
            }
            else if(!value.includes(itemID)) {
                value.unshift(itemID);
            }
            AsyncStorage.setItem('@MySuperStore:recentlyViewed', JSON.stringify(value));
        })
        .catch(error => console.log('setRecentlyViewed  ' + error.message));

    }

    componentDidMount(){
        this.setRecentlyViewed(this.props.itemDetails.id);
        this.getCarDetails();
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

    handlePickupDisplay (newDisplay) {
        this.setState({ displayPickup: newDisplay });
    }

    triggerPicupModal() {
        this.setState(prevState => {
            return {
                displayPickup: true
            }
        });
    }

    shareCar(){
        {/*Use Ri Zone application for share event*/}
        Actions.Account();
    }

    render() {
        const data = this.state.carDetails;
        console.log('carid: '+this.props.itemDetails.id);
        return (
            <SafeAreaView style={{flex:1,backgroundColor: theme.COLORS.Primary}}>
                <Container style={styles.fill}>
                    <Content>
                        <Grid >
                            <Row style={ {position:"relative" } } >
                                <ScrollView style={{height: 200, width: null, flex: 1}} pagingEnabled={true} horizontal={true} showsHorizontalScrollIndicator={false}>
                                    {data.carPhotos != undefined && data.carPhotos.map((item, i) =>
                                        <View key={i} style={styles.cardContainer}>
                                            <Image style={{height: 200, width: null, flex: 1}}
                                                source={{uri: global.appAddress+'/Image?imagePath='+ item.Photo}}
                                            />

                                            <View style={styles.imgInfoContainer}>
                                                <View style={styles.nOfImgContainer}>
                                                    <View style={styles.borderView}>
                                                        <Text style={styles.noOfImg}>{i+1} of {data.carPhotos.length}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.verifiedContainer}>
                                                    <View style={styles.borderView}>
                                                        <Text style={styles.verifiedText}>Verified Photo</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    )}
                                </ScrollView>
                            </Row>
                            <Row style={ { height: 20,position:"relative" } }>
                                <Button transparent>
                                    <Text style={styles.ownerText}>{data.DailyCost}</Text>
                                </Button>
                                <View style={styles.priceConteiner}>
                                    <Text style={styles.priceText}>{data.DailyCost}</Text>
                                    <Text style={styles.normalTextStyle}>SAR</Text>
                                    <Text style={styles.normalTextStyle}>per day</Text>
                                </View>
                            </Row>
                            <Row style={ { height: 30 } }>
                                <Button transparent>
                                    <Text style={styles.carNameText}>{data.Make} {data.Brand} </Text>
                                    <Text style={styles.yearText}>{data.ModelYear}</Text>
                                </Button>
                            </Row>
                            <Row style={ { height: 30 } }>
                                <Button transparent>
                                    <Text style={styles.tripNumberText}> 
                                        {data.CarTripCount} Trip { this._renderReviewStars(data.NoOfStar) }
                                    </Text>
                                </Button>
                            </Row>


                            <Row style={styles.titleContainer} >
                                <Text style={styles.titleText}>Trip Dates</Text>
                            </Row>
                            <Row style={styles.specContainer}>
                                <Left style={styles.iconContainer}>
                                    <Icon name="calendar" size={24} color='gray'></Icon>
                                </Left>
                                <Body style={styles.specPropContainer}>
                                    <Text>Fri, Mar 22, 10:00 AM</Text>
                                    <Text>Fri, Mar 22, 10:00 AM</Text>
                                </Body>
                                <Right style={styles.changeBtnContainer}>
                                    <Text style={{color:theme.COLORS.Secondary}}> Change > </Text>
                                </Right>
                            </Row>

                            <Row style={styles.titleContainer} >
                                <Text style={styles.titleText}>Picup & Return</Text>
                            </Row>

                            <TouchableHighlight onPress={() => (this.triggerPicupModal())}>
                                <Row style={styles.specContainer}>
                                    <Left style={styles.iconContainer}>
                                        <Icon name="pin" size={24} color='gray'></Icon>
                                    </Left>
                                    <Body style={styles.specPropContainer}>
                                        <Text>{this.props.address}</Text>
                                    </Body>
                                    <Right style={styles.changeBtnContainer}>
                                        <Text style={{color:theme.COLORS.Secondary}}> Change > </Text>
                                    </Right>
                                </Row>
                            </TouchableHighlight>

                            <Row style={styles.titleContainer} >
                                <Text style={styles.titleText}>Features</Text>
                            </Row>
                            <Row style={styles.specContainer}>
                                {data.carFeature != undefined && data.carFeature.map((item, i,arr) =>
                                    <View key={item.EngName} style={{height:40}}>
                                    {i < Math.floor(width/70) && (
                                        <Icon name="add-circle" size={24} color='gray' style={styles.featureIcon}></Icon>
                                        )
                                    }
                                    <Text style={{fontSize:10}}>{item.EngName}</Text>
                                    {i == Math.floor(width/70)+1 && (
                                        <View style={{flex:1,justifyContent: 'flex-end',height:40}}>
                                            <Button transparent iconRight onPress={() => (Actions.Features({featureList:data.carFeature}))}>
                                                <Text> {arr.length - Math.floor((width/70))} More > </Text>
                                            </Button>
                                        </View>
                                        )
                                    }
                                    </View>
                                )}
                            </Row>

                            <Row style={styles.specContainer}>
                                <Left style={styles.iconContainer}>
                                    <TouchableOpacity onPress={() => (Actions.Guidelines() )}>
                                        <Icon name="document" size={24} color='gray'></Icon>
                                    </TouchableOpacity>
                                </Left>
                                <Body style={{flex:2,justifyContent: 'flex-start'}}>
                                    <TouchableOpacity style={{textAlign:'left'}} onPress={() => (Actions.Guidelines({guidelines:data.Guidelines}) )}>
                                        <Text> Guidelines </Text>
                                    </TouchableOpacity>
                                </Body>
                                <Right style={{flex:5}}>
                                </Right>
                            </Row>

                            <Row style={styles.specContainer}>
                                <Left style={styles.iconContainer}>
                                    <TouchableOpacity onPress={() => (Actions.FAQuestions() )}>
                                        <Icon name="help-buoy" size={24} color='gray'></Icon>
                                    </TouchableOpacity>
                                </Left>
                                <Body style={{flex:2,justifyContent: 'flex-start'}}>
                                    <TouchableOpacity style={{textAlign:'left'}} onPress={() => (Actions.FAQuestions() )}>
                                        <Text style={{textAlign: 'left'}}> FAQ </Text>
                                    </TouchableOpacity>
                                </Body>
                                <Right  style={{flex:5}}>
                                </Right>
                            </Row>

                            <Row style={styles.specContainer}>
                                <Left style={styles.iconContainer}>
                                    <Icon name="star" size={24} color='gray'></Icon>
                                </Left>
                                <Body style={{flex:2,justifyContent: 'flex-start'}}>
                                    <Text> Reviews </Text>
                                </Body>
                                <Right style={styles.reviewBtnContainer}>
                                    <TouchableOpacity style={styles.reviewBtnContainer} 
                                                    onPress={() => (Actions.Reviews({userID:1,
                                                                                     carID:this.props.itemDetails.id, 
                                                                                     NoOfStar:data.NoOfStar, 
                                                                                     NoOfReview:data.NoOfReview}) )}>
                                        { this._renderReviewStars(4) }
                                        <Icon name='arrow-forward' size={20} color='gray'></Icon>
                                    </TouchableOpacity>
                                </Right>
                            </Row>


                            <Row avatar  style={{padding:10}} onPress={() => {Actions.ProfilePage({userID:data.UserID});}}>
                                <View style={{flex:1,alignItems:'flex-start'}}>
                                    <Text style={{fontWeight: '600',color:'gray'}}>OWNED BY</Text>
                                    <Text style={{fontWeight: '600',fontSize:30,color:theme.COLORS.Secondary}}>{data.userName}</Text>
                                    <View style={{flexDirection: 'row'}}>
                                        { this._renderReviewStars(data.userStar) }
                                    </View>
                                </View>
                                <View style={{flex:1,alignItems:'flex-end'}}>
                                    <Thumbnail large  source={{uri: global.appAddress+'/Image?imagePath='+ data.userPhoto}} />
                                </View>
                            </Row>

                            <Row>
                                <Body style={{flex:1,padding:20}}>
                                    <Button bordered block dark>
                                        <Icon name="heart-empty" style={{color:'black'}}></Icon>
                                        <Text>Add to favarites</Text>
                                    </Button>
                                </Body>
                            </Row>
                        </Grid>
                        
                        <PickupAndReturn display = { this.state.displayPickup } 
                                        onDisplayChanged={this.handlePickupDisplay}
                            ></PickupAndReturn>
                    </Content>
                </Container>

                <View style={styles.checkoutContainer}>
                    <Button style={styles.checkoutBtn} onPress={() => {Actions.CheckoutPage();}}>
                        <Text style={styles.checkoutText}>Go to checkout</Text>
                    </Button>
                </View>

            </SafeAreaView>
        );
    }
}
export default CarDetails;

const styles = StyleSheet.create({
    fill: {
        flex:1,
        paddingBottom:65
    },
    container: {
        flex: 1,
        height:300
    },
    titleContainer: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        paddingTop:20
    },
    titleText:{
        padding:10,
        fontSize:12,
        fontWeight:'700'
    },
    normalTextStyle: {
        color: 'black',
        fontWeight:'400',
        fontSize:13,
        textAlign:'center'
    },
    carInfoContainer: {
        height:'auto',
        flexDirection:'row',
        backgroundColor:'white',
        padding:10,
        position:'relative',
    },
    specContainer: {
        backgroundColor:'white',
        padding:10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    ownerText: {
        color:'black',
        fontWeight:'600',
        fontSize:15,
        padding:0,
        marginStart:10,
        height: 20
    },
    carNameText: {
        color:'black',
        fontWeight:'600',
        fontSize:22,
        marginStart:10
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
        fontSize:13,
        marginStart:10
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
        paddingRight: 20,
        paddingBottom: 20,
        paddingTop: 5,
        borderTopLeftRadius: 20
    },
    iconContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    changeBtnContainer: {
        flex: 2,
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    specPropContainer: {
        flex: 4,
        flexDirection: 'column'
    },
    reviewStar: {
        color:'red',
        fontSize:22,
        marginEnd:3
    },
    checkoutContainer: {
        flexDirection: "row",
        flex: 1, 
        justifyContent:'flex-end',
        position: "absolute", 
        bottom: 60, 
        left: 0, 
        right: 0, 
        height: 45,
        backgroundColor:'#ffffffcf'
    },
    checkoutBtn: {
        margin:15,
        borderWidth: 1,
        borderRadius: 5,
        borderColor:theme.COLORS.Secondary,
        backgroundColor: theme.COLORS.Secondary
    },
    checkoutText: {
        justifyContent: 'center', 
        textAlign:'center',
        color:'white',
        width: '100%',
        fontSize:22,
        fontWeight: '700'
    },
    featureIcon: {
        marginRight: 30
    },
    reviewBtnContainer: {
        flexDirection: 'row',
        flex: 5,
        alignItems: 'center',
        justifyContent: 'flex-end',
        
    },
    imgInfoContainer:{
        flexDirection: 'row',
        position: 'absolute',
        left: 0,
        bottom:0
    },
    nOfImgContainer:{
        backgroundColor: "#4b4849b3",
        margin: 10,
        padding:3,
        borderRadius:20
    },
    verifiedContainer: {
        backgroundColor: "#4b4849b3",
        margin: 10,
        padding:3,
        borderRadius:20
    },
    noOfImg: {
        fontSize:10,
        color:'white'
    },
    verifiedText: {
        fontSize:10,
        color:'white'
    },
    borderView:{
        borderColor:'white',
        borderWidth: 1,
        borderRadius:20,
        paddingTop:2,
        paddingBottom:2,
        paddingRight:5,
        paddingLeft: 5
    },
    cardContainer: {
        height:200,
        width: width,
        position:'relative',
        backgroundColor:'white'
    },

});