import React, { Component } from 'react';
import {Dimensions,View,Text,Platform,StyleSheet, FlatList} from "react-native";
import { Container, Content, List, ListItem, Thumbnail, Left, Body, Right, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { TouchableOpacity } from 'react-native-gesture-handler';

const {width,height} = Dimensions.get('window')
export default class MessagesPage extends Component {
    constructor(props){
            super(props)
            this.state ={
                isLoading:true,
                noRecordsFound:true,
                messages : []
            };
    }
    
        getUserMessages(){
            console.log(global.appAddress + '/service/c1/json/PrivateService/getUserMessages/en_US?userID='+ (global.userId) )
            
            fetch(global.appAddress + '/service/c1/json/PrivateService/getUserMessages/en_US?userID='+ (global.userId) ,
            {
                credentials: 'include',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('-messages-Component Did Mount Data List: '+ responseJson);
                if( responseJson != undefined && responseJson.length != 0 ){
                    console.log('<--- messages service loaded from server --->');
                    this.setState({isLoading:false,
                                messages: responseJson,
                                noRecordsFound:false});
                }
                else {
                    this.setState({isLoading:false,noRecordsFound:true});
                    console.log('BookedTrips - no records found');
                }
            })
            .catch((error) => {
                console.error('-messages- '+error.message + '  at line 50');
            });
        }
    
        componentDidMount(){
            this.getUserMessages();
        }
    
        _renderItem = ({item}) => (
            <ListItem>
                <Left>
                    <TouchableOpacity onPress={() => {Actions.TripDetail({initialPage:2, 
                        photo:item.Photo,
                        userName:item.Name,
                        mobile:item.MobileNumber,
                        joinDate:item.JoinDate, 
                        isVerified:item.IsVerified})}}>
                        <Thumbnail source={{uri: global.appAddress+'/Image?imagePath='+ item.Photo}} />
                    </TouchableOpacity>
                </Left>
                <Body>
                    <TouchableOpacity onPress={() => {Actions.TripDetail({initialPage:1})}}>
                        <Text style={{fontWeight: '400',fontSize:11,paddingTop:5}}>{item.Status} Trip with Ali's {item.Make}</Text>
                        <Text style={{fontWeight: '600',color:global.programSecondaryColor,fontSize:22}}>{item.Name}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Icon name="chatbubbles" style={{color:'gray',fontSize:16,paddingEnd:5}}></Icon>
                            <Text numberOfLines={1} ellipsizeMode='tail' note>{item.Message}</Text>
                        </View>
                    </TouchableOpacity>
                </Body>
                <Right>
                    <Text note>{item.Date}</Text>
                </Right>
            </ListItem>
        )
    
    render(){
        const data = Array.from({length: 14});
        return (
            <Container>
                <Content>
                    <FlatList 
                        data={this.state.messages}
                        renderItem={this._renderItem}
                        keyExtractor={(item) => item.id.toString()} //tostring fro warning cell type err
                    />
                </Content>
            </Container>
        );
    }

}