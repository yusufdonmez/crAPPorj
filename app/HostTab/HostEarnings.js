import React, { Component } from "react";
import { 
    StyleSheet,
    Text, 
    View, 
    SafeAreaView,
} from "react-native";

import {Container,Content,List,ListItem} from "native-base";
import * as theme from '../assets/theme';

class HostEarnings extends Component {
    constructor(props){
        super(props)
        this.state ={
            isLoading:true,
            earnings : []
        };
    }

    getHostEarnings(){
        console.log(global.appAddress + '/service/c1/json/PrivateService/getUserEarnings/en_US?userID='+ (global.userId) +'&userSecStamp='+encodeURIComponent(global.userSecStamp))
        
        fetch(global.appAddress + '/service/c1/json/PrivateService/getUserEarnings/en_US?userID='+ (global.userId) +'&userSecStamp='+encodeURIComponent(global.userSecStamp),
        {
            credentials: 'include',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log('-earnings-Component Did Mount Data List: '+ responseJson);
            if( responseJson != undefined && responseJson.length != 0 ){
                console.log('<--- earnings service loaded from server --->');
                this.setState({isLoading:false,
                            earnings: responseJson});
            }
            else {
                this.setState({isLoading:false,noRecordsFound:true});
            }
        })
        .catch((error) => {
            console.error('-earnings- '+error.message + '  at line 41');
        });
    }

    componentDidMount(){
        this.getHostEarnings();
    }

    render() {
        return (
            <SafeAreaView style={{flex:1,backgroundColor: theme.COLORS.Primary}}>
                <Container>
                    <Content> 
                        <View style={{flex:1,flexDirection: 'row',justifyContent: 'space-between',marginTop:10}}>
                            <Text  style={[styles.listColumn,{fontWeight:"bold"}]}>PaymentType</Text>
                            <Text style={[styles.listColumn,{fontWeight:"bold"}]}>Date</Text>
                            <Text style={[styles.listColumn,{fontWeight:"bold"}]}>PaymentAmount</Text>
                        </View> 
                        <List dataArray={this.state.earnings} renderRow={item => 
                            <ListItem key={item.id} >
                                <View  style={{flex:1,flexDirection: 'row',justifyContent: 'space-between'}}>
                                    <Text style={styles.listColumn}>{item.PaymentType}</Text>
                                    <Text style={styles.listColumn}>{item.Date}</Text>
                                    <Text style={styles.listColumn}>{item.Amount}SAR</Text>
                                </View>
                            </ListItem>
                        }/>
                    </Content>
                </Container>
            </SafeAreaView>
        );
    }
}
export default HostEarnings;

const styles = StyleSheet.create({
    listColumn:{
        flex:1,
        textAlign: "center",
    }
});