import React, { Component } from "react";
import {  Dimensions, Text, StyleSheet, FlatList} from "react-native";
import { Thumbnail ,  Col, Row, Content, Item, Input,Form,Textarea} from "native-base";

const { width, height } = Dimensions.get('window');

class TripMessages extends Component {
    constructor(props){
        super(props)
        this.state ={
            isLoading:true,
            noRecordsFound:true,
            messages : [],
            text:'',
        };
}

    getTripMessages(){
        console.log(global.appAddress + '/service/c1/json/PrivateService/getTripMessages/en_US?tripID='+ this.props.tripID )
        
        fetch(global.appAddress + '/service/c1/json/PrivateService/getTripMessages/en_US?tripID='+ this.props.tripID ,
        {
            credentials: 'include',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log('-trip-messages-Component Did Mount Data List: '+ responseJson);
            if( responseJson != undefined && responseJson.length != 0 ){
                console.log('<--- trip-messages service loaded from server --->');
                this.setState({isLoading:false,
                            messages: responseJson,
                            noRecordsFound:false});
            }
            else {
                this.setState({isLoading:false,noRecordsFound:true});
                console.log('trip-messages - no records found');
            }
        })
        .catch((error) => {
            console.error('trip-messages- '+error.message + '  at line 50');
        });
    }

    componentDidMount(){
        this.getTripMessages();
    }

    _renderItem = ({item}) => (
        <Row style={styles.msgRow}>        
            <Col style={styles.avatarCol}>
            { ( item.sender != global.userId) &&  <Thumbnail source={{uri: global.appAddress+'/Image?imagePath='+ item.Photo}} style={{width:50,height:50}} />}
            </Col>
            <Col>
                <Text style={[ item.sender == global.userId ? styles.blueBorder : styles.greenBorder ,styles.textCol]}>{item.Message}</Text>
                <Text style={styles.secondaryText}>{item.Date}</Text>
            </Col>
            <Col style={styles.avatarCol}>
            { ( item.sender == global.userId) &&  <Thumbnail source={{uri: global.appAddress+'/Image?imagePath='+ item.Photo}}  style={{width:50,height:50}}  />}
            </Col>
        </Row>    
        )
    render() {
        return (
        <Content>
            <FlatList 
                data={this.state.messages}
                renderItem={this._renderItem}
                keyExtractor={(item) => item.id.toString()} //tostring fro warning cell type err
            />
            <Form>
                <Textarea rowSpan={5} 
                bordered 
                placeholder="Textarea" 
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
                onSubmitEditing={(text)=> alert(this.state.text)}
                />
            </Form>
        </Content>         
        );
    }
}
export default TripMessages;

const styles = StyleSheet.create({
    secondaryText:{fontSize:15,fontWeight:'400', color:'#999'},
    msgRow:{backgroundColor:'#fff',marginTop:20},
    avatarCol:{backgroundColor:'#fff',width:width/6,margin:5},
    textCol:{backgroundColor:'#fff',paddingTop:10,paddingLeft:5,paddingRight:5,paddingBottom:10,
    borderWidth:1},
    greenBorder:{borderColor:'#88dd88'},
    blueBorder:{borderColor:'#8888dd'},
});
