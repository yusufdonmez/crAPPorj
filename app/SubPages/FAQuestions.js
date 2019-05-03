import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class FAQuestions extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>FAQuestions</Text>
            </View>
        );
    }
}
export default FAQuestions;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});