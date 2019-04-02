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
    render() {
        const data = [{id:1,img:require('../assets/1.png'),name:'Ford Mustang SRT',owner:'Joey',year:'2018',star:'5',price:55,tripNumber:19,features:[{icon:'bluetooth'},{icon:'calendar'},{icon:'car'},{icon:'radio'},{icon:'bluetooth'},{icon:'calendar'},{icon:'car'},{icon:'radio'}]},
                    {id:2,img:require('../assets/2.png'),name:'Car Name 2',owner:'Joe',year:'2016',star:'2',price:12,tripNumber:3,features:[{icon:'bluetooth'},{icon:'calendar'},{icon:'car'},{icon:'radio'}]},
                    {id:3,img:require('../assets/3.png'),name:'Porche Carerra',owner:'Mike',year:'2018',star:'4',price:45,tripNumber:123,features:[{icon:'bluetooth'},{icon:'calendar'},{icon:'car'},{icon:'radio'}]},
                    {id:4,img:require('../assets/4.png'),name:'Audi RS',owner:'Paul',year:'2013',star:'2',price:56,tripNumber:5,features:[{icon:'bluetooth'},{icon:'calendar'},{icon:'car'},{icon:'radio'}]},
                    {id:5,img:require('../assets/5.png'),name:'Car Name 5',owner:'Frank',year:'2012',star:'5',price:76,tripNumber:574,features:[{icon:'bluetooth'},{icon:'calendar'},{icon:'car'},{icon:'radio'}]},
                    {id:6,img:require('../assets/6.png'),name:'Car Name 6',owner:'Jose',year:'2018',star:'1',price:78,tripNumber:34,features:[{icon:'bluetooth'},{icon:'calendar'},{icon:'car'},{icon:'radio'}]},
                    {id:7,img:require('../assets/7.png'),name:'Car Name 7',owner:'Jack',year:'2018',star:'5',price:90,tripNumber:12,features:[{icon:'bluetooth'},{icon:'calendar'},{icon:'car'},{icon:'radio'}]},
                    {id:8,img:require('../assets/8.png'),name:'Car Name 8',owner:'Lisa',year:'2019',star:'3',price:25,tripNumber:43,features:[{icon:'bluetooth'},{icon:'calendar'},{icon:'car'},{icon:'radio'}]},
                    {id:9,img:require('../assets/9.png'),name:'Car Name 9',owner:'Martin',year:'2018',star:'5',price:49,tripNumber:84,features:[{icon:'bluetooth'},{icon:'calendar'},{icon:'car'},{icon:'radio'}]},
                    {id:10,img:require('../assets/10.png'),name:'Car Name 10',owner:'Ali',year:'2018',star:'0',price:100,tripNumber:23,features:[{icon:'bluetooth'},{icon:'calendar'},{icon:'car'},{icon:'radio'}]}];
        return (
            <View>
                <Text style={{flex:1,textAlign:"center",fontSize:30,fontWeight:'600'}}>Top Destinations</Text>
                <ScrollView style={styles.scrollContainer} horizontal={true} showsHorizontalScrollIndicator={false}>
                    <List style={styles.cardContainer}>
                        {data.map((item, i) =>
                            <ListItem style={{flexDirection:'row',padding:10,position:"relative"}} onPress={() => {Actions.ProfilePage();}}>
                                <Thumbnail avatar style={{width:120,height: 120,borderRadius: 60}} source={item.img} />
                                <Text style={styles.destination}>{item.name}</Text>
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