import React, { Component } from 'react';
import {
    Animated,
    StatusBar,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
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
            dataSource:[],
            noRecordsFound:false,
            carDatas: []
        }
        global.headerMaxHeight = 350;
        global.headerMinHeight = 120;
        global.headerScrollDistance = 230;
        
        this.searchCar = this.searchCar.bind(this)
    }

    componentDidMount(){
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
                console.log('<--- youMightLike service loaded from server --->');
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

    scrollTop(){
        this.refs['_ScrollView'].scrollTo({x: 0, y: 0, animated: true});
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
        const searchMargin = this.state.scrollY.interpolate({
            inputRange: [0, headerScrollDistance-90],
            outputRange: [150, 30],
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
                                                headTitle="YOU MIGHT LIKE">
                            </HorizontalScrollCards>
                        )}
                        { this.state.isLoading && (
                            <View stlye={{height:320,justifyContent:'center',alignItems:'center'}}>
                                <Icon style={{fontSize:58}} name='refresh' ></Icon>
                            </View>
                        )}
                    </Animated.View>

                    <View style={styles.hostCommercialContainer}>
                        <Button block style={{backgroundColor:global.programSecondaryColor}} 
                                onPress={() => { Actions.CarList(); }}>
                            <Text style={{fontSize:22,fontWeight:'800',color:'white'}}>List your car</Text>
                        </Button>
                    </View>
                    <Destinations></Destinations>

                    <HorizontalScrollCards openCarDetailsNav={this.openCarDetails.bind(this)} datas={this.state.carDatas} headTitle="RECENTLY VIEWED"></HorizontalScrollCards>
                    
                    <View style={styles.hostCommercialContainer}>
                        <Text style={{fontSize:35,fontWeight: '700',textAlign:'center'}}>
                            The car that pays for itself.
                        </Text>

                        <Text style={{fontSize:15,fontWeight: '500',textAlign:'center',margin:40,}}>
                            Share your car, earn extra cash. List it in just 10 minutes.
                        </Text>

                        <Button block style={{backgroundColor:global.programSecondaryColor}} onPress={() => {this.refs['_ScrollView'].scrollTo({x: 0, y: 0, animated: true}); }}>
                            <Text style={{fontSize:22,fontWeight:'800',color:'white'}}>List your car</Text>
                        </Button>
                    </View>

                </ScrollView>

                <Animated.View style={[styles.header, {height: headerHeight}]}>
                    <Animated.Image style={[ styles.backgroundImage,
                            {opacity: imageOpacity, transform: [{translateY: imageTranslate}]},
                            ]}
                            source={require('../assets/homescreen.jpeg')}
                        />
                    <Animated.View style={[styles.bar, {marginTop:searchMargin}]}>
                        <Animated.Text style={[styles.title, {opacity:imageOpacity}]}>Way better than a rental car</Animated.Text>
                        <TextInput style={styles.searchText} secureTextEntry={false}
                            placeholder={strings('search')}
                            value={this.state.mySearchText} onFocus={() => {Actions.SearchModal()}} 
                            />
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
        backgroundColor: '#231f20',
        overflow: 'hidden',
    },
    bar: {
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        backgroundColor: 'transparent',
        color: 'white',
        fontSize: 35,
        width:'100%',
        justifyContent:'center',
        textAlign:'center'
    },
    searchText: {
        textAlign: 'center',
        fontSize: 15,
        color: '#9BA2A7',
        width:'90%',
        backgroundColor:'white',
        height:50,
        margin: 10,
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
        height: 350,
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