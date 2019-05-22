import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    SafeAreaView
} from "react-native";
import { Container, Content, Grid, Row, Icon, List, ListItem, Body, Left, Right, Thumbnail, Button} from "native-base";
import { Actions } from "react-native-router-flux";
import * as theme from '../assets/theme'
import { TouchableOpacity } from 'react-native-gesture-handler';
class ReviewList extends Component {
    constructor(props){
        super(props)
        this.state ={
            isLoading:true,
            reviewsData : []
        };
    }

    getReviews(){
        console.log(global.appAddress + '/service/c1/json/PublicService/carReviews/en_US'+'carId:'+this.props.carID+'userId:'+this.props.userID)
        
        fetch(global.appAddress + '/service/c1/json/PublicService/carReviews/en_US?id=' + this.props.carID ,
        {
            credentials: 'include',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log('Component Did Mount Data List: '+ responseJson);
            if( responseJson != undefined && responseJson.length != 0 ){
                console.log('<--- reviews service loaded from server --->');
                this.setState({isLoading:false,
                            reviewsData: responseJson});
            }
            else {
                this.setState({isLoading:false,noRecordsFound:true});
            }
        })
        .catch((error) => {
            console.error(error.message + ' on reviewlist at line 46');
        });
    }

    _renderReviewStars(star){
        let stars = [];
		for (var i = 1; i <= 5; i++) {
			let starName = 'star';
			if (i > star) {
				starName = 'star-outline';
			}
			stars.push((<Icon key={Math.random()} style={styles.reviewStar} name={starName} ></Icon>));
        }
        return stars
    }

    componentDidMount(){
        this.getReviews();
    }

    render() {
    //const data = Array.from({length: 14});
    const data = this.state.reviewsData;
        return (
            <SafeAreaView style={{flex:1,backgroundColor: theme.COLORS.Primary}}>
                <Container>
                    <Content>
                        <View style={styles.totalReviewsContainer}>
                            {this._renderReviewStars(this.props.NoOfStar)}
                            <View>
                                <Text> {this.props.NoOfReview} reviews </Text>   
                            </View>
                        </View>
                        <List key={Math.random()}>
                            {data.map((item, i) =>
                                <ListItem key={item.Date} avatar onPress={() => {Actions.Profile()}}>
                                    <Left>
                                        <Thumbnail source={{uri: global.appAddress+'/Image?imagePath='+ item.Photo}} />
                                    </Left>
                                    <Body>
                                        <Text style={{fontWeight: '600',color:theme.COLORS.Secondary}}>{item.Name}</Text>
                                        <Text note>{item.GuestComment}</Text>
                                        <View style={styles.guestStar}>{this._renderReviewStars(item.GuestRank)}</View>
                                    </Body>
                                    <Right>
                                        <Text note>{item.Date}</Text>
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
    guestStar: {
        flexDirection: 'row'
    }
});