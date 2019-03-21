import React from 'react';

import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity} from "react-native";


let scrnWidth = Dimensions.get('window').width;

export default class HorizontalScrollCards extends React.Component {
    constructor(props){
        super(props);

    }
    

    render(){
        const data = Array.from({length: 3});
        return (
        <View style={{marginTop:20,marginBottom:5,backgroundColor:'white'}}>
            <Text style={{marginLeft:10}}>YOU MIGHT LIKE</Text>
            <ScrollView style={styles.scrollContainer} horizontal={true} showsHorizontalScrollIndicator={false}>
            {data.map((_, i) =>
                <View key={i} style={styles.cardContainer}>
                    <TouchableOpacity style={{flex:1}} onPress={ () => {this.props.openCarDetailsNav()}}>
                        <Image style={{flex:1,width:null,height:null,resizeMode:'cover'}} source={require('../assets/3.jpg')} ></Image>
                        <Text style={{fontSize:27,fontWeight:'900',color:'black'}}>Car Name {i}</Text>
                    </TouchableOpacity>
                    <View style={{position:"absolute",right:0,bottom:5,backgroundColor:'white',padding:4,borderTopLeftRadius:10}}>
                        <Text style={{fontSize:27,fontWeight:'900',color:'black'}}>
                            71 $
                        </Text>
                    </View>
                </View>
            )}
            </ScrollView>
        </View>
        );
    }

}
const styles = StyleSheet.create({
    scrollContainer: {
        height:240
    },
    cardContainer: {
        height:240,
        width: scrnWidth - 50,
        marginRight:10,
        marginLeft:10,
        position:'relative',
        backgroundColor:'white'
        
    }
});