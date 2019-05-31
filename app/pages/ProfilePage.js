import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    SafeAreaView
} from "react-native";
import { Actions } from "react-native-router-flux";
import { Container, Content, Thumbnail, Grid, Row, Left, Body, Right, Icon, Button } from "native-base";
import { TouchableHighlight } from "react-native-gesture-handler";
import * as theme from '../assets/theme'
import { strings } from "../locales/i18n";
class ProfilePage extends Component {
    constructor(props){
        super(props)
        this.state = {
            readMore:false,
            userData:[]
        }
        this.editProfileModal = this.editProfileModal.bind(this);
    }
    
    editProfileModal(){
        Actions.EditProfile();
    }

    componentDidMount(){
        this.getUserProfile();
    }

    getUserProfile(){
        console.log(global.appAddress + '/service/c1/json/PrivateService/getUserProfile/en_US?userID=' + this.props.userID)
        fetch(global.appAddress + '/service/c1/json/PrivateService/getUserProfile/en_US?userID='+ this.props.userID,
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
                console.log('<--- getUserProfile Loaded From Server --->' + responseJson);
                this.setState({isLoading:false,
                            userData: responseJson});
            }
            else {
                this.setState({isLoading:false});
            }
        })
        .catch((error) => {
            console.error(error.message + ' on ProfilePage at line 53');
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

    render() {
        const {userData} = this.state
        return (
            <SafeAreaView style={{flex:1,backgroundColor: theme.COLORS.Primary}}>
                <Container>
                    <Content>
                        <View style={{height:100,flex:1,width: '100%',backgroundColor: theme.COLORS.Primary}}>
                        </View> 
                        <View  style={{alignItems: 'center'}}>
                            <View style={{top:-45,flexDirection: "column", alignItems: 'center'}}>
                                {(typeof userData.Photo == 'undefined') ? 
                                    <Thumbnail avatar style={{width:90,height: 90,borderRadius: 45,borderColor:'white',borderWidth: 3}} 
                                    source={{uri: global.appAddress+'/Image?imagePath='+ 'FwMdCwarLd60SKduyl8Y9LqlPZb0pc5s2I7IyDpmQDk%3D'}} />
                                :
                                    <Thumbnail avatar style={{width:90,height: 90,borderRadius: 45,borderColor:'white',borderWidth: 3}} 
                                    source={{uri: global.appAddress+'/Image?imagePath='+ userData.Photo}} />
                                }
                                
                                <Text style={{marginTop:10,color:'black',fontSize:30,fontWeight: '900'}}>{userData.Name}</Text>
                                {userData.TripCount != 0 
                                ?
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={styles.tripNumberText}> 
                                            { this._renderReviewStars(userData.TripCount) } {userData.TripCount} 
                                        </Text>
                                    </View>
                                :
                                    <Text style={styles.tripNumberText}>No trips yet</Text>
                                }
                                <Text style={{marginTop:20,color:'black',fontSize:14,fontWeight: '400'}}>{strings('joined')} {userData.JoinDate}</Text>
                            </View>
                        </View>

                        <Grid style={{flex: 2,marginTop:10, alignItems: 'flex-start'}}>
                            <Row style={styles.titleContainer} >
                                <Text style={styles.titleText}>About Me</Text>
                            </Row>
                            <Row style={{paddingTop:15}} >
                                <Left style={{fontWeight: '600',paddingLeft:10,paddingRight:10}}>
                                    <Text>{userData.AboutMe}</Text>
                                </Left>
                            </Row> 

                            {this.state.readMore  ?
                                <React.Fragment>
                                    {userData.Work != undefined && userData.Work != '' && (
                                        <React.Fragment>
                                            <Row style={styles.titleContainer} >
                                                <Text style={styles.titleText}>Works</Text>
                                            </Row>
                                            <Row style={{paddingTop:15}} >
                                                <Left style={{fontWeight: '600',paddingLeft:10,paddingRight:10}}>
                                                    <Text>{userData.Work}</Text>
                                                </Left>
                                            </Row>
                                        </React.Fragment>
                                    )}
                                
                                {userData.School != undefined && userData.School != '' && (
                                    <React.Fragment>
                                        <Row style={styles.titleContainer} >
                                            <Text style={styles.titleText}>School</Text>
                                        </Row>
                                        <Row style={{paddingTop:15}} >
                                            <Left style={{fontWeight: '600',paddingLeft:10,paddingRight:10}}>
                                                <Text>{userData.School}</Text>
                                            </Left>
                                        </Row>
                                    </React.Fragment>
                                )}
                                {userData.Language != undefined && userData.Language != '' && (
                                    <React.Fragment>
                                        <Row style={styles.titleContainer} >
                                            <Text style={styles.titleText}>Languages</Text>
                                        </Row>
                                        <Row style={{paddingTop:15}} >
                                            <Left style={{fontWeight: '600',paddingLeft:10,paddingRight:10}}>
                                                <Text>{userData.Language}</Text>
                                            </Left>
                                        </Row>
                                    </React.Fragment>
                                )}

                                {userData.ResponseRate != undefined && userData.ResponseRate != '' && (
                                    <React.Fragment>
                                        <Row style={styles.titleContainer} >
                                            <Text style={styles.titleText}>Host Stats</Text>
                                        </Row>
                                        <Row style={{paddingTop:15}} >
                                            <Left style={{fontWeight: '600',paddingLeft:10}}>
                                                <Text>Response Rate</Text>
                                            </Left>
                                            <Body></Body>
                                            <Right paddingRight={10}>
                                                <Text>{userData.ResponseRate} %</Text>
                                            </Right>
                                        </Row>
                                    </React.Fragment>
                                )}
                                {userData.ResponseTime != undefined && userData.ResponseTime != '' && (
                                    <React.Fragment>
                                        <Row style={{paddingTop:15}} >
                                            <Left style={{fontWeight: '600',paddingLeft:10}}>
                                                <Text>Response Time</Text>
                                            </Left>
                                            <Body></Body>
                                            <Right paddingRight={10}>
                                                <Text>{userData.ResponseTime} minutes</Text>
                                            </Right>
                                        </Row>
                                    </React.Fragment>
                                )}
                            </React.Fragment>
                            : null }
                            <Row style={{paddingTop:15}} >
                                <Right style={{fontWeight: '600',paddingLeft:10,paddingRight:10}}>
                                    {!this.state.readMore  ?
                                        <Button transparent onPress={() => this.setState({readMore:true})}>
                                            <Text style={{color:theme.COLORS.Secondary}}>READ MORE</Text>
                                        </Button>
                                        :
                                        <Button transparent onPress={() => this.setState({readMore:false})}>
                                            <Text style={{color:theme.COLORS.Secondary}}>READ LESS</Text>
                                        </Button>
                                    }
                                </Right>
                            </Row> 

                            <Row style={styles.titleContainer} >
                                <Text style={styles.titleText}>Verified Info</Text>
                            </Row>
                            <Row style={{paddingTop:15}} >
                                <Left style={{fontWeight: '600',paddingLeft:10}}>
                                    <Text>Approved to Drive </Text>
                                </Left>
                                <Body></Body>
                                <Right paddingRight={10}>
                                    {/* Need to switch between icons */}
                                    {userData.IsVerified == 'verified'
                                    ? 
                                        <Icon name="checkmark-circle-outline" size={24} style={{color:theme.COLORS.Secondary}}></Icon>
                                    :
                                        <Icon name="remove-circle-outline" size={24} style={{color:'red'}}></Icon>
                                    }
                                </Right>
                            </Row>
                            <Row style={{paddingTop:15}} >
                                <Left style={{fontWeight: '600',paddingLeft:10}}>
                                    <Text>Email Address </Text>
                                </Left>
                                <Body></Body>
                                <Right paddingRight={10}>
                                    {/* Need to switch between icons */}
                                    {userData.IsEmailVerified == 'verified'
                                    ? 
                                        <Icon name="checkmark-circle-outline" size={24} style={{color:theme.COLORS.Secondary}}></Icon>
                                    :
                                        <Icon name="remove-circle-outline" size={24} style={{color:'red'}}></Icon>
                                    }
                                </Right>
                            </Row>
                            <Row style={styles.titleContainer} >
                                <Left style={{fontWeight: '600',paddingLeft:10}}>
                                    <Text>Phone Number </Text>
                                </Left>
                                <Body></Body>
                                <Right paddingRight={10}>
                                    {/* Need to switch between icons */}
                                    {userData.IsMobileVerified == 'verified'
                                    ? 
                                        <Icon name="checkmark-circle-outline" size={24} style={{color:theme.COLORS.Secondary}}></Icon>
                                    :
                                        <Icon name="remove-circle-outline" size={24} style={{color:'red'}}></Icon>
                                    }
                                </Right>
                            </Row>

                            {userData.fcCount != 0 && (
                                <Button transparent onPress={() => (Actions.Favorites({userID:this.props.userID}))} style={{flex:1,width:'100%',height:80,alignItems: "center"}}>
                                    <Row style={styles.specContainer}>
                                        <Left style={styles.iconContainer}>
                                            <Icon name="heart" size={24} style={{color:'#231f20'}}></Icon>
                                            <Text style={{justifyContent: 'center',paddingStart:20}}>{userData.Name}'s favorites</Text>
                                        </Left>
                                        <Body>
                                        </Body>
                                        <Right style={styles.rightBtnContainer}>
                                            <Icon name="arrow-dropright" size={24} style={{color:'gray'}}></Icon>
                                        </Right>
                                    </Row>
                                </Button>
                            )}
                        </Grid>
                    </Content>
                </Container>
            </SafeAreaView>
        );
    }
}
export default ProfilePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleContainer: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        paddingTop:15,
        width: '100%'
    },
    titleText:{
        padding:10,
        fontSize:12,
        fontWeight:'700',
		textTransform: 'uppercase'
    },
    buttonContainer: {
        borderTopColor: 'gray',
        borderTopWidth: 1,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginTop:40,
        marginBottom:20,
        paddingTop:10,
        paddingBottom:10,
        width: '100%',
        flex:1,
        flexDirection:'row',
    },
    specContainer: {
        backgroundColor:'white',
        padding:10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        borderTopWidth: 1,
        borderTopColor: 'gray',
        alignItems:'center',
        flex:1
    },
    iconContainer: {
        flex: 3,
        flexDirection: 'row',alignItems: "center"
    },
    rightBtnContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    reviewStar: {
        color:'red',
        fontSize:18,
        marginEnd:3
    },
});