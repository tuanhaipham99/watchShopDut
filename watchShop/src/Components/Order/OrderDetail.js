import React, {Component} from 'react';
import {View, Text, StyleSheet, ImageBackground, Dimensions, TextInput, TouchableOpacity, FlatList, Image} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from "@react-native-async-storage/async-storage"
const {width} = Dimensions.get('window');
export default class OrderDetail extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [
            ],
            totalPrice:"",
        };
    }
    fetchData = async () => {
        const id = this.props.route.params.id;
        const response = await fetch("https://shopwatchdut.herokuapp.com/api/order/"+id)
        .catch((error) => {
            console.log("Error",error);
        })
        const json = await response.json()
        this.setState({data: json.data});
        
    }
    getTotalPrice = async () => {
        var ID = await AsyncStorage.getItem("id_user");
        const id = this.props.route.params.id;
        var TEMP_TOKEN = await AsyncStorage.getItem("id_token");
        fetch(`https://shopwatchdut.herokuapp.com/api/order/${id}/price`, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + TEMP_TOKEN
            },
        }
        ).then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                this.setState({ totalPrice: responseData.data });
            }).catch((error) => {
                console.log("Error"+error);
            });
    }
    componentDidMount() {
        this.fetchData();
        this.getTotalPrice();
    }

    render(){
        
        console.log(this.state.data)
        return(
            <View style={styles.mainContainer}>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.bars} onPress={() => {openDrawer(this.props.navigation)}}>
                        <FontAwesome5 style={styles.iconbars} name={'bars'}/>
                    </TouchableOpacity>
                    <Image source={require('../../assets/image/watchshop_logodesigns_final.jpg')} style={styles.imageBackground}>

                    </Image>
                </View> 
                <View style={styles.headerCart}>
                    <View style={{flexDirection:"row"}}>
                        <View style={{width:'90%'}}>
                            <Text>ORDER DETAIL</Text>
                        </View>                 
                    </View>    
                </View>
                <View style={styles.wrapper}>
                    <View style={{flex:1}}>
                        <FlatList
                            flex={1}
                            keyExtractor = {(item) => item.id}
                            data={this.state.data}
                            renderItem = {({item}) => ( 
                                    <View style={{}}>
                                        <View style={styles.frameImage}>
                                            <Image source={{uri:item.itemOrder.image}} style={styles.productImg}></Image>
                                            <View style={styles.Info}>
                                                <Text style={styles.text}> {item.itemOrder.name}</Text>
                                                <View style={{ flexDirection: 'row',marginLeft:"3%"}}>
                                                    <Text>Price: </Text>
                                                    <Text>{item.itemOrder.price} </Text>
                                                </View>
                                                <View style={{ flexDirection: 'row',marginLeft:"3%"}}>
                                                    <Text>Quantity: </Text>
                                                    <Text>{item.quantity}</Text>
                                                </View>                                                                                            
                                            </View> 
                                        </View>
                                   </View>
                      )}
                        
                    />
                     <View style={styles.btnFrame}> 
                            <Text style={styles.buyBtn} >Total Price: </Text>
                            <Text style={{color:"red"}}>{this.state.totalPrice}$</Text>
                    </View>
                    </View>
                    
                </View>   
            </View>
            
        )

    }
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        maxHeight: 50,
    },
    mainContainer: {
        flex:1,
        flexDirection: 'column',
        elevation:1,
        alignItems: 'center',
        backgroundColor: '#DEE7EA',
    },
    imageBackground: {
        width: '30%',
        height: '60%',
        resizeMode: 'contain',
        flex: 8,
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '100%',
        marginLeft: -20,
    },
    alert: {
        flexDirection: 'row',
    },
    bars: {
        flex: 1,
        // marginRight: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        width: 30,
        height: 30,
    },
    iconbars: {
        color: 'black',
        fontSize: 20,
    },
    headerCart:{
        width: '95%',
        height: '7%',
        backgroundColor: 'white',
        marginTop: '3%',
        borderRadius: 10,
        justifyContent: "center",
        alignItems:"center",
        shadowColor: '#2E272B',
        shadowOffset: {
            width: 2,
            height: 6
        },
        shadowOpacity: 1,
    },
    wrapper: {
        width: '95%',
        height: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: '3%',
        justifyContent: "center", 
    },
    frameImage: {
        flex:1,
        flexDirection:"row",
        backgroundColor: '#E5E9C8',
        width: "100%",
        height: "15%",
        shadowColor: '#2E272B',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.2,
        marginBottom:3,
       
    },
    productImg: {
        resizeMode: 'stretch',
        width: width/4,
        height: width/4,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        marginTop: "2%",
        marginLeft: "2%",
        borderColor: "grey",
        borderWidth: 0.5,
        marginBottom: "5%",
        
    },
    text: {
        fontWeight: 'bold',
        textTransform:"uppercase",
        width: "90%",
        marginLeft:"1%",
    },
    textQty: {
        marginRight:"10%"
    },
    Info: {
        marginTop: "2%",
    },
    qty: {
        width: 20,
        justifyContent:'center',
        alignItems:'center',

    },
    btnFrame: {
        width:'100%',
        flexDirection: 'row',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopWidth:0.3,
    }, 
    buyBtn: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

