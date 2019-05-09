import React, { Component } from 'react';
import {
    Animated,
    StatusBar,
    ScrollView,
    StyleSheet,
    Text,
    AsyncStorage,
    View,} from "react-native";
    
import {Actions} from 'react-native-router-flux'
import HorizontalScrollCards from '../components/HorizontalScrollCards'
import { strings } from '../locales/i18n';
import Destinations from '../components/Destinations';
import { Button, Icon } from 'native-base';
import * as theme from '../assets/theme'

class HomeScreen extends Component {
    constructor(props){
        super(props);

        this.state = {
            scrollY: new Animated.Value(0),
            mySearchText:'',
            isLoading:true,
            isLoadingRecently:true,
            dataSource:[],
            noRecordsFound:false,
            carDatas: [],
            recentlyViewedData:[]
        }
        global.headerMaxHeight = 450;
        global.headerMinHeight = 100;
        global.headerScrollDistance = 350;
        
        this.searchCar = this.searchCar.bind(this)
    }
    getYouMightlikeData(){
        console.log(global.appAddress + '/service/c1/json/PublicService/youMightLike/en_US')
        fetch(global.appAddress + '/service/c1/json/PublicService/youMightLike/en_US',
        {
            credentials: 'include',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log('Component Did Mount Data List: '+ responseJson.items);
            if( responseJson.items != undefined && responseJson.length != 0 ){
                console.log('<--- getYouMightlikeData Loaded From Server --->' + responseJson.items);
                this.setState({isLoading:false,
                            carDatas: responseJson.items});
            }
            else {
                this.setState({isLoading:false,noRecordsFound:true});
            }
        })
        .catch((error) => {
            console.error(error.message + ' on HomeScreen at line 66');
        });
    }

    getRecentlyViewedData(){
        AsyncStorage.getItem('@MySuperStore:recentlyViewed')
            .then(req => JSON.parse(req)).then((value) => {
                console.log("getRecentlyViewedData" + value);
                if( value != undefined && value.length != 0 ){
                    fetch(global.appAddress + '/service/c1/json/PublicService/recentlyViewed/en_US?carIds='+value , {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        }
                    })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log('<--- RecentlyViewedData Loaded From Server --->' + responseJson.items);
                        this.setState({isLoadingRecently:false,recentlyViewedData: responseJson.items});
                    })
                    .catch((error) => {
                        console.error(error.message + ' on HomeScreen.js at line 83');
                    });
                }
                else {
                    this.setState({isLoadingRecently:false});
                }
            })
            .catch(error => console.log(error.message));
    }

    componentDidMount(){
        this.getYouMightlikeData();
        this.getRecentlyViewedData();
    }

    onEnter(){
        this.refs['_ScrollView'].scrollTo({x: 0, y: 0, animated: true});
        this.getRecentlyViewedData();
    }
    
    _renderScrollViewContent() {
        const data = Array.from({length: 30});
        return (
            <View style={styles.scrollViewContent}>
                {data.map((_, i) =>
                    <View key={i} style={styles.row}>
                    <Text>{i}</Text>
                    </View>
                )}
            </View>
        );
    }

    openCarDetails(item){
        Actions.CarDetails({title:item.name,itemDetails:item});
    }

    searchCar (){
        
    }

    render(){
        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, headerScrollDistance],
            outputRange: [global.headerMaxHeight, headerMinHeight],
            extrapolate: 'clamp',
        });
        const imageOpacity = this.state.scrollY.interpolate({
            inputRange: [0, headerScrollDistance / 2, headerScrollDistance],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
        });
        const imageTranslate = this.state.scrollY.interpolate({
            inputRange: [0, headerScrollDistance],
            outputRange: [0, -50],
            extrapolate: 'clamp',
        });
        const textMargin = this.state.scrollY.interpolate({
            inputRange: [0, headerScrollDistance],
            outputRange: [150, -40],
            extrapolate: 'clamp',
        });
        const searchMargin = this.state.scrollY.interpolate({
            inputRange: [0, headerScrollDistance],
            outputRange: [50, 0],
            extrapolate: 'clamp',
        });
        return (
            <View style={styles.fill}>
                <StatusBar barStyle="light-content" />
                <ScrollView style={styles.fill} 
                            scrollEventThrottle={16}
                            ref="_ScrollView"
                            onScroll={Animated.event(
                            [{nativeEvent: {contentOffset: { y: this.state.scrollY}}}]
                    )}>                    
                            
                    <Animated.View style={{marginTop: headerHeight,height: 'auto'}}>
                        { !this.state.isLoading && (
                            <HorizontalScrollCards openCarDetailsNav={this.openCarDetails.bind(this)} 
                                                datas={this.state.carDatas} 
                                                headTitle={strings('homescreen.youMightLike')}>
                            </HorizontalScrollCards>
                        )}
                        { this.state.isLoading && (
                            /* Put progress image commercial. */
                            <View stlye={{height:320,justifyContent:'center',alignItems:'center'}}>
                                <Icon style={{fontSize:58}} name='refresh' ></Icon> 
                            </View>
                        )}
                    </Animated.View>

                    <View style={styles.hostCommercialContainer}>
                        <Button block style={{backgroundColor:global.programSecondaryColor}} 
                                onPress={() => { Actions.Host(); }}>
                            <Text style={{fontSize:22,fontWeight:'800',color:'white'}}>{strings('homescreen.listYourCar')}</Text>
                        </Button>
                    </View>

                    <Destinations></Destinations>
                    
                    {this.state.recentlyViewedData != '' && (
                        <HorizontalScrollCards openCarDetailsNav={this.openCarDetails.bind(this)} datas={this.state.recentlyViewedData} headTitle={strings('homescreen.recentlyViewed')}></HorizontalScrollCards>
                    )}
                    <View style={styles.hostCommercialContainer}>
                        <Text style={{fontSize:35,fontWeight: '700',textAlign:'center'}}>
                            {strings('homescreen.commercialHeader')}
                        </Text>

                        <Text style={{fontSize:15,fontWeight: '500',textAlign:'center',margin:40,}}>
                            {strings('homescreen.commercialSubHeader')}
                        </Text>

                        <Button block style={{backgroundColor:global.programSecondaryColor}} onPress={() => {this.refs['_ScrollView'].scrollTo({x: 0, y: 0, animated: true}); }}>
                            <Text style={{fontSize:22,fontWeight:'800',color:'white'}}>{strings('homescreen.listYourCar')}</Text>
                        </Button>
                    </View>

                </ScrollView>

                <Animated.View style={[styles.header, {height: headerHeight}]}>
                    <Animated.Image style={[ styles.backgroundImage,
                            {opacity: imageOpacity, transform: [{translateY: imageTranslate}]},
                            ]}
                            source={require('../assets/homescreen.jpeg')}
                        />
                    <Animated.View style={[styles.bar, {marginTop:textMargin}]}>
                        <Animated.Text style={[styles.title, {opacity:imageOpacity}]}>{strings('homescreen.firstCommercial')}</Animated.Text>
                        <Animated.Text style={[styles.title, {opacity:imageOpacity}]}>{strings('homescreen.secondCommercial')}</Animated.Text>
                    </Animated.View>
                    <Animated.View style={[styles.bar, {marginTop:searchMargin}]}>
                        <Button block light style={styles.searchText}
                            value={this.state.mySearchText} onPress={() => {this.refs['_ScrollView'].scrollTo({x: 0, y: 450, animated: true}); Actions.SearchModal()}}>
                            <Text style={{fontSize: 15,color: '#9BA2A7'}}>{strings('homescreen.search')}</Text>
                        </Button>
                    </Animated.View>
                </Animated.View>
                
            </View>
        );
    }

}

const styles = StyleSheet.create({
    fill: {
        flex: 1,
        backgroundColor:'white'
    },
    insurancePartner: {
        borderRadius:20,
        width:200,
        height:40,
        backgroundColor:'white',
        fontSize:18,
        color:'gray',
        textAlign:'center'
    },
    row: {
        height: 40,
        margin: 16,
        backgroundColor: '#D3D3D3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    firstTitle:{
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.COLORS.Primary,
        overflow: 'hidden',
    },
    bar: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        backgroundColor: 'transparent',
        color: 'white',
        fontWeight: '900',
        fontSize: 35,
        width:'100%',
        justifyContent:'center',
        textAlign:'center'
    },
    searchText: {
        textAlign: 'center',
        backgroundColor:'white',
        height:50,
        marginLeft: 20,
        marginRight: 20
    },
    scrollViewContent: {
        marginTop: global.headerMaxHeight,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        height: 450,
        resizeMode:'cover'
    },
    hostCommercialContainer: {
        flex:1,
        justifyContent:"center",
        alignItems: "center",
        padding:20,
        marginTop:50,
        borderTopColor: theme.COLORS.Secondary,
        borderTopWidth: 2,
    }
});



export default HomeScreen;