import React from "react";
import {AsyncStorage,Platform,NativeModules} from "react-native";
import Routing from "./Routing";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: true,
      checkedSignIn: false
    };
    let systemLanguage = 'en';
    if (Platform.OS === 'android') {
      systemLanguage = NativeModules.I18nManager.localeIdentifier;
    } else {
      systemLanguage = NativeModules.SettingsManager.settings.AppleLocale;
    }
    global.languageCode = systemLanguage.substring(0, 2);

    global.isLogin = this.state.signedIn;
    global.programPrimaryColor = '#231f20';
    global.programSecondaryColor = '#5bd88c';
    global.appAddress = 'https://carrental.harmonyict.com/CarRental';
  }


  render() {
    return <Routing SignedIn = {this.state.signedIn} />;
  }
}
