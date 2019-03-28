import React, { Component } from "react";
import {  FlatList,
    StyleSheet,
    Text, 
    Animated,
    TouchableOpacity,
    View, 
    Share,
    Image,
    AsyncStorage,
    Alert,
    TextInput,
    RefreshControl,
    BackHandler,
    SafeAreaView
    } from "react-native";

    
import {Actions} from 'react-native-router-flux'
import {Container,Content,CardItem,Card,Left,Button,Icon,List,ListItem, Right} from "native-base";
    

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

class CarList extends Component {
    constructor(props){
        super(props)
        this.state = {
            refreshing:false,
            dataSource:[{id:1,img:require('../assets/1.png'),name:'Ford Mustang SRT',owner:'Joey',year:'2018',star:'5',price:55,tripNumber:19,features:[{icon:'bluetooth'},{icon:'calendar'},{icon:'car'},{icon:'radio'}]},
            {id:2,img:require('../assets/2.png'),name:'Car Name 2',owner:'Joe',year:'2016',star:'2',price:12,tripNumber:3,features:[{icon:'bluetooth'},{icon:'calendar'},{icon:'car'},{icon:'radio'}]},
            {id:3,img:require('../assets/3.png'),name:'Porche Carerra',owner:'Mike',year:'2018',star:'4',price:45,tripNumber:123,features:[{icon:'bluetooth'},{icon:'calendar'},{icon:'car'},{icon:'radio'}]},
            {id:4,img:require('../assets/4.png'),name:'Audi RS',owner:'Paul',year:'2013',star:'2',price:56,tripNumber:5,features:[{icon:'bluetooth'},{icon:'calendar'},{icon:'car'},{icon:'radio'}]},
            {id:5,img:require('../assets/5.png'),name:'Car Name 5',owner:'Frank',year:'2012',star:'5',price:76,tripNumber:574,features:[{icon:'bluetooth'},{icon:'calendar'},{icon:'car'},{icon:'radio'}]},
            {id:6,img:require('../assets/6.png'),name:'Car Name 6',owner:'Jose',year:'2018',star:'1',price:78,tripNumber:34,features:[{icon:'bluetooth'},{icon:'calendar'},{icon:'car'},{icon:'radio'}]},
            {id:7,img:require('../assets/7.png'),name:'Car Name 7',owner:'Jack',year:'2018',star:'5',price:90,tripNumber:12,features:[{icon:'bluetooth'},{icon:'calendar'},{icon:'car'},{icon:'radio'}]},
            {id:8,img:require('../assets/8.png'),name:'Car Name 8',owner:'Lisa',year:'2019',star:'3',price:25,tripNumber:43,features:[{icon:'bluetooth'},{icon:'calendar'},{icon:'car'},{icon:'radio'}]},
            {id:9,img:require('../assets/9.png'),name:'Car Name 9',owner:'Martin',year:'2018',star:'5',price:49,tripNumber:84,features:[{icon:'bluetooth'},{icon:'calendar'},{icon:'car'},{icon:'radio'}]},
            {id:10,img:require('../assets/10.png'),name:'Car Name 10',owner:'Ali',year:'2018',star:'0',price:100,tripNumber:23,features:[{icon:'bluetooth'},{icon:'calendar'},{icon:'car'},{icon:'radio'}]}],
        }

        this._renderReviewStars = this._renderReviewStars.bind(this);
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        this.componentDidMount();
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
                        <List  dataArray={this.state.dataSource} renderRow={item => 
                            <ListItem onPress={() => (Actions.CarDetails({title:item.name,itemDetails:item}))}>
                                <Card style={{flex:1,backgroundColor:'white'}}>
                                    <CardItem style={{position:'relative'}} cardBody>
                                        <Image source={item.img} style={styles.cardImage}/>
                                        <View style={styles.priceContainer}>
                                            <Text style={styles.priceText}> {item.price} SAR/Day </Text>
                                        </View>
                                    </CardItem>
                                    <CardItem style={ { height: 30,marginTop:10 } }>
                                        <Left>
                                            <Button transparent onPress={() => (Actions.CarDetails({title:item.name,itemDetails:item}))}>
                                                <Text style={styles.carNameText}>{item.name.toUpperCase()}</Text>
                                            </Button>
                                        </Left>
                                    </CardItem>
                                    <CardItem style={ { height: 20 } }>
                                        <Left>
                                            <Button transparent  onPress={() => (Actions.CarDetails({title:item.name,itemDetails:item}))}>
                                                { this._renderReviewStars(item.star) }
                                                <Text style={styles.tripNumberText}>{item.tripNumber} Trip</Text>
                                            </Button>
                                        </Left>
                                    </CardItem>
                                    <CardItem style={ {marginBottom:10,height: 30 } }>
                                        <Left>
                                            <Button small style={ { backgroundColor:'gray',height: 30} }
                                                    onPress={() => (Actions.CarDetails({title:item.name,itemDetails:item}))}>
                                                <Text style={styles.specsBtns}>Book Instantly</Text>
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
export default CarList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
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
    }
});