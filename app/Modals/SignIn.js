import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
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

const {width,height} = Dimensions.get('window');

class SignIn extends Component {
    constructor(props){
        super(props)

        this.state = {
            userName:'',
            password:'',
            displaySignIn:'false',
            displaySignUp:'false'
        }
    }
    render() {
        return (
            <SafeAreaView style={{flex:1,backgroundColor: global.programPrimaryColor}}>
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
                                                <Label style={{color:'gray',fontWeight:'900'}}>Email</Label>
                                                <Input style={styles.inputStyle} returnKeyType='next'
                                                    onChangeText={(text) => this.setState({userName:text})}
                                                    ref={(input) => { this.email = input; }}
                                                    onSubmitEditing={() => { this.password._root.focus(); }}/>
                                            </Item>
                                            <Item inlineLabel last placeholderTextColor='white'>
                                                <Label style={{color:'gray',fontWeight:'900'}}>Password</Label>
                                                <Input style={styles.inputStyle} returnKeyType='done' secureTextEntry
                                                    onChangeText={(text) => this.setState({password:text})}
                                                    ref={(input) => { this.password = input; }}/>
                                            </Item>
                                            <Button block style={{backgroundColor: '#5bd88c',margin:10}}>
                                                <Text style={{color:'white',fontSize:20,fontWeight:'900'}}>
                                                    Log in with email
                                                </Text>
                                            </Button>
                                            <Button transparent block style={{margin:10}}>
                                                <Text style={{color:'#5bd88c',fontSize:20,fontWeight:'900'}}>
                                                    Forgot password?
                                                </Text>
                                            </Button>
                                        </Form>
                                    </Content>
                                </View>
                            </View>
                            <View style={styles.termsAndPolicy}>
                                <Button transparent full>
                                    <Text style={{color:'#5bd88c',alignItems:'center',textAlign:'center'}}>
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
                                                <Label style={{color:'gray',fontWeight:'900'}}>Email</Label>
                                                <Input style={styles.inputStyle} returnKeyType='next'
                                                    onChangeText={(text) => this.setState({signUpUserName:text})}
                                                    ref={(input) => { this.signUpEmail = input; }}
                                                    onSubmitEditing={() => { this.signUpName._root.focus(); }}/>
                                            </Item>
                                            <Item inlineLabel placeholderTextColor='white'>
                                                <Label style={{color:'gray',fontWeight:'900'}}>Name</Label>
                                                <Input style={styles.inputStyle} returnKeyType='next'
                                                    onChangeText={(text) => this.setState({signUpName:text})}
                                                    ref={(input) => { this.signUpName = input; }}
                                                    onSubmitEditing={() => { this.signUpPassword._root.focus(); }}/>
                                            </Item>
                                            <Item inlineLabel placeholderTextColor='white'>
                                                <Label style={{color:'gray',fontWeight:'900'}}>Password</Label>
                                                <Input style={styles.inputStyle} secureTextEntry returnKeyType='done'
                                                    onChangeText={(text) => this.setState({signUpName:text})}
                                                    ref={(input) => { this.signUpPassword = input; }}
                                                    onSubmitEditing={() => { this.signUpPassword._root.focus(); }} />
                                            </Item>
                                            <Item style={{paddingTop:10,paddingBottom:10,width:'100%'}}>
                                                <CheckBox checked={true} color='#5bd88c' />
                                                <Body>
                                                    <Text style={{flex:1,color:'white',fontSize:15,fontWeight:'900',paddingStart:20,paddingEnd:20,flexWrap:'wrap'}}>
                                                        I Agree to the terms of service and privacy policy
                                                    </Text> 
                                                    <Text style={{flex:1,color:"#5bd88c",fontSize:15,fontWeight:'900',paddingStart:20,paddingEnd:20,flexWrap:'wrap'}}>
                                                        I Agree to the terms of service and privacy policy
                                                    </Text>
                                                </Body>
                                            </Item>
                                            <Item style={{paddingTop:10,paddingBottom:10,width:'100%'}}>
                                                <CheckBox checked={true}  color='#5bd88c'/>
                                                <Body>
                                                    <Text style={{flex:1,color:'white',fontSize:15,fontWeight:'900',paddingStart:20,paddingEnd:20,flexWrap:'wrap'}}>
                                                    Yes, send me deals, discounts, and updates!
                                                    </Text> 
                                                </Body>
                                            </Item>
                                            <Button block style={{backgroundColor: '#5bd88c',margin:10}}>
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
        backgroundColor: '#5bd88c'
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
        color:'white',
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