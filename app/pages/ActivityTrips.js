import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    SafeAreaView
} from "react-native";

class ActivityTrips extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>ActivityTrips</Text>
            </View>
        );
    }
}
export default ActivityTrips;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});