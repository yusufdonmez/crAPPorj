import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Dimensions, ScrollView
} from "react-native";
import { Container, Content, Thumbnail, Image, List, ListItem } from "native-base";
import { Actions } from "react-native-router-flux";
import { TouchableOpacity } from "react-native-gesture-handler";

let scrnWidth = Dimensions.get('window').width;

class Destinations extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading:true,
            destinationsData:[]
        }

    }
    getDestinations(){
        fetch(global.appAddress + '/service/c1/json/PublicService/topCityList/en_US' ,
        {
            credentials: 'include',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log('Destinations: ' + responseJson.items);
            if( responseJson.items != undefined && responseJson.length != 0 ){
                console.log('<--- Destinations service loaded from server --->');
                this.setState({isLoading:false,
                            destinationsData: responseJson.items});
            }
            else {
                this.setState({isLoading:false});
            }
        })
        .catch((error) => {
            console.error(error.message + ' on CarDetails at line 64');
        });
    }

    componentDidMount(){
        this.getDestinations();
    }

    render() {
        return (
            <View>
                <Text style={{flex:1,textAlign:"center",fontSize:30,fontWeight:'600'}}>Top Destinations</Text>
                <ScrollView style={styles.scrollContainer} horizontal={true} showsHorizontalScrollIndicator={false}>
                    <List style={styles.cardContainer}>
                        {this.state.destinationsData.map((item, i) =>
                            <ListItem key={i} style={{flexDirection:'row',padding:5,position:"relative"}}
                                onPress={() => 
                                    { Actions.CarList({
                                        searchTitle:item.EngName,
                                        northeastLat:item.northeastLat,
                                        northeastLng:item.northeastLng,
                                        southwestLat:item.southwestLat,
                                        southwestLng:item.southwestLng,
                                        searchLat:item.centerLat,
                                        searchLng:item.centerLng
                                    })}
                                }>
                                <Thumbnail avatar style={{width:120,height: 120,borderRadius: 60}}
                                source={{uri: global.appAddress+'/Image?imagePath='+ item.cityPhoto}} />
                                {global.languageCode != 'ar' 
                                    ?
                                        <Text style={styles.destination}>{item.EngName}</Text>
                                    :
                                        <Text style={styles.destination}>{item.ArName}</Text>
                                }
                            </ListItem>
                        )}
                    </List>
                </ScrollView>
            </View>
        );
    }
}
export default Destinations;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollContainer: {
        height:160
    },
    cardContainer: {
        height:160,
        marginRight:10,
        marginLeft:10,
        position:'relative',
        backgroundColor:'white',
        flexDirection: 'row',
        paddingTop:20
    },
    destination: {
        flex:1,
        position:"absolute",
        color:'white',
        fontSize:18,
        fontWeight: '900',
        textAlign:"center",
        marginLeft:10,
        marginRight:14,
        justifyContent:'center',
        alignContent: 'center',
        alignItems:'center',
        left: 0,
        right: 0,
    }
});