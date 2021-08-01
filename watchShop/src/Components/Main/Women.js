import React, {Component} from 'react';
import {View, Text, StyleSheet, ImageBackground, Dimensions, TextInput, TouchableOpacity, Image,ScrollView } from 'react-native';
import {} from 'react-native-gesture-handler';
import HeaderShop from './HeaderShop';
import ProductList from '../ProductList/ProductList'
const {width, Iheight} = Dimensions.get('window');
const height = width * 0.5;
const imageWidth = width;
const imageHeight = height*0.5;
export default class Women extends Component{
    constructor(props) {
        super(props);
        this.state = {
            
            
        };
    };
    render() {
        return(
            <View style={styles.mainContainer}>
                <View style={styles.container}>
                    <HeaderShop navigation={this.props.navigation}></HeaderShop>                        
                </View> 
                <View style={{flexDirection:"row", height:"10%"}}>
                        <Image source={require('../../assets/image/women1.jpg')} style={styles.imageHead}/>
                    <View style={styles.space}></View>
                </View>
                <View style={styles.product}>
                    <Text style={styles.textInput}>PRODUCT LIST</Text>
                    <ProductList navigation={this.props.navigation} category="women"></ProductList>
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
        
        width: imageWidth,   
        height: height,
        resizeMode: 'cover',
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
        width: width,   
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
        backgroundColor: '#EFECF2',
        
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