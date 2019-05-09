import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    AsyncStorage,
    Alert,
    SafeAreaView,
    ImageBackground,
    Dimensions,
    Platform
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'
import { strings } from '../locales/i18n';
import { Actions } from 'react-native-router-flux';
import { Button, Left, Body, Right, Item, Input, Form, Content, Label, CheckBox } from "native-base";
import { TextInput } from "react-native-gesture-handler";
import Spinner from './Spinner';

import * as theme from '../assets/theme';

const {width,height} = Dimensions.get('window');

class SignIn extends Component {
    constructor(props){
        super(props)

        this.state = {
            userName:'',
            password:'',
            signUpUserName:'',
            signUpName:'',
            signUpPassword:'',
			spinnerCheck:false,
            displaySignIn:'false',
            displaySignUp:'false',
            termsServiceCheck:false,
            emailSendCheck: false,
        }
		this.handleLogin = this.handleLogin.bind(this);
		this.forgotPassword = this.forgotPassword.bind(this);
		this.handleSignUp = this.handleSignUp.bind(this);
    }
    handleLogin(userName,password) {
		if( userName == '' )  {
			this.userNameTextInput._root.focus();
		}
		else if( password == '' ){
			this.passwordTextInput._root.focus();
		}
		else {
			this.setModalVisible(true);
			fetch( global.appAddress + '/loginServlet', {
				method: 'POST',
				credentials: 'include',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					userName:userName,
					password:password,
				}),
				}).then((response) => response.json())
				.then((responseJson) => {
					console.log(responseJson);
					if(responseJson.success) {
						global.userSecStamp = responseJson.userSecStamp;
						global.userEmail = responseJson.userEmail;
						global.userAvatar = responseJson.userAvatar;
						global.userId = responseJson.userId;
						global.isLogin = true;
						this.setState({isLogin:true});
						try {
							AsyncStorage.setItem('@MySuperStore:userName', userName);						
                            AsyncStorage.setItem('@MySuperStore:password', password);
						} catch (error) {
							// Error saving data
                        }
                        console.log("Signed IN");
                        Actions.refresh();
						Actions.HomeScreen();
					}
					else if(responseJson.errorMsg == 'Email Not Exists'){
						Alert.alert(
							strings('alerts.emailNotExistsAlertHeader'),
							strings('alerts.emailNotExistsAlertSubHeader'),
							[
								{text: strings('alerts.okey'), onPress: () => {this.setModalVisible(false);}}
							],
							{ cancelable: false }
						);
					}
					else {
						Alert.alert(
							strings('alerts.loginFailAlertHeader'),
							strings('alerts.loginFailAlertSubHeader'),
							[
								{text: strings('alerts.okey'), onPress: () => {this.setModalVisible(false);this.userNameTextInput._root.focus();}}
							],
							{ cancelable: false }
						);
					}
				return true;
				})
				.catch((error) => {
					console.error(error);
				});
		}
    }
    
    setModalVisible(visible) {
        this.setState({spinnerCheck: visible});
    }
    
    handleSignUp(userEmail,Name,password){
		if( userEmail == '' )  {
			this.signUpEmail._root.focus();
		}
		else if( Name == '' ){
			this.signUpName._root.focus();
		}
		else if( password == '' ){
			this.signUpPassword._root.focus();
        }
        else if (!this.state.termsServiceCheck) {
            Alert.alert(
                strings('alerts.termsAndServiceHeader'),
                strings('alerts.termsAndServiceSubHeader'),
                [
                    {text: strings('alerts.okey') }
                ],
                { cancelable: true }
            );
        }
		else {
            this.setModalVisible(true);
            fetch(global.appAddress + '/service/c1/json/PublicService/signupUser/en_US',
            {
                credentials: 'include',
                method: 'POST',
                headers: { 
                    Accept: 'application/json',
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({
                    email: userEmail,
                    password: password,
                    fullName: Name,
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.errorMsg == 'Email Exists'){
                    Alert.alert(
                        strings('alerts.emailExistsAlertHeader'),
                        strings('alerts.emailExistsAlertSubHeader'),
                        [
                            {text: strings('alerts.okey'), onPress: () => {this.setModalVisible(false);this.setState({isSignUp:false})}}
                        ],
                        { cancelable: false }
                    );
                }
                else {
                    Alert.alert(
                        strings('alerts.signupCompletedHeader'),
                        strings('alerts.signupCompletedSubHeader'),
                        [
                            {text: strings('alerts.okey'), onPress: () => {this.setModalVisible(false);this.setState({ isSignUp: false,displaySignIn:'true',displaySignUp:'false' }) }  }
                        ],
                        { cancelable: false }
                    );
                }
            })
            .catch((error) =>{
                console.error(error);
            });
        }
    }
    
    forgotPassword(userEmail){
		if( userEmail == '' )  {
			Alert.alert(
				strings('alerts.emailEmptyHeader'),
				strings('alerts.emailEmptySubHeader'),
				[
					{text: strings('alerts.okey'), onPress: () => {this.setModalVisible(false);this.setState({ isSignUp: false }) } }
				],
				{ cancelable: false }
			);
		}
		else {
			this.setModalVisible(true);
			fetch( global.appAddress + '/loginServlet?userName='+userEmail+'&forgetPassword=true', {
				method: 'GET',
				credentials: 'include',
			}).then((response) => response.json())
			.then((responseJson) => {
				if(responseJson.success) {
					Alert.alert(
						strings('alerts.emailSentHeader'),
						strings('alerts.emailSentSubHeader')  + userEmail,
						[
							{text: strings('alerts.okey'), onPress: () => { this.setModalVisible(false)  } }
						],
						{ cancelable: false }
					);
				}
				else {
					Alert.alert(
						strings('alerts.emailNotExistsAlertHeader'),
						strings('alerts.emailNotExistsAlertSubHeader'),
						[
							{text: strings('alerts.okey'), onPress: () => { this.setModalVisible(false)  } }
						],
						{ cancelable: false }
					);
				}
				return responseJson;
			})
			.catch((error) => {
				console.error(error);
			});
		}
    }
    
    checkBoxToggle(checkField){
        if(checkField == 'emailSendCheck') {
            this.setState({emailSendCheck:!this.state.emailSendCheck})
        }
        if(checkField == 'termsServiceCheck') {
            this.setState({termsServiceCheck:!this.state.termsServiceCheck})
        }
    }

    render() {
        return (
            <SafeAreaView style={{flex:1,backgroundColor: theme.COLORS.Primary}}>
                <Spinner visible={this.state.spinnerCheck} textContent={strings('login.authenticating')} ></Spinner>							
                <View style={styles.container}>
                    <ImageBackground source={require('../assets/caravan.jpg')} style={styles.backgroundImage}>
                    {this.state.displaySignIn == 'false' && this.state.displaySignUp == 'false' && (
                        <View style={{flex:1}}>
                            <TouchableOpacity style={{flex:1,margin:20}} onPress={ () => { Actions.HomeScreen() } }>
                                <Icon name="times" color='white' size={35} />
                            </TouchableOpacity>
                            <View style={styles.logoContainer}>
                                <Icon name="road" color='white' size={155} />
                            </View>
                            <View style={styles.buttonsContainer}>
                                <Text style={styles.addText}>Start your adventure</Text>
                                <Button block onPress={ () => { this.setState({displaySignUp:'true',displaySignIn:'false'})} } style={styles.signUpBtn}>
                                    <Text style={{color:'white',fontWeight:'700',fontSize:18}}>Sign Up</Text>
                                </Button>
                                <Button block transparent onPress={ () => { this.setState({displaySignIn:'true',displaySignUp:'false'})} } style={styles.signInBtn}>
                                    <Text style={{color:'white',fontWeight:'700',fontSize:18}}>Log in</Text>
                                </Button>
                            </View>
                        </View>
                    )}
                    {this.state.displaySignIn == 'true' && this.state.displaySignUp == 'false' && (
                        <View style={{flex:1,flexDirection: 'column'}}>
                            <View style={{height:50,flexDirection:'row',borderBottomColor:'white',borderBottomWidth:1}}>
                                <Left style={{flex:1}}>
                                    <TouchableOpacity style={{paddingStart:10}} onPress={ () => {  this.setState({displaySignIn:'false'}) } }>
                                        <Icon name="arrow-left" color='white' size={25} />
                                    </TouchableOpacity>
                                </Left>
                                <Body style={{flex:6}}>
                                    <View style={{justifyContent:'center',alignItems:'center'}} >
                                        <Text style={{fontSize:20,fontWeight:'900',color:'white',textTransform:'uppercase'}}>Log in</Text>
                                    </View>
                                </Body>
                                <Right style={{flex:1}}></Right>                                
                            </View>
                            <View style={styles.signInContainer}>
                                <View style={styles.userNameContainer} >
                                    <Content>
                                        <Form>
                                            <Item inlineLabel placeholderTextColor='white'>
                                                <Label style={{color:'white',fontWeight:'900'}}>EMAIL LOG IN</Label>
                                            </Item>
                                            <Item inlineLabel placeholderTextColor='white'>
                                                <Label style={{color:'gray',fontWeight:'900'}} onPress={() => {this.userNameTextInput._root.focus()}}>Email</Label>
                                                <Input style={styles.inputStyle} returnKeyType='next' autoCapitalize = "none" 
                                                    onChangeText={(text) => this.setState({userName:text})}
                                                    ref={(input) => this.userNameTextInput = input }
                                                    onSubmitEditing={() => { this.passwordTextInput._root.focus(); }}/>
                                            </Item>
                                            <Item inlineLabel last placeholderTextColor='white' onPress={() => {this.passwordTextInput._root.focus()}}>
                                                <Label style={{color:'gray',fontWeight:'900'}}>Password</Label>
                                                <Input style={styles.inputStyle} returnKeyType='done' secureTextEntry
                                                    onChangeText={(text) => this.setState({password:text})}
                                                    ref={(input) => this.passwordTextInput = input }
                                                    onSubmitEditing={() => {this.handleLogin(this.state.userName,this.state.password)} }/>
                                            </Item>
                                            <Button block style={{backgroundColor: theme.COLORS.Secondary,margin:10}} onPress={() => {this.handleLogin(this.state.userName,this.state.password)}}>
                                                <Text style={{color:'white',fontSize:20,fontWeight:'900'}}>
                                                    Log in with email
                                                </Text>
                                            </Button>
                                            <Button transparent block style={{margin:10}} onPress={() => {this.forgotPassword(this.state.userName)}}>
                                                <Text style={{color:theme.COLORS.Secondary,fontSize:20,fontWeight:'900'}}>
                                                    Forgot password?
                                                </Text>
                                            </Button>
                                        </Form>
                                    </Content>
                                </View>
                            </View>
                            <View style={styles.termsAndPolicy}>
                                <Button transparent full>
                                    <Text style={styles.termsAndPolicyText}>
                                        By logging in, you agree to our terms of service and privacy policy.
                                    </Text>
                                </Button> 
                            </View>
                        </View>
                    )}
                    {this.state.displaySignIn == 'false' && this.state.displaySignUp == 'true' && (
                        <View style={{flex:1,flexDirection: 'column'}}>
                            <View style={{height:50,flexDirection:'row',borderBottomColor:'white',borderBottomWidth:1}}>
                                <Left style={{flex:1}}>
                                    <TouchableOpacity style={{paddingStart:10}} onPress={ () => {  this.setState({displaySignUp:'false'}) } }>
                                        <Icon name="arrow-left" color='white' size={25} />
                                    </TouchableOpacity>
                                </Left>
                                <Body style={{flex:6}}>
                                    <View style={{justifyContent:'center',alignItems:'center'}} >
                                        <Text style={{fontSize:20,fontWeight:'900',color:'white',textTransform:'uppercase'}}>
                                            Email Sign Up
                                        </Text>
                                    </View>
                                </Body>
                                <Right style={{flex:1}}></Right>                                
                            </View>
                            <View style={styles.signInContainer}>
                                <View style={styles.userNameContainer} >
                                    <Content style={{flex:1}}>
                                        <Form>
                                            <Item inlineLabel placeholderTextColor='white'>
                                                <Label style={{color:'white',fontWeight:'900'}}>EMAIL SIGN UP</Label>
                                            </Item>
                                            <Item inlineLabel placeholderTextColor='white'>
                                                <Label style={{color:'gray',fontWeight:'900'}} onPress={() => {this.signUpEmail._root.focus()}}>Email</Label>
                                                <Input style={styles.inputStyle} returnKeyType='next' autoCapitalize = "none" 
                                                    onChangeText={(text) => this.setState({signUpUserName:text})}
                                                    ref={(input) => { this.signUpEmail = input; }}
                                                    onSubmitEditing={() => { this.signUpName._root.focus(); }}/>
                                            </Item>
                                            <Item inlineLabel placeholderTextColor='white'>
                                                <Label style={{color:'gray',fontWeight:'900'}} onPress={() => {this.signUpName._root.focus()}}>Name</Label>
                                                <Input style={styles.inputStyle} returnKeyType='next' autoCapitalize = "none" 
                                                    onChangeText={(text) => this.setState({signUpName:text})}
                                                    ref={(input) => { this.signUpName = input; }}
                                                    onSubmitEditing={() => { this.signUpPassword._root.focus(); }}/>
                                            </Item>
                                            <Item inlineLabel placeholderTextColor='white'>
                                                <Label style={{color:'gray',fontWeight:'900'}} onPress={() => {this.signUpPassword._root.focus()}}>Password</Label>
                                                <Input style={styles.inputStyle} secureTextEntry returnKeyType='done'
                                                    onChangeText={(text) => this.setState({signUpPassword:text})}
                                                    ref={(input) => { this.signUpPassword = input; }}
                                                />
                                            </Item>
                                            <Item style={{paddingTop:10,paddingBottom:10,width:'100%'}}>
                                                <CheckBox checked={this.state.termsServiceCheck}  onPress={() => {this.checkBoxToggle('termsServiceCheck');}}   color={theme.COLORS.Secondary} />
                                                <Body>
                                                    <Text style={{flex:1,color:'white',fontSize:15,fontWeight:'900',paddingStart:20,paddingEnd:20,flexWrap:'wrap'}}>
                                                        I Agree to the terms of service and privacy policy
                                                    </Text> 
                                                    <Text style={{flex:1,color:theme.COLORS.Secondary,fontSize:15,fontWeight:'900',paddingStart:20,paddingEnd:20,flexWrap:'wrap'}}>
                                                        I Agree to the terms of service and privacy policy
                                                    </Text>
                                                </Body>
                                            </Item>
                                            <Item style={{paddingTop:10,paddingBottom:10,width:'100%'}}>
                                                <CheckBox checked={this.state.emailSendCheck} onPress={() => {this.checkBoxToggle('emailSendCheck');}}  color={theme.COLORS.Secondary}/>
                                                <Body>
                                                    <Text style={{flex:1,color:'white',fontSize:15,fontWeight:'900',paddingStart:20,paddingEnd:20,flexWrap:'wrap'}}>
                                                    Yes, send me deals, discounts, and updates!
                                                    </Text> 
                                                </Body>
                                            </Item>
                                            <Button block style={{backgroundColor: theme.COLORS.Secondary,margin:10}}
                                                    onChangeText={(text) => this.setState({signUpUserName:text})}
                                                    onPress={ () => { this.handleSignUp(this.state.signUpUserName,this.state.signUpName,this.state.signUpPassword) } }>
                                                <Text style={{color:'white',fontSize:20,fontWeight:'900'}}>
                                                    Sign Up
                                                </Text>
                                            </Button>
                                        </Form>
                                    </Content>
                                </View>
                            </View>
                        </View>
                    )}
                    </ImageBackground>
                </View>
            </SafeAreaView>
        );
    }
}
export default SignIn;

const styles = StyleSheet.create({
    logoContainer: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    signInContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    buttonsContainer: {
        flex: 4,
        paddingLeft:10,
        paddingRight: 10,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    backgroundImage: {
        width: '100%',
        height:'100%',
        resizeMode: 'cover'
    },
    addText: {
        fontSize:35,
        fontWeight: '900',
        color:'white',
        marginBottom:25
    },
    signUpBtn:{
        marginBottom:25,
        backgroundColor: theme.COLORS.Secondary
    },
    signInBtn:{
        marginBottom:25,
        borderColor:'white',
        borderWidth: 2
    },
    termsAndPolicy: {
        height: 'auto',
        paddingLeft:10,
        paddingRight: 10,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom:10
    },
    termsAndPolicyText:{
        color:theme.COLORS.Secondary,
        alignItems:'center',
        textAlign:'center'
    },
    userNameContainer: {
        flex:1,
        flexDirection:'row',
        marginTop:30
    },
    passwordContainer:{
        backgroundColor:'white',
        borderRadius:10,
        width:250,
        borderWidth:1,
        borderColor:'gray',
        flexDirection:'row',
        marginTop:20
    },
    iconContainer:{
        width:40,
        alignItems:"center",
        justifyContent:"center"
    },
    textContainer:{
        flex:4,
        paddingTop:((Platform.OS === 'ios')? 15 : 0),
        paddingBottom:(Platform.OS === 'ios')? 15 : 0,
        paddingRight:15,
        flexDirection:'row',
        flex:1,
        justifyContent:'flex-start'
    },
    subTitleStyle:{
        color:'black',
        fontSize:18,
        width:'100%'
    },
    inputStyle: {
        color:'white',
        fontWeight:'900'
    }
});