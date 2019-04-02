import React, { Component } from 'react';
import {DrawerLayoutAndroid,View,Text,Platform,StyleSheet,Linking} from "react-native";
import { Container, Content, Grid, Row, Thumbnail, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { TouchableHighlight } from 'react-native-gesture-handler';


export default class ProfileTab extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <Container>
                <Content style={{backgroundColor: '#2f292b'}}>
                    <Grid>
                        <TouchableHighlight onPress={() => {Actions.ProfilePage()}}>
                            <Row avatar style={styles.firstPartContainer}>
                                <View style={{flex:1,alignItems:'flex-start',padding:20}}>
                                    <Thumbnail style={{borderWidth:2,borderColor:'white'}} source={require('../assets/user.jpeg')} />
                                </View>
                                <View style={{flex:9,alignItems:'flex-start',flexDirection:'column',justifyContent:'center',padding: 20}}>
                                    <Text style={{color:'white',fontSize:20,fontWeight:'700'}}>
                                        Ali UZAR
                                    </Text>
                                    <Text  style={{color:'white',fontSize:12,fontWeight:'500'}}>
                                        View and edit profile
                                    </Text>
                                </View>
                            </Row>
                        </TouchableHighlight>

                        <TouchableHighlight onPress={() => {Actions.Account()}}>
                            <Row style={styles.rowContainer}>
                                <Icon name='person' style={{color:'white'}}></Icon>
                                <Text style={{color:'white',fontSize:16,fontWeight:'500',paddingStart:20}}>
                                    Account
                                </Text>
                            </Row>
                        </TouchableHighlight>

                        <TouchableHighlight onPress={() => {Actions.Favorites()}}>
                            <Row style={styles.rowContainer}>
                                <Icon name='bookmark' style={{color:'white'}}></Icon>
                                
                                <Text style={{color:'white',fontSize:16,fontWeight:'500',paddingStart:20}}>
                                    Favorites
                                </Text>
                            </Row>
                        </TouchableHighlight>
                        
                        <TouchableHighlight onPress={() => Linking.openURL('https://carrental.harmonyict.com/CarRental/')}>
                            <Row style={styles.rowContainer}>
                                <Icon name='help-circle' style={{color:'white'}}></Icon>
                                <Text style={{color:'white',fontSize:16,fontWeight:'500',paddingStart:20}}>
                                    How Car Rental Works
                                </Text>
                            </Row>
                        </TouchableHighlight>

                        <TouchableHighlight onPress={() => Linking.openURL('https://carrental.harmonyict.com/CarRental/')}>
                            <Row style={styles.rowContainer}>
                                <Icon name='call' style={{color:'white'}}></Icon>
                                <Text style={{color:'white',fontSize:16,fontWeight:'500',paddingStart:20}}>
                                    Contact Support
                                </Text>
                            </Row>
                        </TouchableHighlight>

                        <TouchableHighlight onPress={() => Linking.openURL('https://carrental.harmonyict.com/CarRental/')}>
                            <Row style={styles.rowContainer}>
                                <Icon name='paper' style={{color:'white'}}></Icon>
                                <Text style={{color:'white',fontSize:16,fontWeight:'500',paddingStart:20}}>
                                    Legal
                                </Text>
                            </Row>
                        </TouchableHighlight>

                        <Row style={styles.rowContainer}>
                            <Icon name='log-out' style={{color:'white'}}></Icon>
                            <Text style={{color:'white',fontSize:16,fontWeight:'500',paddingStart:20}}>
                                Log out
                            </Text>
                        </Row>
                    </Grid>
                </Content>
            </Container>
        );
    }

}

const styles = StyleSheet.create({
    firstPartContainer:{
        flexDirection:'row',
        backgroundColor: '#231f20'
    },
    rowContainer: {
        flex: 1,
        padding:20,
        color:'white',
        borderBottomWidth:1,
        borderBottomColor:'white',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#2f292b'
    },
});