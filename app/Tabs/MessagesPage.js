import React, { Component } from 'react';
import {DrawerLayoutAndroid,View,Text,Platform,StyleSheet} from "react-native";
import { Container, Content, List, ListItem, Thumbnail, Left, Body, Right, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default class MessagesPage extends Component {
    constructor(props){
        super(props);
    }
    render(){
        const data = Array.from({length: 14});
        return (
            <Container>
                <Content>
                    <List>{/*Pass item.tripID to trip details*/}
                        {data.map((item, i) =>
                            <ListItem avatar > 
                                <Left >
                                    <TouchableOpacity onPress={() => {Actions.TripDetail({initialPage:2})}}>
                                        <Thumbnail source={require('../assets/user.jpeg')} />
                                    </TouchableOpacity>
                                </Left>
                                <Body>
                                    <TouchableOpacity onPress={() => {Actions.TripDetail({initialPage:1})}}>
                                        <Text style={{fontWeight: '400',fontSize:11,paddingTop:5}}>Status of Trip with Ali's Mustang</Text>
                                        <Text style={{fontWeight: '600',color:global.programSecondaryColor,fontSize:22}}>William L.</Text>
                                        <View style={{flexDirection: 'row'}}>
                                            <Icon name="chatbubbles" style={{color:'gray',fontSize:16,paddingEnd:5}}></Icon>
                                            <Text numberOfLines={1} ellipsizeMode='tail' note>Very nice car great owner he has very cool and helpful very good guy I will sure rent from in near feture.</Text>
                                        </View>
                                    </TouchableOpacity>
                                </Body>
                                <Right>
                                    <Text note>Mar 4</Text>
                                </Right>
                            </ListItem>
                        )}
                    </List>
                </Content>
            </Container>
        );
    }

}