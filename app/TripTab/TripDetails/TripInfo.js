import React, { Component } from "react";
import { View, Text, StyleSheet,Dimensions} from "react-native";
import {  Content,Grid,Row,Icon} from 'native-base';

const {width,height} = Dimensions.get('window')

class TripInfo extends Component {
    constructor(props){
        super(props)
        this.state ={
            isLoading:true,
            noRecordsFound:true,
            tripInfo : []
        };
}

    getTripInfo(){
        console.log(global.appAddress + '/service/c1/json/PrivateService/getTripInfo/en_US?tripID='+ this.props.tripID )
        
        fetch(global.appAddress + '/service/c1/json/PrivateService/getTripInfo/en_US?tripID='+ this.props.tripID ,
        {
            credentials: 'include',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log('-trip-Component Did Mount Data List: '+ responseJson);
            if( responseJson != undefined && responseJson.length != 0 ){
                console.log('<--- trip service loaded from server --->');
                this.setState({isLoading:false,
                            tripInfo: responseJson,
                            noRecordsFound:false});

            }
            else {
                this.setState({isLoading:false,noRecordsFound:true});
                console.log('tripInfo - no records found');
            }
        })
        .catch((error) => {
            console.error('-trip- '+error.message + '  at line 49');
        });
    }

    componentDidMount(){
        this.getTripInfo();
    }

    render() {
        const data = this.state.tripInfo;        
        return (
        <Content>
            <Grid style={{paddingHorizontal:10}}>
                <Row style={[styles.infoRow,{justifyContent: 'center',paddingVertical:30}]}>
                    <View style={{}}>                
                        <Text numberOfLines={2} style={styles.dateText}>{data.FromDate}</Text>
                    </View>
                    <View style={{}}>
                        <Icon name="arrow-right" type="Entypo" />
                    </View>
                    <View style={{}}>                
                        <Text numberOfLines={2} style={styles.dateText}>{data.ToDate}</Text>
                    </View>
                </Row>
                <Row style={styles.infoRow}>
                    <View style={styles.title}><Text style={styles.titleText}>{data.City},{data.District}</Text></View>
                    <Icon name="location-on" type="MaterialIcons" style={{color:'#aaa',alignSelf:'center'}} />                    
                </Row>
                <Row style={styles.infoRow}>
                    <View style={styles.title}><Text style={styles.titleText}>Km included</Text></View>
                    <View style={styles.value}><Text style={styles.valueText}>{data.KmLimitDay} km</Text></View>
                </Row>
                <Row style={styles.infoRow}>
                    <View style={styles.title}><Text style={styles.titleText}>Total cost</Text></View>
                    <View style={styles.value}><Text style={styles.valueText}>{data.GrandTotal}SAR</Text></View>
                </Row>
                <Row style={styles.infoRow}>
                    <View style={styles.title}><Text style={styles.titleText}>Protection</Text></View>
                    <View style={styles.value}><Text style={[styles.valueText,{textTransform: 'capitalize'}]}>{data.Protection}</Text></View>
                </Row>
                <Row style={styles.infoRow}>
                    <View style={styles.title}><Text numberOfLines={1} ellipsizeMode="tail" style={styles.titleText}>{data.Name}'s {data.Make}</Text></View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.valueText}>{data.LicensePlateNumber}</Text>
                        <Icon name="chevron-right" type="MaterialIcons" style={styles.valueText}/>
                    </View>
                </Row>
                <Row style={styles.infoRow}>
                    <View style={styles.title}><Text style={styles.titleText}>Status</Text></View>
                    <View style={styles.value}><Text style={[styles.valueText,{textTransform: 'capitalize'}]}>{data.Status}</Text></View>
                </Row>
                <Row style={styles.infoRow}>
                    <View style={styles.title}><Text style={styles.titleText}>Reservation ID</Text></View>
                    <View style={styles.value}><Text style={styles.valueText}>#{this.props.tripID}</Text></View>
                </Row>
            </Grid>
        </Content>
        );
    }
}
export default TripInfo;

const styles = StyleSheet.create({
    infoRow:{
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 'auto',
        paddingVertical:15,
        borderBottomWidth:1,
        borderBottomColor:'#aaa',
    },
    title:{
        maxWidth: 0.7*width,
    },
    value:{
    },
    dateText:{
        fontFamily: 'FontAwesome',
        fontSize:24,
        fontWeight: 'bold',
        color:'#000',
        width: 0.4 * width,
        textAlign: 'center'
        
    },
    titleText:{
        fontFamily: 'FontAwesome',
        fontSize:18,
        fontWeight: '400',
        color:'#000',
    },
    valueText:{
        fontFamily: 'FontAwesome',
        fontSize:18,
        fontWeight: '400',
        color:'#aaa',
    }
});