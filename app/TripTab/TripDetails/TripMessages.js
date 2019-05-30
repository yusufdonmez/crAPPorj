import React, { Component } from "react";
import { 
    View,
    Dimensions,
    Text,
    StyleSheet
} from "react-native";
import { Thumbnail , Grid, Col, Row,Icon,Button,Content,Item,Input} from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Actions } from "react-native-router-flux";



const { width, height } = Dimensions.get('window');
const sms = "Hi Yusuf, \n\n bir sayfa içeriğinin okuyucunun dikkatini dağıttığı bilinen bir gerçektir. Lorem Ipsum kullanmanın amacı, sürekli 'buraya metin gelecek, buraya metin gelecek' yazmaya kıyasla daha dengeli bir harf dağılımı sağlayarak okunurluğu artırmasıdır. Şu anda birçok masaüstü yayıncılık paketi ve web sayfa düzenleyicisi, varsayılan mıgır metinler olarak Lorem Ipsum kullanmaktadır. \nBest,\nAli";
const dt= "May,30 17:15"
class TripMessages extends Component {
    render() {
        return (
            <Content>
                <Grid style={{padding:0, marginBottom:20,backgroundColor:'#FFF'}}>
                    <Row style={styles.msgRow}>
                        <Col style={styles.avatarCol}>
                            <Thumbnail source={{uri: 'https://carrental.harmonyict.com/CarRental/Image?imagePath=0eg8NLX4byRJutLylJo8GW2QbD%2Bx3znF&pfdrid_c=true'}} />
                        </Col>
                        <Col>
                            <Text style={[{borderWidth:1, borderColor:'green', padding:5},styles.textCol]}>{sms}</Text>
                            <Text style={styles.secondaryText}>{dt}</Text>
                        </Col>
                        <Col style={styles.avatarCol}></Col>
                    </Row>
        
                    <Row style={styles.msgRow}>
                        <Col style={styles.avatarCol}></Col>
                        <Col >
                        <Text style={styles.textCol}>{sms}</Text>
                        <Text style={styles.secondaryText}>{dt}</Text>
                        </Col>
                        <Col style={styles.avatarCol}>
                        <Thumbnail source={{uri: 'https://carrental.harmonyict.com/CarRental/Image?imagePath=0eg8NLX4byRJutLylJo8GW2QbD%2Bx3znF&pfdrid_c=true'}} />
                        </Col>
                    </Row>
        
                    <Row style={styles.msgRow}>
                        <Col style={styles.avatarCol}>
                        <Thumbnail source={{uri: 'https://carrental.harmonyict.com/CarRental/Image?imagePath=0eg8NLX4byRJutLylJo8GW2QbD%2Bx3znF&pfdrid_c=true'}} />
                        </Col>
                        <Col >
                        <Text style={styles.textCol}>{sms}</Text>
                        <Text style={styles.secondaryText}>{dt}</Text>
                        </Col>
                        <Col style={styles.avatarCol}></Col>
                    </Row>
                </Grid>
                <Item regular>
                    <Input placeholder='Message' />
                    <Icon name="md-send" />
                </Item>
          </Content>          
        );
    }
}
export default TripMessages;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    secondaryText:{fontSize:15,fontWeight:'400', color:'#999'},
    msgRow:{backgroundColor:'#fff',marginTop:20},
    avatarCol:{backgroundColor:'#fff',width:width/6,margin:5},
    textCol:{backgroundColor:'#fff',paddingTop:10,paddingLeft:5,paddingRight:5,paddingBottom:10,
    borderWidth:1,borderColor:'#aad3aa'},
});
