import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import { Actions } from "react-native-router-flux";
import { Container, Content, Thumbnail, Grid, Row, Left, Body, Right, Icon, Button } from "native-base";
import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";

import * as theme from '../assets/theme'

    var createRightButton = function() {
        return (
            <TouchableHighlight onPress={() => {this.editProfileModal()} }>
                <Icon name="create" size={24} style={{ color: 'white', paddingRight: 10 }} />
            </TouchableHighlight>
        );
    }
class ProfilePage extends Component {
    constructor(props){
        super(props)
        
        this.editProfileModal = this.editProfileModal.bind(this);
    }
    
    editProfileModal(){
        Actions.Account();
    }

    render() {
        return (
            <Container>
                <Content>
                    <View style={{height:100,flex:1,width: '100%',backgroundColor: theme.COLORS.Primary}}>
                    </View> 
                    <View  style={{alignItems: 'center'}}>
                        <View style={{top:-45,flexDirection: "column", alignItems: 'center'}}>
                            <Thumbnail avatar style={{width:90,height: 90,borderRadius: 45,borderColor:'white',borderWidth: 3}} source={require('../assets/user.jpeg')} />
                            <Text style={{marginTop:10,color:'black',fontSize:30,fontWeight: '900'}}>Ali U.</Text>
                            <Text style={{marginTop:20,color:'black',fontSize:14,fontWeight: '400'}}>Joined Feb 2019</Text>
                        </View>
                    </View>
                    <Grid style={{flex: 2,marginTop:40, alignItems: 'flex-start'}}>
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
                                <Icon name="checkmark-circle-outline" size={24} style={{color:theme.COLORS.Secondary}}></Icon>
                            </Right>
                        </Row>
                        <Row style={{paddingTop:15}} >
                            <Left style={{fontWeight: '600',paddingLeft:10}}>
                                <Text>Email Address </Text>
                            </Left>
                            <Body></Body>
                            <Right paddingRight={10}>
                                {/* Need to switch between icons */}
                                <Icon name="checkmark-circle-outline" size={24} style={{color:theme.COLORS.Secondary}}></Icon>
                            </Right>
                        </Row>
                        <Row style={styles.titleContainer} >
                            <Left style={{fontWeight: '600',paddingLeft:10}}>
                                <Text>Phone Number </Text>
                            </Left>
                            <Body></Body>
                            <Right paddingRight={10}>
                                {/* Need to switch between icons */}
                                <Icon name="remove-circle-outline" size={24} style={{color:'red'}}></Icon>
                            </Right>
                        </Row>

                        <Button transparent onPress={() => {Actions.Favorites();}} style={{flex:1,width:'100%',height:80,alignItems: "center"}}>
                            <Row style={styles.specContainer}>
                                <Left style={styles.iconContainer}>
                                    <Icon name="heart" size={24} style={{color:'#231f20'}}></Icon>
                                    <Text style={{justifyContent: 'center',paddingStart:20}}>Ali's favorites</Text>
                                </Left>
                                <Body>
                                </Body>
                                <Right style={styles.rightBtnContainer}>
                                    <Icon name="arrow-dropright" size={24} style={{color:'gray'}}></Icon>
                                </Right>
                            </Row>
                        </Button>
                    </Grid>
                </Content>
            </Container>
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
});