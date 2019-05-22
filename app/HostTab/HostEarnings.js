import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class HostEarnings extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>HostEarnings</Text>
            </View>
        );
    }
}
export default HostEarnings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});