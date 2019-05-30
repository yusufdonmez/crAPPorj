import React, { Component } from "react";
import { 
    View,
    Dimensions,
    Text,
    StyleSheet
} from "react-native";
import { Thumbnail , Grid, Col, Row,Icon,Button} from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Actions } from "react-native-router-flux";
const { width, height } = Dimensions.get('window');

class TripUserInfo extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <Grid>
                <Col style={{padding:5}}>
                    <Row style={{  justifyContent:"center",alignItems:'center',backgroundColor:'#fff'}}> 
                        <Thumbnail source={{uri: global.appAddress+'/Image?imagePath='+ this.props.photo}} style={styles.roundedImage} />
                    </Row>
        
                    <Row style={{ justifyContent:"center",alignItems:'center',height:'auto',backgroundColor:'#fff'}}> 
                        <Text style={styles.headerText}>{this.props.userName}</Text>
                    </Row>
                    <Row style={{ justifyContent:"center",alignItems:'center',height:'auto',backgroundColor:'#fff'}}> 
                        <Text style={styles.secondaryText}>{this.props.joinDate}</Text>
                    </Row>
                    <Row style={{justifyContent:"center",alignItems:'center'}}> 
                        <Icon name="check-circle" type="FontAwesome" style={{color:'#59d389',marginRight:10}}/>
                        <Text style={{fontSize:18}}>Approved to drive</Text>
                    </Row>
                    <Button block success style={{marginBottom:10}} onPress={() => {alert('not yet')}}>
                        <Text style={styles.successText}>Send message</Text>
                    </Button>
                    <Button block bordered dark  onPress={() => {alert('not yet')}}> 
                        <Text style={{fontSize:18}}>{this.props.mobile}</Text>
                    </Button>
                    <Row  style={{justifyContent:"center",backgroundColor:'#fff'}}>
                        <TouchableOpacity onPress={() => { Actions.Profile();}}>
                            <Text style={styles.linkText}>View {this.props.userName} profile</Text>
                        </TouchableOpacity>
                    </Row>                
                </Col>              
            </Grid>
        );
    }
}
export default TripUserInfo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    secondaryText:{fontSize:15,fontWeight:'400', color:'#999'},
    headerText:{fontSize:25,fontWeight:'600'},
    linkText:{fontSize:18, color:'#59d389', marginTop:40},
    successText:{color:'#fff',fontSize:18},
    farRow:{ justifyContent:"center", marginTop:20, marginBottom:20},
    roundedImage:{borderWidth:2,borderColor:'#59d389',borderRadius:60, width:120,height:120},
});