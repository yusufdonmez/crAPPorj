import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import { Content, Icon, List, ListItem, Body, Left, Right, Thumbnail} from "native-base";
import * as theme from '../assets/theme';

class HostReviews extends Component {
    constructor(props){
        super(props)
        this.state ={
            isLoading:true,
            reviewsData : []
        };
    }

    getReviews(){
        console.log(global.appAddress + '/service/c1/json/PublicService/hostReviews/en_US?id'+' userId:'+this.props.userID)
        
        fetch(global.appAddress + '/service/c1/json/PublicService/hostReviews/en_US?id=' + this.props.userID ,
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
            console.error(error.message + ' on HostReviews at line 43');
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
        const data = this.state.reviewsData;
        return (
            <Content>
                <List >
                    {data.map((item, i) =>
                        <ListItem key={item.Date} avatar onPress={() => {Actions.Profile()}}>
                            <Left>
                                <Thumbnail source={{uri: global.appAddress+'/Image?imagePath='+ item.Photo}} />
                            </Left>
                            <Body>
                                <Text style={{fontWeight: '600',color:theme.COLORS.Secondary}}>{item.Name}</Text>
                                <Text note>{item.Comment}</Text>
                                <View style={styles.guestStar}>{this._renderReviewStars(item.NoOfStar)}</View>
                            </Body>
                            <Right>
                                <Text note>{item.Date}</Text>
                            </Right>
                        </ListItem>
                    )}
                </List>
            </Content>
        );
    }
}
export default HostReviews;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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