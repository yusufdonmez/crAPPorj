import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class Guidelines extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Guidelines</Text>
            </View>
        );
    }
}
export default Guidelines;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});