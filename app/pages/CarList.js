import React, { Component } from "react";
import {  FlatList,
    StyleSheet,
    Text, 
    View, 
    Image,
    SafeAreaView,
    Dimensions,
    } from "react-native";

import {Actions} from 'react-native-router-flux'
import {Container,Content,CardItem,Card,Left,Button,Icon,List,ListItem, Right} from "native-base";

import PriceMarker from '../components/AnimatedPriceMarker';

import * as theme from '../assets/theme';

import MapView, {
    PROVIDER_GOOGLE, Marker, Animated as AnimatedMap,
    AnimatedRegion
} from 'react-native-maps'
import { TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight } from "react-native-gesture-handler";

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

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const ITEM_SPACING = 10;
const ITEM_PREVIEW = 10;
const ITEM_WIDTH = screen.width - (2 * ITEM_SPACING) - (2 * ITEM_PREVIEW);
const ITEM_PREVIEW_HEIGHT = 150;
class CarList extends Component {
    constructor(props){
        super(props)
        this.state = {
            listOrMap:'list',
            refreshing:false,
            carList:[],
            updateRegion:false,
            northeast:null,
            southwest:null,
            searchLat:null,
            searchLng:null,
            checkScroll:false,
            region: new AnimatedRegion({
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }),
            mapBoundaries:null,
            selectedID:-1,
        }
        this._renderReviewStars = this._renderReviewStars.bind(this);
        this.loadCarList = this.loadCarList.bind(this);
    }

    componentDidMount(){
        console.log('CarList.js componentDidMount')
        const {northeastLat,northeastLng,southwestLat,southwestLng,searchLat,searchLng} = this.props

        this.loadCarList(northeastLat,northeastLng,southwestLat,southwestLng,searchLat,searchLng);
    }

    loadCarList(northeastLat,northeastLng,southwestLat,southwestLng,searchLat,searchLng){
        console.log('CarList.js loadCarList => '+ northeastLat +'-'+ northeastLng +'-'+ southwestLat +'-'+ southwestLng +'-'+ searchLat +'-'+ searchLng)
        this.setState({searchLat,searchLng})
        let lngMin = northeastLng < southwestLng ? northeastLng : southwestLng;
        let lngMax = northeastLng < southwestLng ? southwestLng : northeastLng;
        let latMax = northeastLat < southwestLat ? southwestLat : northeastLat;
        let latMin = northeastLat < southwestLat ? northeastLat : southwestLat;
        
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
                            carList: responseJson.items,
                            selectedID: -1});
            }
            else {
                this.setState({isLoading:false,noRecordsFound:true});
            }
        })
        .catch((error) => {
            console.error(error.message + ' on CarList at line 68');
        });
    }

    scrollToIndex = (index,lat,lng) => {
        if(this.state.selectedID == -1) {
            this.setState({selectedID:index}); //Workaround for first time press marker opening first car always
            this.flatListRef.scrollToIndex({animated: true, index: index});
        }
        this.setState({selectedID:index})
        this.flatListRef.scrollToIndex({animated: true, index: index});
        this.updateRegion(lat,lng); 
    }

    updateRegion(lat,lng){
        console.log('MapViewComponent.js updateRegion =>' + lat + '-' + lng ); 
        var newRegion = {
            latitude: lat,
            longitude:lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0922 * screen.width / screen.height,
        }
        this.setState({region: newRegion})
    }

    searchThisLocation(){
        console.log('MapViewComponent.js searchThisLocation => ' + this.state.region.latitude + '-' + this.state.region.longitude); 
        var boundaries = this.state.mapBoundaries._55;
        this.loadCarList(boundaries.northEast.latitude,
                            boundaries.northEast.longitude,
                            boundaries.southWest.latitude,
                            boundaries.southWest.longitude,
                            this.state.region.latitude,
                            this.state.region.longitude);
    }

    onRegionChangeComplete = (region) => {
        console.log('onRegionChangeComplete : ' + region);
        this.setState({
            mapBoundaries: this.map.getMapBoundaries(),
            region
        });
    } 

    // Render Functions
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
			stars.push((<Icon key={Math.random()} style={styles.reviewStar} name={starName} ></Icon>));
        }
        return stars
    }

    _renderItem = ({item}) => (
        <TouchableWithoutFeedback style={{height:90}}
            key={`car-${item.id}`} onPress={() => (Actions.CarDetails({title:item.Make,itemDetails:item}))} >
            <View style={[styles.car, styles.shadow]}>
                <View style={styles.carInfoContainer}>
                    <View style={styles.carImage}>
                        <Image style={styles.horizontalCardImage}
                            source={{uri: global.appAddress+'/Image?imagePath='+ item.Photo}}/>
                    </View>
                    <View style={styles.carInfo}>
                        <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <View>
                                <Text style={{fontSize:18,textTransform: 'uppercase',fontWeight: '900'}}>{item.Make} {item.Brand} </Text>
                                <Text style={{fontSize:14,fontWeight: '700'}}>{item.ModelYear}</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={styles.tripNumberText}> 
                                    {item.tripCount} Trip { this._renderReviewStars(item.NoOfStar) }
                                </Text>
                            </View>
                            <Text style={{fontWeight:'600'}} >
                                {item.DailyCost} SAR per day
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )

    onViewableItemsChanged = ({ viewableItems }) => {
        var index = viewableItems[0].index
        if(this.state.checkScroll) {
            if( index > -1 ) {
                this.updateRegion(this.state.carList[index].Lat,this.state.carList[index].Lng);
                this.setState({selectedID: index });
            }
            else{
                index = 0;
            }
        }
    }

    renderCarHorizontal = () => {
        return (
            <FlatList
                ref={(ref) => { this.flatListRef = ref; }}
                style={[styles.carsList, this.state.selectedID == -1 ? {bottom: -500}: {bottom:0}]} 
                horizontal={true}
                data={this.state.carList}
                extraData={this.state}
                renderItem={this._renderItem}
                pagingEnabled={true}
                keyExtractor={(item, index) => index}
                scrollEventThrottle={16}
                onScrollBeginDrag={() => (this.setState({checkScroll:true}))}
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 50
                }}
                onViewableItemsChanged={this.onViewableItemsChanged }
            />
        )
    }

    renderSearchButton = () => {
        return (
            <View style={styles.searchButtonContainer}>
                <Button style={styles.searchBtn} onPress={() => this.searchThisLocation()}>
                    <Text style={{color:'black',textAlign:'center'}}>Search here</Text>
                </Button>
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView style={{flex:1,backgroundColor: theme.COLORS.Primary}}>
                <Container style={styles.container}>
                    {this.state.listOrMap == 'list' && (
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
                    )}
                    {this.state.listOrMap == 'map' && (
                        <SafeAreaView style={{flex:1,backgroundColor: theme.COLORS.Primary}}>
                            <View style={{ flex: 1 }}>
                                <MapView
                                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                    style={styles.map}
                                    ref={ref => { this.map= ref; }}
                                    region={this.state.region}
                                    onRegionChangeComplete={region => this.onRegionChangeComplete(region)}
                                >
                                    {this.state.carList.map((marker, index) => {
                                        return (
                                            <Marker
                                                style={{zIndex: index === this.state.selectedID ? 10000 : 1}}
                                                key={marker.id}
                                                coordinate={{
                                                            latitude: marker.Lat,
                                                            longitude: marker.Lng,
                                                        }}
                                                onPress={() => { this.setState({checkScroll:false});this.scrollToIndex(index,marker.Lat,marker.Lng); }}
                                            >
                                                <PriceMarker
                                                    amount={marker.DailyCost}
                                                    selected={ index === this.state.selectedID ? true : false}
                                                />
                                            </Marker>
                                        );
                                    })}
                                </MapView>
                                {this.renderCarHorizontal()}
                                {this.renderSearchButton()}
                            </View>
                        </SafeAreaView>
                    )}
                    <View style={[styles.mapAndFilterContainer,this.state.selectedID == -1 || this.state.listOrMap == 'list' ? {bottom: 20}: {bottom:100}]}>
                        {this.state.listOrMap == 'list' && (
                            <TouchableWithoutFeedback onPress={() => { this.setState({listOrMap:'map'}); this.updateRegion(this.state.searchLat,this.state.searchLng); }}>
                                <View style={styles.mapContainer}>
                                    <Icon name='map' style={styles.mapAndFilterImageStyle} ></Icon>
                                    <Text style={styles.mapAndFilterTextStyle}>Map</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )}
                        {this.state.listOrMap == 'map' && (
                            <TouchableWithoutFeedback onPress={() => { this.setState({listOrMap:'list'}); this.updateRegion(this.state.searchLat,this.state.searchLng); }}>
                                <View style={styles.mapContainer}>
                                    <Icon name='map' style={styles.mapAndFilterImageStyle} ></Icon>
                                    <Text style={styles.mapAndFilterTextStyle}>List</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )}
                        <TouchableWithoutFeedback onPress={() => {Actions.pop()}}>
                            <View style={styles.filterContainer}>
                                <Icon name='search' style={styles.mapAndFilterImageStyle} ></Icon>
                                <Text style={styles.mapAndFilterTextStyle}>Filters</Text>
                            </View>
                        </TouchableWithoutFeedback>
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
    },
    //Map View style start

    mapStyle: {
        width: '100%',
        height: '100%'
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    markerStyle: {
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 5
    },

    itemContainer: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        paddingHorizontal: (ITEM_SPACING / 2) + ITEM_PREVIEW,
        position: 'absolute',
        // top: screen.height - ITEM_PREVIEW_HEIGHT - 64,
        paddingTop: screen.height - ITEM_PREVIEW_HEIGHT - 64,
        // paddingTop: !ANDROID ? 0 : screen.height - ITEM_PREVIEW_HEIGHT - 64,
    },
    item: {
        width: ITEM_WIDTH,
        height: screen.height + (2 * ITEM_PREVIEW_HEIGHT),
        backgroundColor: 'red',
        marginHorizontal: ITEM_SPACING / 2,
        overflow: 'hidden',
        borderRadius: 3,
        borderColor: '#000',
    },
    carsList: {
        position: 'absolute',
        right: 0,
        left: 0,
        paddingBottom: 5,
    },
    horizontalCardImage: {
        height: 90,
        width: '100%', 
        flex: 1,
        borderRadius:5
    },
    carImage:{
        flex:1
    },
    car: {
        flexDirection: 'row',
        backgroundColor: theme.COLORS.white,
        borderRadius: 5,
        marginHorizontal: theme.SIZES.base * 2,
        width: screen.width - (24 * 2),
    },
    carInfoContainer: { 
        flex: 1.5, 
        flexDirection: 'row' 
    },
    carInfo: {
        flex:1,
        justifyContent: 'space-evenly',
        marginHorizontal: theme.SIZES.base * 1.5,
    },
    carIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tripNumberText: {
        color:'black',
        fontWeight:'600',
        fontSize:13,
        marginStart:10
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
    },
    searchButtonContainer: {
        position:'absolute',
        top: 20,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        flexDirection: 'row'
    },
    searchBtn: {
        padding:10,
        width:100,
        opacity: 0.7,
        backgroundColor: 'white',
        justifyContent:'center',
        alignItems:'center',
        borderColor:'gray',
        borderWidth: 1,
        borderRadius: 20
    }

});