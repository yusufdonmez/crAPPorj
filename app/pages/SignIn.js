import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions
} from "react-native";
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome'
import { strings } from '../locales/i18n';
import { Actions } from 'react-native-router-flux';

const {width,height} = Dimensions.get('window');

class SignIn extends Component {
    constructor(props){
        super(props)

        this.state = {
            displaySignIn:'false'
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../assets/caravan.jpg')} style={styles.backgroundImage} />
                <TouchableOpacity style={{position:'absolute',left:20,top:30}} onPress={ () => { Actions.HomeScreen() } }>
                    <Icon name="times" color='gray' size={35} />
                </TouchableOpacity>
                <View style={styles.container}>
                    <TouchableOpacity onPress={ () => { this.setState({displaySignIn:'true'})} }>
                        <Icon name="user" color='gray' size={35} />
                        <Text>SIGN IN - {this.state.displaySignIn}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
export default SignIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    backgroundImage: {
        position:'absolute',
        top: 0,
        left: 0,
        height:'100%',
        resizeMode: 'cover'
    }
});