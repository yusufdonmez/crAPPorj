import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Modal,
    StatusBar,
    Platform,
    Dimensions
} from "react-native";
import { Button, Icon, ListItem, CheckBox, Body, Content, Grid, Row, Left, Header, Title, Right,Container } from "native-base";
import { Actions } from "react-native-router-flux";
import * as theme from '../assets/theme'

const dimen = Dimensions.get('window');

class PickupAndReturn extends Component {
    constructor(props){
        super(props)
        this.state = {
            address:'my address',
            firstAddress:false
        }

    }

    render() {
        return (
            <Modal visible={this.props.display} animationType = "slide" transparent={true}
                    onRequestClose={ () => {this.props.onDisplayChanged(false)} }>
                <Container>
                    <Header style={{backgroundColor: '#231f20'}}>
                        <Left>
                            <Button transparent  onPress={ () => {this.props.onDisplayChanged(false)} }>
                                <Icon style={{color:'white',padding:10,fontSize:30}} name="close"></Icon>
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{color:'white',fontSize:16}}>Pickup and Return</Title>
                        </Body>
                        <Right>
                            
                        </Right>
                    </Header>

                <Content style={styles.container}>
                    <Grid>
                        <Row style={styles.titleContainer} >
                            <Text style={styles.titleText}>Car Location</Text>
                        </Row>
                        <Row>
                            <Content>
                                <ListItem style={{flex:1}}>
                                    <CheckBox checked={this.state.firstAddress} color="green" onPress={ () => { this.setState({firstAddress:true}) } }/>
                                        <Body>
                                            <Text style={{paddingStart:10}}>Kocaeli Merkez mah. ecenaz sok. no 1</Text>
                                        </Body>
                                </ListItem>
                            </Content>
                        </Row>
                        <Row style={styles.titleContainer} >
                            <Text style={styles.titleText}>Airport</Text>
                        </Row>
                        <Row>
                            <Content>
                                <ListItem style={{flex:1}}>
                                    <CheckBox checked={this.state.firstAddress} color="green" onPress={ () => { this.setState({firstAddress:true}); Actions.refresh({address:'Riyadh'})} }/>
                                        <Body>
                                            <Text style={{paddingStart:10}}>Sabiha Gökçen airport</Text>
                                        </Body>
                                </ListItem>
                            </Content>
                        </Row>

                        <Row style={styles.titleContainer} >
                            <Text style={styles.titleText}>Delivery</Text>
                        </Row>
                        <Row>
                            <Content style={{paddingStart:32,flexDirection:'column'}}>
                                <View style={{flex:4,flexDirection:'column'}}>
                                    <Button transparent>
                                        <Text>Enter a delivery address.</Text>
                                    </Button>
                                </View>
                                <View style={{flex:1,flexDirection:'column'}}>
                                    <Text>50 SAR</Text>
                                    <Text>Free</Text>
                                </View>
                            </Content>
                        </Row>

                    </Grid>


                </Content>

                </Container>
                <View style={styles.checkoutContainer}>
                    <Button style={styles.checkoutBtn} onpress={() => (Actions.pop() )}>
                        <Text style={styles.checkoutText}>SAVE</Text>
                    </Button>
                </View>
            </Modal>
        );
    }
}
export default PickupAndReturn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        width:'100%',

    },
    navigationBar:{
        marginTop: ( Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS &&
        ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896)) ) ? 
        ( 44 ) : StatusBar.currentHeight,
        backgroundColor: '#231f20',
        height: 44
    },
    titleContainer: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        paddingTop:20
    },
    titleText:{
        padding:10,
        fontSize:12,
        fontWeight:'700'
    },
    checkoutContainer: {
        flexDirection: "row",
        flex: 1, 
        justifyContent:'flex-end',
        position: "absolute", 
        bottom: 60, 
        left: 0, 
        right: 0, 
        height: 45,
        backgroundColor:'#ffffffcf'
    },
    checkoutBtn: {
        margin:15,
        borderWidth: 1,
        borderRadius: 5,
        borderColor:theme.COLORS.Secondary,
        backgroundColor: theme.COLORS.Secondary
    },
    checkoutText: {
        justifyContent: 'center', 
        textAlign:'center',
        color:'white',
        width: '100%',
        fontSize:22,
        fontWeight: '700'
    },
});