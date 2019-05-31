import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    SafeAreaView,FlatList,Dimensions
} from "react-native";
import { Container, Content, Grid, Row, Icon, List, ListItem, Body, Left, Right, Thumbnail, Button} from "native-base";
import { Actions } from "react-native-router-flux";
import * as theme from '../assets/theme'
import { TouchableOpacity } from 'react-native-gesture-handler';

const {width,height} = Dimensions.get('window')

class ReviewList extends Component {
    constructor(props){
        super(props)
        this.state ={
            isLoading:true,
            reviewsData : []
        };
    }

    getReviews(){
        console.log(global.appAddress + '/service/c1/json/PublicService/carReviews/en_US?id='+this.props.carID)
        
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
     
    _renderItem = ({item}) => (
        <Row>
            <TouchableOpacity onPress={() => {Actions.ProfilePage({userID:item.GuestID})}}>
            <View style={{width:75, alignItems: 'center', marginTop:10,}}>
            {(typeof item.Photo == 'undefined') ? 
                <Thumbnail source={{uri: global.appAddress+'/Image?imagePath='+ 'FwMdCwarLd60SKduyl8Y9LqlPZb0pc5s2I7IyDpmQDk%3D' }} /> 
                :
                <Thumbnail source={{uri: global.appAddress+'/Image?imagePath='+ item.Photo}} />
            }
            </View>
            </TouchableOpacity>
            <View  style={{width:width-75,borderBottomWidth: 1, borderColor:'#aaa', padding:10,}}>
                    <View style={{flexDirection: 'row',justifyContent:'space-between',paddingVertical:5}}>
                        <Text style={{fontWeight: '600',fontSize:16}}>{item.Name}</Text>
                        <Text style={{fontWeight: '600',fontSize:16, color:'#aaa'}} note>{item.Date}</Text>
                    </View>
                    <Text note>{item.GuestComment}</Text>
                    <View style={styles.guestStar}>{this._renderReviewStars(item.GuestRank)}</View>
            </View>
        </Row>
    )

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
                        <FlatList 
                            data={this.state.reviewsData}
                            renderItem={this._renderItem}
                            keyExtractor={(item) => item.id.toString()} //tostring fro warning cell type err
                        />
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
        flexDirection: 'row',
        paddingTop:5,
    }
});