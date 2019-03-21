import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class ImageLoader extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>ImageLoader</Text>
            </View>
        );
    }
}
export default ImageLoader;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});