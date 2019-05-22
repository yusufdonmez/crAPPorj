import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class TripMessages extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>TripMessages</Text>
            </View>
        );
    }
}
export default TripMessages;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
