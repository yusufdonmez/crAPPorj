import React from "react";
import {AsyncStorage,Platform,NativeModules} from "react-native";
import Routing from "./Routing";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
    let systemLanguage = 'en';
    if (Platform.OS === 'android') {
      systemLanguage = NativeModules.I18nManager.localeIdentifier;
    } else {
      systemLanguage = NativeModules.SettingsManager.settings.AppleLocale;
    }
    global.languageCode = systemLanguage.substring(0, 2);

    global.isLogin = false;
    global.programPrimaryColor = '#231f20';
    global.programSecondaryColor = '#5bd88c';
    global.appAddress = 'https://carrental.harmonyict.com/CarRental';
  }

  changeLanguage(){
      var lang = ''
      if( global.languageCode == 'ar' ){
        lang = 'ar_SA';
      }
      else{
        lang = 'en_US';
      }
      fetch(global.appAddress + '/userServlet?changeLocale='+lang , {
          method: 'GET',
          credentials: 'include',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          }
      }).then(function(response) {
                        
      });
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

  componentDidMount() {
    var userName;
    var password;
    try {
      AsyncStorage.getItem("@MySuperStore:userName").then((value) => {
        userName = value;
      }).done();
      AsyncStorage.getItem("@MySuperStore:password").then((value) => {
        password = value;
      })
      .then(res => {
        if(userName !== null && password !== null && userName !== undefined  && password !== undefined ){
          console.log('Trying to login..');
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
              if(responseJson.success) {
                console.log('index.js componentDidMount');
                global.userSecStamp = responseJson.userSecStamp;
                global.userId = responseJson.userId;
                global.userEmail = responseJson.userEmail;
                global.companyId = responseJson.companyId;
                global.userAvatar = responseJson.userAvatar;
                global.isLogin = responseJson.success;
                this.setState({signedIn:true});
                this.setState({checkedSignIn:true});
                this.changeLanguage();
              }
              else {
                console.log('Cannot Login...!!!!');
                this.removeItemValue('@MySuperStore:password');
                global.isLogin = false;
                this.setState({signedIn:false});
                this.setState({checkedSignIn:true});  
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }  
        else {
          this.setState({signedIn:false});
          this.setState({checkedSignIn:true});  
        }
      });
      
    } catch (error) {
      console.log(error.error);
    }
  }

  render() {
    if (!this.state.checkedSignIn) {
      return null;
    }
    else {
      return <Routing />;
    }
  }
}
