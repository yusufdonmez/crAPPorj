import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class TripInfo extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>TripInfo</Text>
            </View>
        );
    }
}
export default TripInfo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});