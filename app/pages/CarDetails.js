import React, { Component } from "react";
import { 
    Dimensions,
    Image,
    StatusBar,
    StyleSheet, 
    Text, 
    View,
    SafeAreaView,
    Animated
    } from "react-native";
    
import {Actions} from 'react-native-router-flux'

import PickupAndReturn from './PickupAndReturn'

import {Container,Content,Left,Button,Icon,Grid, Row,Body, Right, Header, ListItem, Thumbnail} from "native-base";
import { TouchableOpacity, TouchableHighlight } from "react-native-gesture-handler";

const {width,height} = Dimensions.get('window')

class CarDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            scrollY: new Animated.Value(0),
            displayPickup:false,
            address:'Kocaeli Merkez mah. ecenaz sok. no:1'
        };

        this.handlePickupDisplay = this.handlePickupDisplay.bind(this);

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

    render() {
        return (
            <SafeAreaView style={{flex:1,backgroundColor: global.programPrimaryColor}}>
                <Container style={styles.fill}>
                    <Content>
                        <Grid>
                            <Row >
                                <Image source={this.props.itemDetails.img} style={{height: 200, width: null, flex: 1}}/>
                            </Row>
                            <Row style={ { height: 20 } }>
                                <Button transparent>
                                    <Text style={styles.ownerText}>{this.props.itemDetails.owner}</Text>
                                </Button>
                            </Row>
                            <Row style={ { height: 30 } }>
                                <Button transparent>
                                    <Text style={styles.carNameText}>{this.props.itemDetails.name}</Text>
                                    <Text style={styles.yearText}>{this.props.itemDetails.year}</Text>
                                </Button>
                            </Row>
                            <Row style={ { height: 30 } }>
                                <Button transparent>
                                    <Text style={styles.tripNumberText}> 
                                        { this._renderReviewStars(this.props.itemDetails.star) } 
                                        {this.props.itemDetails.tripNumber} Trip
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
                                    <Text style={{color:global.programSecondaryColor}}> Change > </Text>
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
                                        <Text style={{color:global.programSecondaryColor}}> Change > </Text>
                                    </Right>
                                </Row>
                            </TouchableHighlight>

                            <Row style={styles.titleContainer} >
                                <Text style={styles.titleText}>Features</Text>
                            </Row>
                            <Row style={styles.specContainer}>
                                {this.props.itemDetails.features.map((item, i,arr) =>
                                    <View style={{height:40}}>
                                    {i < Math.floor(width/70) && (
                                        <Icon name={item.icon} size={24} color='gray' style={styles.featureIcon}></Icon>
                                        )
                                    }
                                    {i == Math.floor(width/70)+1 && (
                                        <View style={{flex:1,justifyContent: 'flex-end',height:40}}>
                                            <Button transparent iconRight onPress={() => (Actions.Features({featureList:this.props.itemDetails.features}))}>
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
                                    <Icon name="star" size={24} color='gray'></Icon>
                                </Left>
                                <Body style={{flex:1,justifyContent: 'flex-start'}}>
                                    <Text> Reviews </Text>
                                </Body>
                                <Right style={styles.reviewBtnContainer}>
                                    <TouchableOpacity style={styles.reviewBtnContainer} onPress={() => (Actions.Reviews({userID:1}) )}>
                                        { this._renderReviewStars(4) }
                                        <Icon name='arrow-forward' size={20} color='gray'></Icon>
                                    </TouchableOpacity>
                                </Right>
                            </Row>


                            <Row avatar  style={{padding:10}} onPress={() => {Actions.ProfilePage();}}>
                                <View style={{flex:1,alignItems:'flex-start'}}>
                                    <Text style={{fontWeight: '600',color:'gray'}}>OWNED BY</Text>
                                    <Text style={{fontWeight: '600',fontSize:30,color:global.programSecondaryColor}}>William L.</Text>
                                    <View style={{flexDirection: 'row'}}>
                                        { this._renderReviewStars(4) }
                                    </View>
                                </View>
                                <View style={{flex:1,alignItems:'flex-end'}}>
                                    <Thumbnail large source={require('../assets/user.jpeg')} />
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
        fontSize:25,
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
        fontSize:35
    },
    priceConteiner:{
        position: "absolute", 
        right: 0, 
        top: -20, 
        backgroundColor: 'white', 
        padding: 20, 
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
        borderColor:'#5bd88c',
        backgroundColor: '#5bd88c'
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
        flex: 4,
        alignItems: 'center',
        justifyContent: 'flex-end',
        
    }
});