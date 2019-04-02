import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class HistoryTrips extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>HistoryTrips</Text>
            </View>
        );
    }
}
export default HistoryTrips;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});