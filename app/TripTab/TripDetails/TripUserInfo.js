import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class TripUserInfo extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>TripUserInfo</Text>
            </View>
        );
    }
}
export default TripUserInfo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});