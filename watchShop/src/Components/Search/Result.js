import React, {Component} from 'react';
import {View, Text, StyleSheet, ImageBackground, Dimensions, TextInput, TouchableOpacity, Image,ScrollView } from 'react-native';
import {} from 'react-native-gesture-handler';
import HeaderShop from './HeaderShop';
import ProductList from '../ProductList/ProductList'
const {width, Iheight} = Dimensions.get('window');
const height = width * 0.3;
const images = [
    '../../assets/image/home1.jpg',
    '../../assets/image/home2.jpg'
] 
const imageWidth = width*0.8;
const imageHeight = height*0.5;
export default class Login extends Component{
    constructor(props) {
        super(props);
        // this.state = {
        //     username: 'user@gmail.com',
        //     password: '111111',
        //     icon: 'eye-slash',
        //     isShow: true, 
        // };
    };
    render() {
        return(
            <View style={styles.mainContainer}>
                <View style={styles.container}>
                    <HeaderShop navigation={this.props.navigation}></HeaderShop>                        
                </View> 
                <View style={{height:height*1.4, margin:"-3%"}}>
                    <Swiper loop showsPagination={true} width={imageWidth} height={height} >
                        <View  style={styles.imageFrame}>
                            <Image source = {require('../../assets/image/home1.jpg')} style={styles.imageBackground} ></Image>
                        </View>
                        <View style={styles.imageFrame}>
                            <Image source = {require('../../assets/image/home2.jpg')} style={styles.imageBackground} ></Image>
                        </View>
                        <View style={styles.imageFrame}>
                            <Image source = {require('../../assets/image/home3.5.jpg')} style={styles.imageBackground} ></Image>
                        </View>
                        <View style={styles.imageFrame}>
                            <Image source = {require('../../assets/image/home4.jpg')} style={styles.imageBackground} ></Image>
                        </View>
                    </Swiper>
                </View>
                <View style={styles.product}>
                    <Text style={styles.textInput}>PRODUCT LIST</Text>
                    <ProductList navigation={this.props.navigation}></ProductList>
                </View>
                
            </View>
            
                  

        )
    }
}



const styles = StyleSheet.create({
    mainContainer: {
        height: height,
        flex:1,
        flexDirection: 'column',
        elevation:1,
        backgroundColor: '#DEE7EA',
        alignItems: 'center',
        shadowColor: '#2E272B',

    },
    container: {
        width: '100%',
        height: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        //flex: 1,
        flexDirection: "column",
        backgroundColor:'white', 
        elevation: 10,
    },
    imageBackground: {     
        width: imageWidth*0.8,   
        height: height,
        resizeMode: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:8,
        //margin: 'auto', 
    },
    space:{
        height:"100%",
        width: width - width/1.0025,
        backgroundColor: "grey",
    },
    imageHead: {
        width: width/2.005,   
        height: "100%",
        resizeMode: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageFrame: {
        flex:1, 
        justifyContent:'center',
        alignItems: 'center',
        borderRadius:8,
        marginLeft: 30,
        marginRight:30,
    },
    product: {
        flex:1,
        backgroundColor: '#F6FBFB',
        
    },
    textInput: {
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: '3%',
        marginBottom: '3%',
        marginLeft: '3%',
        fontStyle: 'italic',
    },
});