import React, { Component } from 'react';
import {AsyncStorage,View,Text,Platform,StyleSheet,Linking, Alert} from "react-native";
import { Container, Content, Grid, Row, Thumbnail, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { strings } from '../locales/i18n';

export default class ProfileTab extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLogin:false,
            isLoading:true,
            userData:[]
        }

        this.logoutPressed = this.logoutPressed.bind(this);
        this.onEnter = this.onEnter.bind(this);
    }

    async removeItemValue(key) {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        }
        catch(exception) {
            return false;
        }
    }
    getUserProfile(){
        console.log(global.appAddress + '/service/c1/json/PrivateService/getUserNameAndAvatar/en_US')
        fetch(global.appAddress + '/service/c1/json/PrivateService/getUserNameAndAvatar/en_US?userSecStamp='+encodeURIComponent(global.userSecStamp),
        {
            credentials: 'include',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log('Component Did Mount Data List: '+ responseJson);
            if( responseJson != undefined && responseJson.length != 0 ){
                console.log('<--- getUserProfile Loaded From Server --->' + responseJson);
                this.setState({isLoading:false,
                            userData: responseJson});
            }
            else {
                this.setState({isLoading:false});
            }
        })
        .catch((error) => {
            console.error(error.message + ' on ProfileTab at line 53');
        });
    }

    componentDidMount(){
        if(this.state.isLogin) {
            this.getUserProfile();
        }
    }


    logoutPressed(){
        Alert.alert(
            strings('alerts.logoutFromSystemHeader'),
            strings('alerts.logoutFromSystemSubHeader'),
            [
                {text: strings('yes'), onPress: () => {
                    global.isLogin = false;
                    this.setState({isLogin:false})
                    console.log("Logout Pressed...");
                    this.removeItemValue('@MySuperStore:userName');   
                    this.removeItemValue('@MySuperStore:password');
                    Actions.refresh();
                    Actions.HomeScreen();
                }},
                {text: strings('no')}
            ],
            { cancelable: false }
        );
    }

    renderIsLoginContent(){
        if(this.state.isLogin) {
            return (
                <Grid>
                    <TouchableHighlight onPress={() => {Actions.MyProfilePage({userID:this.state.userData.userID})}}>
                        <Row avatar style={styles.firstPartContainer}>
                            <View style={{flex:1,alignItems:'flex-start',padding:20}}>
                                <Thumbnail style={{borderWidth:2,borderColor:'white'}} 
                                            source={{uri: global.appAddress+'/Image?imagePath='+ this.state.userData.Photo}} />
                            </View>
                            <View style={{flex:9,alignItems:'flex-start',flexDirection:'column',justifyContent:'center',padding: 20}}>
                                <Text style={{color:'white',fontSize:20,fontWeight:'700'}}>
                                    {this.state.userData.Name}
                                </Text>
                                <Text  style={{color:'white',fontSize:12,fontWeight:'500'}}>
                                    View and edit profile
                                </Text>
                            </View>
                        </Row>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => {Actions.Account({backTitleEnabled:false})}}>
                        <Row style={styles.rowContainer}>
                            <Icon name='person' style={{color:'white'}}></Icon>
                            <Text style={{color:'white',fontSize:16,fontWeight:'500',paddingStart:20}}>
                                Account
                            </Text>
                        </Row>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => (Actions.Favorites({userID:this.state.userData.userID}))}>
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
                    
                    <TouchableHighlight onPress={() => {this.logoutPressed()}}>
                        <Row style={styles.rowContainer}>
                            <Icon name='log-out' style={{color:'white'}}></Icon>
                            <Text style={{color:'white',fontSize:16,fontWeight:'500',paddingStart:20}}>
                                Log out
                            </Text>
                        </Row>
                    </TouchableHighlight>

                    <Row style={{flex:1,backgroundColor: '#2f292b'}}>
                    </Row>
                </Grid>
        
            )
        }
        else{
            return (
                <Grid>
                    <TouchableHighlight onPress={() => { Actions.SignIn() }}>
                        <Row style={styles.rowContainer}>
                            <Icon name='person' style={{color:'white'}}></Icon>
                            <Text style={{color:'white',fontSize:16,fontWeight:'500',paddingStart:20}}>
                                Login in or Sign up
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
                    
                    <Row style={{flex:1,backgroundColor: '#2f292b'}}>
                    </Row>
                </Grid>
            )
        }
    }

    onEnter(isLogin){
        this.setState({isLogin})
        if(isLogin == true) {
            this.getUserProfile();
        }
        
    }

    render(){
        return (
            <Container>
                <Content style={{backgroundColor: '#2f292b'}}>
                    {this.renderIsLoginContent()}    
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