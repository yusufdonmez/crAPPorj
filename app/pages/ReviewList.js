import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    SafeAreaView
} from "react-native";

import { Container, Content, Grid, Row, Icon, List, ListItem, Body, Left, Right, Thumbnail, Button} from "native-base";
import { Actions } from "react-native-router-flux";

class ReviewList extends Component {
    constructor(props){
        super(props)
    }

    _renderReviewStars(star){
        let stars = [];
		for (var i = 1; i <= 5; i++) {
			let starName = 'star';
			if (i > star) {
				starName = 'star-outline';
			}
			stars.push((<Icon style={styles.reviewStar} name={starName} ></Icon>));
        }
        return stars
    }

    render() {
    const data = Array.from({length: 14});
        return (
            <SafeAreaView style={{flex:1,backgroundColor: global.programPrimaryColor}}>
                <Container>
                    <Content>
                        <View style={styles.totalReviewsContainer}>
                            {this._renderReviewStars(5)}
                            <View>
                                <Text> 60 reviews </Text>   
                            </View>
                        </View>
                        <List>
                            {data.map((item, i) =>
                                <ListItem avatar onPress={() => {Actions.ProfilePage();}}>
                                    <Left>
                                        <Thumbnail source={require('../assets/user.jpeg')} />
                                    </Left>
                                    <Body>
                                        <Text style={{fontWeight: '600',color:global.programSecondaryColor}}>William L.</Text>
                                        <Text note>Very nice car great owner he has very cool and helpful very good guy I will sure rent from in near feture.Very nice car great owner he has very cool and helpful very good guy I will sure rent from in near feture</Text>
                                    </Body>
                                    <Right>
                                        <Text note>Mar 4</Text>
                                    </Right>
                                </ListItem>
                            )}
                        </List>
                    </Content>
                </Container>
            </SafeAreaView>
        );
    }
}
export default ReviewList;

const styles = StyleSheet.create({
    totalReviewsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection:'row',
        borderBottomWidth: 1,
        borderBottomColor:'gray',
        margin:20,
        paddingBottom:10
    },
    reviewStar: {
        color:'red',
        fontSize:22,
        marginEnd:3
    },
});