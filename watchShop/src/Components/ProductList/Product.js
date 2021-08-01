import React, {Component} from 'react';
import HeaderShop from '../Main/HeaderShop';
import {View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, TextInput} from 'react-native';
import Swiper from 'react-native-swiper';
import AsyncStorage from "@react-native-async-storage/async-storage"
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {connect} from "react-redux";

const {width} = Dimensions.get('window');
const height = width * 0.5;

const productWidth = width-20;
const productHeight = width / 2 -15;


class Product extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data:{},
            qty: 1,
            cartCount : 0,
        };   
    };
    setCartCount = async() => {
        var count = await AsyncStorage.getItem("cartCount");
        this.setState({cartCount: count})
      }
    fetchData = async () => {
        const id = this.props.route.params.id;
        const response = await fetch("https://shopwatchdut.herokuapp.com/api/product/"+id)
        const json = await response.json()
        this.setState({data: json.data});
        this.setCartCount()
    }
    componentDidMount() {
        this.fetchData();
    }
    changeText = (text) => {
        this.setState({qty: text});
    };
    Click = () => {
        this.props.navigation.navigate("Cart");
    };
    gotoCheckout = () => {
        this.props.navigation.navigate("Checkout");
    }
    plusQty = () => {
        this.setState({
            qty: this.state.qty+1
        });
    };
    subQty = () => {
        if (this.state.qty !=1)
        this.setState({
            qty: this.state.qty-1
        });
    };
    addToCart = async () => {
        console.log(this.state.qty)        
        var TEMP_TOKEN = await AsyncStorage.getItem("id_token");
        const id_watch = this.props.route.params.id;
        const json = {
                "id_user": 1,
                "id_watch": id_watch,
                "quantity": this.state.qty
        }
        fetch("https://shopwatchdut.herokuapp.com/api/cart/", {
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + TEMP_TOKEN
              },
            body: JSON.stringify(json)
        }).then((response) => response.json())
        .then((responseData) => {
            console.log(responseData);
            
        }).catch((error) => {
            console.log("Error"+TEMP_TOKEN);
        });
        this.props.dispatch({type: "INCREASE", id: id_watch});
    };
    
    render(){
        console.log(this.state.data)
        return(
            <View style={styles.mainContainer}>
                <View style={styles.container}>
                        <HeaderShop navigation={this.props.navigation}></HeaderShop>                        
                </View> 
                <ScrollView style={styles.scroll}>
                <View style={styles.headerImage}>
                        <Swiper loop showsButtons showsPagination={false} width={width/1.2} height={height} >
                            <View>
                                <Image source={require('../../assets/productImage/watch1.jpg')} style={styles.productImg} ></Image>
                            </View>
                            <View>
                                <Image source = {require('../../assets/productImage/watch1.1.jpg')} style={styles.productImg} ></Image>
                            </View>
                        </Swiper>                
                    </View>

                    <View style={styles.productInfo}>
                        <Text>{this.state.data.name}</Text>
                        <Text>{this.state.data.price}</Text>
                        <Text>{this.state.data.size}</Text>
                        <View style={{ flexDirection: 'row', alignItems:"center"}}>
                            <Text>Quantity:</Text>
                            <TouchableOpacity onPress={() => this.subQty()}>
                                <FontAwesome5 
                                                name="minus-square"
                                                color="#05375a"
                                                size={25}
                                                height= '100%'
                                                position= 'absolute'
                                                alignItems= 'center'
                                                justifyContent= 'center'
                                ></FontAwesome5>
                            </TouchableOpacity>
                            <View style={styles.qty}>                                                      
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{height:50, color:"black"}}
                                    onChangeText={this.changeText}
                                    defaultValue={this.state.qty}
                                    defaultValue={this.state.qty+""}
                                    keyboardType="numeric"
                                />
                            </View>
                                
                            <TouchableOpacity onPress={() => this.plusQty()}>
                                <FontAwesome5 
                                                name="plus-square"
                                                color="#05375a"
                                                size={25}
                                                height= '100%'
                                                position= 'absolute'
                                                alignItems= 'center'
                                                justifyContent= 'center'
                                ></FontAwesome5>
                            </TouchableOpacity>
                               
                                 
                        </View>
                    <View>
                        <Text>Product information:</Text>
                       
                    </View>
                        
                </View>
                </ScrollView>
                {/* <FlatList keyExtractor = {(item) => item.id}
                    data={this.state.data}
                    renderItem = {({item}) =>(
                        <View>
                            
                        </View>
                    )}
                    />  */}         
                <View style={{flex:-1, justifyContent: 'flex-end'}}>
                    <View style={styles.btnFrame}>
                        <TouchableOpacity style={styles.mycart} onPress={this.Click}>
                            <View>
                            <FontAwesome 
                                name="shopping-cart" size={24} color="white" style={{marginRight:7}}
                            ></FontAwesome>
                            {this.props.cartCount > 0 ? (
                                <View
                                    style={{     
                                    position: 'absolute',
                                    backgroundColor: 'red',
                                    width: 18,
                                    height: 18,
                                    borderRadius: 17 / 2,
                                    right: -1,
                                    top: -7,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    }}>
                                    <Text
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: "#FFFFFF",
                                        fontSize: 9,
                                    }}>
                                    {this.props.cartCount}
                                    </Text>
                                </View>
                            ) : null}
                            </View>
                            
                            <Text style={styles.Text}>MY CART</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buyBtn} onPress={this.gotoCheckout} >
                                        <Text style={styles.Text}>BUY NOW</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cartBtn} onPress={this.addToCart}>
                                        <Text style={styles.Text}>ADD TO CART</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
            
    
        
    )
    }    
}
function mapStateToProp(state) {
    return {cartCount: state.cartCount}
    
}
export default connect(mapStateToProp)(Product)

const styles = StyleSheet.create({
    mainContainer: {
        height: height,
        flex:1,
        flexDirection: 'column',
        //elevation:1,
        backgroundColor: '#DEE7EA',
        alignItems: 'center',
        shadowColor: '#2E272B',

    },
    scroll: {
        flex:1, 
        height: "100%",
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
    productImg: {
        resizeMode: 'center',
        width: width/1.2,
        height: height,
        
    },
    text: {
        marginTop: '10%'
    },
    headerImage: {
        marginTop: '3%',
        width: width/1.1,
        height: height+10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'white',
        
    },
    btnFrame: {
        width:'100%',
        //height: '50%',
        //flex:1,
        flexDirection: 'row',
        borderColor: '#6D6A67',
        borderWidth: 0.6,
    }, 
    buyBtn: {
        width: '30%',
        backgroundColor: '#D88C3C',
        //borderRadius: 7,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        //marginLeft: '20%',

    },
    cartBtn: {
        width: '30%',
        backgroundColor: '#DA5A34',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mycart:{
        width: "40%",
        backgroundColor: '#4E974F',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
    },
    Text: {
        color: 'white',
    },
    productInfo: {
        flex:1,
        width: '90%',
    },
    inputText: {
        width: '15%',
        height: 25,
        color: 'black',
        
    },
    inputView: {
        //position: 'relative',
        alignSelf: 'auto',
        //justifyContent: 'center',
        width: '45%',
        backgroundColor: '#f5f5f5',
        height: 35,
        marginLeft: '2%',
        marginRight: '2%',
    },
    qty: {
        width: 30,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        height:30
    },
})