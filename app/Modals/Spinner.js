import React, { Component } from 'react';
import { View,Text,Modal,ActivityIndicator } from 'react-native';



class Spinner extends Component {
    state = {
        visible: this.props.visible,
        textContent: this.props.textContent
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.visible !== nextProps.visible) {
            return {
                visible : nextProps.visible,
            }
        }
        return null;
    }

    render() { 
        return (
            <Modal visible={this.state.visible} transparent = {true}>
                <View style={{backgroundColor:'rgba(0,0,0,0.5)',flex:1,justifyContent:'center',alignItems: 'center'}}>
                    <View style={{backgroundColor:'white',opacity:1,width:200,height:100,justifyContent:'center',borderRadius:20}}>
                        <ActivityIndicator/>
                        <Text style={{textAlign:'center'}}>{this.state.textContent}</Text>
                    </View>
                </View>
            </Modal>
        )
    }

}


export default Spinner;