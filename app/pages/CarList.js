import React, { Component } from "react";
import {  FlatList,
    StyleSheet,
    Text, 
    TouchableHighlight,
    View, 
    Image,
    SafeAreaView,
    } from "react-native";

import {Actions} from 'react-native-router-flux'
import {Container,Content,CardItem,Card,Left,Button,Icon,List,ListItem, Right} from "native-base";

import MapViewComponent from "./MapViewComponent";

const MyRenderTitle = (
                        <Button onPress={() => {Actions.SearchModal()}} 
                                style={{width:'100%',height:'80%',flexDirection:"column",backgroundColor:'gray'}}>
                            <View>
                                <Text style={{fontSize:12,fontWeight:'700',color:'white'}}> TEST </Text>
                            </View>
                            <View >
                                <Text style={{fontSize:10,fontWeight:'700',color:'white'}}>Apr 20, 6:00 PM - Apr 26, 10:00 AM</Text>
                            </View>
                        </Button>
                        )

class CarList extends Component {
    constructor(props){
        super(props)
        this.state = {
            listOrMap:'list',
            refreshing:false,
            carList:[],
            northeast:null,
            southwest:null,
            searchLat:null,
            searchLng:null
        }
        this._renderReviewStars = this._renderReviewStars.bind(this);
        this.loadCarList = this.loadCarList.bind(this);
    }

    componentDidMount(){
        console.log('CarList.js componentDidMount')
        let northeast = this.props.geometry.viewport.northeast;
        let southwest = this.props.geometry.viewport.southwest;
        
        this.setState({northeast,southwest});
        this.loadCarList(northeast.lat,northeast.lng,southwest.lat,southwest.lng,this.props.geometry.location.lat,this.props.geometry.location.lng);
    }

    loadCarList(northeastLat,northeastLng,southwesLat,southwesLng,searchLat,searchLng){
        console.log('CarList.js loadCarList => '+ northeastLat +'-'+ northeastLng +'-'+ southwesLat +'-'+ southwesLng +'-'+ searchLat +'-'+ searchLng)
        this.setState({searchLat,searchLng})
        let lngMin = northeastLng < southwesLng ? northeastLng : southwesLng;
        let lngMax = northeastLng < southwesLng ? southwesLng : northeastLng;
        let latMax = northeastLat < southwesLat ? southwesLat : northeastLat;
        let latMin = northeastLat < southwesLat ? northeastLat : southwesLat;
        
        fetch(global.appAddress + '/service/c1/json/PublicService/carSearch/en_US?latMax='+latMax+'&latMin='+latMin+'&lngMax='+lngMax+'&lngMin='+lngMin,
        {
            method: 'GET',
            credentials: 'include',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log('Component Did Mount Data List carSearch: '+ responseJson.items);
            if( responseJson.items != undefined && responseJson.length != 0 ){
                this.setState({isLoading:false,
                            carList: responseJson.items});
            }
            else {
                this.setState({isLoading:false,noRecordsFound:true});
            }
        })
        .catch((error) => {
            console.error(error.message + ' on CarList at line 68');
        });
    }

    renderTitle() {
        <MyRenderTitle></MyRenderTitle>
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

    render() {
        return (
            <SafeAreaView style={{flex:1,backgroundColor: global.programPrimaryColor}}>
                <Container style={styles.container}>
                    <Content>
                        <List dataArray={this.state.carList} renderRow={item => 
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
                                            <Button transparent  onPress={() => (Actions.CarDetails({title:item.name,itemDetails:item}))}>
                                                {item.tripCount != undefined && (
                                                    <Text style={styles.tripNumberText}>{item.tripCount} Trip { this._renderReviewStars(item.NoOfStar) }</Text>
                                                )}
                                            </Button>
                                        </Left>
                                    </CardItem>
                                    <CardItem style={ {marginBottom:10,height: 30 } }>
                                        <Left>
                                            <Button small style={ { backgroundColor:'gray',height: 30} }
                                                    onPress={() => (Actions.CarDetails({title:item.Make,itemDetails:item}))}>
                                                <Text style={styles.specsBtns}>Book Instantly</Text>
                                            </Button>
                                        </Left>
                                    </CardItem>
                                </Card>
                            </ListItem>
                        }/>
                    </Content>
                    <View style={styles.mapAndFilterContainer}>
                        <TouchableHighlight onPress={() => {Actions.MapViewComponent({getCarList:this.loadCarList,carList:this.state.carList,lat:this.state.searchLat,lng:this.state.searchLng})}}>
                            <View style={styles.mapContainer}>
                                <Icon name='map' style={styles.mapAndFilterImageStyle} ></Icon>
                                <Text style={styles.mapAndFilterTextStyle}>Map</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => {Actions.pop()}}>
                            <View style={styles.filterContainer}>
                                <Icon name='search' style={styles.mapAndFilterImageStyle} ></Icon>
                                <Text style={styles.mapAndFilterTextStyle}>Filters</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </Container>
            </SafeAreaView>
        );
    }
}
export default CarList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',
        position:'relative',
    },
    cardImage: {
        height: 200,
        width: null, 
        flex: 1,
        borderRadius:20
    },
    flatListStyle: {
        flex:1,
        width:'100%',
        backgroundColor:'#F4F4F4',
        alignContent:'center'
    },
    cardContainer: {
        marginBottom:5,
        borderRadius:10,
        minHeight:100,
        borderColor:'#CCCCCC',
        borderWidth:1,
        backgroundColor:'white',
    },
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
    specsBtns: {
        color:'black',
        fontSize:10,
        padding:5
    },
    reviewStar: {
        color:'red',
        fontSize:10,
        marginEnd:3
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
    mapAndFilterContainer: {
        position:'absolute',
        bottom:20,
        justifyContent: "center",
        alignItems: 'center',
        flexDirection: 'row',
        width:'100%'
    },
    mapContainer:{
        width:100,
        flexDirection:'row',
        borderColor:'gray',
        borderWidth: 1,
        backgroundColor:'white',
        padding:10,
        justifyContent:'center',
        alignItems: 'center',
        borderTopStartRadius:20,
        borderBottomStartRadius:20,
    },
    filterContainer:{
        width:100,
        flexDirection:'row',
        borderColor:'gray',
        borderWidth: 1,
        backgroundColor:'white',
        padding:10,
        justifyContent:'center',
        alignItems: 'center',
        borderTopEndRadius:20,
        borderBottomEndRadius:20,
    },
    mapAndFilterTextStyle: {
        fontSize:14,
        fontWeight:'700',
        color:'#404040',
        paddingStart:10,
    },
    mapAndFilterImageStyle:{
        color:'#404040',
        fontSize:14
    }
});