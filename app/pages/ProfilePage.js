import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import { Actions } from "react-native-router-flux";

    var createRightButton = function() {
        return (
            <TouchableHighlight onPress={() => {this.editProfileModal()} }>
                <Icon name="create" size={24} style={{ color: 'white', paddingRight: 10 }} />
            </TouchableHighlight>
        );
    }
class ProfilePage extends Component {
    constructor(props){
        super(props)
        
        this.editProfileModal = this.editProfileModal.bind(this);
    }
    
    editProfileModal(){
        Actions.Account();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>ProfilePage</Text>
            </View>
        );
    }
}
export default ProfilePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});