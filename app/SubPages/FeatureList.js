import React, { Component } from "react";
import {
    Text,
    StyleSheet,
    SafeAreaView
} from "react-native";
import { Container, Content, Grid, Row, Icon} from "native-base";
import * as theme from '../assets/theme'
class FeatureList extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <SafeAreaView style={{flex:1,backgroundColor: theme.COLORS.Primary}}>
                <Container>
                    <Content>
                        <Grid>
                            {this.props.featureList.map((item, i) =>
                                <Row style={styles.featureContainer}>
                                    <Icon name={item.icon} size={30} color='gray' style={styles.featureIcon}></Icon>
                                    <Text style={{color:'black',fontSize:22,}}> {item.EngName} </Text>
                                </Row>
                            )}
                        </Grid>
                    </Content>
                </Container>
            </SafeAreaView>
        );
    }
}
export default FeatureList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    featureContainer: {
        paddingHorizontal:20,
        paddingVertical:10
    },
    featureIcon:{
        fontSize:20,
        paddingRight:10
    }
});