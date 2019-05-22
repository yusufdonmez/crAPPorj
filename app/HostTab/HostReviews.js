import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class HostReviews extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>HostReviews</Text>
            </View>
        );
    }
}
export default HostReviews;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});