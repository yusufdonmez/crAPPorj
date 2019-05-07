import React, { Component } from "react";
import {
    View,
    Text,
    Animated,
    StyleSheet,
    Dimensions,
    Image,
    ScrollView,
    SafeAreaView,
    FlatList
} from "react-native";

import {Actions} from 'react-native-router-flux'

import PriceMarker from '../components/AnimatedPriceMarker';

import * as theme from '../assets/theme';

import {Icon, Button} from "native-base";

import MapView, {
    PROVIDER_GOOGLE, Marker, Animated as AnimatedMap,
    AnimatedRegion
} from 'react-native-maps'
import { TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight } from "react-native-gesture-handler";

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

class MapViewComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentWillMount(){
        console.log('MapViewComponent.js componentWillMount'); 
        this.updateRegion(this.props.lat,this.props.lng);
    }

    onRegionChangeComplete = (region) => {
        this.setState({
            mapBoundaries: this.map.getMapBoundaries(),
            region
        });
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
        console.log('MapViewComponent.js searchThisLocation => ' +this.state.region.latitude + '-' + this.state.region.longitude); 
        var boundaries = this.state.mapBoundaries._55;
        this.props.getCarList(boundaries.northEast.latitude,
                            boundaries.northEast.longitude,
                            boundaries.southWest.latitude,
                            boundaries.southWest.longitude,
                            this.state.region.latitude,
                            this.state.region.longitude);
        Actions.refresh({key: Math.random()})
    }

    _renderReviewStars(star){
        let stars = [];
        if(star != 0) {
            for (var i = 1; i <= 5; i++) {
                let starName = 'star';
                if (i > star) {
                    starName = 'star-outline';
                }
                stars.push((<Icon style={styles.reviewStar} name={starName} ></Icon>));
            }
        }
        return stars
    }

    handleScroll (event) {
        console.log('MapViewComponent.js handleScroll'); 
        if(this.state.checkScroll) {
            var index = Math.floor(event.nativeEvent.contentOffset.x / screen.width);
            if( index > 0 ) {
                this.updateRegion(this.props.carList[index].Lat,this.props.carList[index].Lng);
                this.setState({selectedID: index });
            }
        }
    }

    scrollToIndex = (index,lat,lng) => {
        if(this.state.selectedID == -1){
            this.setState({selectedID:index}); //Workaround for first time press marker opening first car always
            this.flatListRef.scrollToIndex({animated: true, index: index});
        }
        this.setState({selectedID:index})
        this.flatListRef.scrollToIndex({animated: true, index: index});
        this.updateRegion(lat,lng);
    }

    _renderItem = ({item}) => (
            <TouchableWithoutFeedback 
                key={`car-${item.id}`} onPress={() => (Actions.CarDetails({title:item.Make,itemDetails:item}))} >
                <View style={[styles.car, styles.shadow]}>
                    <View style={styles.carInfoContainer}>
                        <View style={styles.carImage}>
                            <Image style={styles.cardImage}
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

    renderCarHorizontal = () => {
        return (
            <FlatList
                ref={(ref) => { this.flatListRef = ref; }}
                style={[styles.carsList, this.state.selectedID == -1 ? {bottom: -500}: {bottom:0}]} 
                horizontal={true}
                data={this.props.carList}
                extraData={this.state}
                renderItem={this._renderItem}
                pagingEnabled={true}
                keyExtractor={(item, index) => index}
                scrollEventThrottle={16}
                onScrollBeginDrag={() => (this.setState({checkScroll:true}))}
                onScroll={this.handleScroll}
            />
        )
    }

    renderSearchButton = () => {
        return(
            <View style={styles.searchButtonContainer}>
                <Button style={styles.searchBtn} onPress={() => this.searchThisLocation()}>
                    <Text style={{color:'black',textAlign:'center'}}>Search here</Text>
                </Button>
            </View>
        )
    }

    render() {
        console.log('MapViewComponent.js render');    
        return (
            <SafeAreaView style={{flex:1,backgroundColor: theme.COLORS.Primary}}>
                <View style={{ flex: 1 }}>
                    <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        ref={ref => { this.map= ref; }}
                        region={this.state.region}
                        onRegionChangeComplete={region => this.onRegionChangeComplete(region)}
                    >
                        {this.props.carList.map((marker, index) => {
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
        );
    }
}
export default MapViewComponent;

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
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
    cardImage: {
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
    mapAndFilterContainer: {
        position:'absolute',
        bottom:100,
        justifyContent: "center",
        alignItems: 'center',
        flexDirection: 'row',
        width:'100%'
    },
    tripNumberText: {
        color:'black',
        fontWeight:'600',
        fontSize:13,
        marginStart:10
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
    reviewStar: {
        color:'red',
        fontSize:10,
        marginEnd:3
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
        borderRadius: 20
    }

});