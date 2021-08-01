import React, {Component} from 'react';
import {View, Text, StyleSheet, ImageBackground, Dimensions, TextInput, TouchableOpacity, FlatList, Image} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from "@react-native-async-storage/async-storage"
import {connect} from "react-redux";

const {width} = Dimensions.get('window');
const infWidth = ((width-0.05*width)*0.98-width/4)*0.95;
class Cart extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [
                // {id: 2, name: 'Đồng hồ Đức', qty: 1,image: require('../../assets/productImage/watch2.jpg')},
                // {id: 3, name: 'Đồng hồ 3', qty: 1,image: require('../../assets/productImage/watch3.jpg')},
                // {id: 4, name: 'Đồng hồ 3', qty: 1,image: require('../../assets/productImage/watch3.jpg')},
            ],
            TEMP_TOKEN: "",
            cartCount: 0,
        };
    }
    fetchData = async () => {
        var TOKEN = await AsyncStorage.getItem("id_token");
        this.state.cartCount = await AsyncStorage.getItem("cartCount");
        this.setState({TEMP_TOKEN: TOKEN})
        fetch("https://shopwatchdut.herokuapp.com/api/cart/1", {
            method:"GET",
            headers: {
                'Authorization': 'Bearer ' + this.state.TEMP_TOKEN
              },
        }
        ).then((response) => response.json())
        .then((responseData) => {
            this.setState({data: responseData.data});
            // console.log("cart:"+ this.state.data)
        }).catch((error) => {
            console.log("Error cart");
        });
        
    }
    componentDidMount() {
        this.fetchData();
    }
    // componentDidUpdate() {
    //     this.fetchData();
    // }
    setToken = async (item, selectedValue) => {
        try {
            await AsyncStorage.setItem(item, selectedValue);
          } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
          }
    }
    gotoCheckout = () => {
        this.props.navigation.navigate("Checkout");
    }
    
    deleteItemById = id => {
        const filteredData = this.state.data.filter(item => item.id !== id);
        this.setState({ data: filteredData });
        const item = this.state.data.find(item =>item.id === id)
        const idDel = item.itemCart.id
        fetch("https://shopwatchdut.herokuapp.com/api/cart/"+id, {
            method:"DELETE",
            headers: {
                'Authorization': 'Bearer ' + this.state.TEMP_TOKEN,
                'Content-Type': 'application/json',
              },
        }
        ).then((response) => response.json())
        .then((responseData) => {
            console.log(responseData);
        }).catch((error) => {
            console.log("Error plus");
        }); 
        
        this.props.dispatch({type:"DECREASE", id: idDel})
      }
    plusQty = (idItem) => {
        const items = this.state.data;
        const item = items.find(item => item.itemCart.id === idItem);
        item.quantity = item.quantity+1
        this.setState({
            data: items
        });
        const json = {
            "id_user": 1,
            "id_watch": idItem,
            "quantity": 1,
        }
        fetch("https://shopwatchdut.herokuapp.com/api/cart/", {
            method:"POST",
            headers: {
                'Authorization': 'Bearer ' + this.state.TEMP_TOKEN,
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(json)
        }
        ).then((response) => response.json())
        .then((responseData) => {
            console.log(responseData);
        }).catch((error) => {
            console.log("Error plus");
        });
        console.log(json)
       
    };
    subQty = (idItem) => {
        const items = this.state.data;
        const item = items.find(item => item.itemCart.id === idItem);
        if (item.quantity >1) item.quantity=item.quantity-1;
        this.setState({
            data: items
        });
        const json = {
            "id_user": 1,
            "id_watch": idItem,
            "quantity": -1,
        }

        fetch("https://shopwatchdut.herokuapp.com/api/cart/", {
            method:"POST",
            headers: {
                'Authorization': 'Bearer ' + this.state.TEMP_TOKEN,
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(json)
        }
        ).then((response) => response.json())
        .then((responseData) => {
            console.log(responseData);
        }).catch((error) => {
            console.log("Error sub");
        });
        
    };
    render(){
        // console.log(this.state.data.length)

        return(
            <View style={styles.mainContainer}>
                <View style={styles.container}>
                    <Image source={require('../../assets/image/watchshop_logodesigns_final.jpg')} style={styles.imageBackground}>
                    </Image>
                    <TouchableOpacity style={styles.bars}>
                        <SimpleLineIcons name="logout" style={styles.iconbars}></SimpleLineIcons>
                        <Text>Log-out</Text>
                    </TouchableOpacity>
                </View> 
                <View style={styles.headerCart}>
                    <View style={{flexDirection:"row"}}>
                        <View style={{width:'90%'}}>
                            <Text>MY CART</Text>
                        </View>                 
                        <TouchableOpacity >
                            <FontAwesome5 
                                name={'trash'}
                                style={styles.trash}
                                size={20}
                            ></FontAwesome5>
                        </TouchableOpacity>
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
                                            <Image source={{uri:item.itemCart.image}} style={styles.productImg}></Image>
                                            <View style={styles.Info}>
                                                <View>
                                                    <TouchableOpacity style={{flex:1,flexDirection:"row", height:"17%", width:infWidth,
                                                    justifyContent:"flex-end"}} onPress={() => this.deleteItemById(item.id)}>
                                                        <AntDesign 
                                                            name={'closesquareo'}
                                                            size={18}>
                                                        </AntDesign>
                                                    </TouchableOpacity>
                                                </View>
                                                <Text style={styles.text}> {item.itemCart.name}</Text>
                                                {/* <Text style={styles.text}> {item.name}</Text> */}
                                                <View style={{ flexDirection: 'row',}}>
                                                    <Text>Price:</Text>
                                                    <Text>{item.itemCart.price} </Text>
                                                </View>
                                                <View style={{flexDirection: "row"}}>
                                                    <Text style={styles.textQty}>Quantity:</Text>
                                                    <View style={{ flexDirection: 'row',}}>
                                                        <TouchableOpacity onPress={() => this.subQty(item.itemCart.id)}>
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
                                                            <Text>{item.quantity}</Text>
                                                            {/* <Text>{item.qty}</Text> */}
                                                        </View>
                                                            
                                                        <TouchableOpacity onPress={() => this.plusQty(item.itemCart.id)}>
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
                                                </View>                                               
                                            </View> 
                                        </View>
                                   </View>
                      )}
                        
                    />
                    <View style={styles.btnFrame}>
                            <TouchableOpacity style={styles.buyBtn} onPress={this.gotoCheckout}>
                                        <Text style={styles.Text}>CHECK OUT</Text>
                            </TouchableOpacity>
                    </View>
                    </View>
                    
                </View>   
            </View>
            
        )

    }
}
export default connect()(Cart)

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
        marginLeft: "15%",
    },
    alert: {
        flexDirection: 'row',
    },
    bars: {
        
        // marginRight: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        width: "15%",
        height: "100%",
        marginTop:"2%"
    },
    iconbars: {
        color: 'black',
        fontSize: 22,
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
        //flexDirection: 'row',
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
        //alignItems: "center",
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
        borderWidth:1,
       
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
        //marginTop: "2%",
        fontWeight: 'bold',
        textTransform:"uppercase",
        width: "90%",
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
        //height: '50%',
        //flex:1,
        flexDirection: 'row',
        justifyContent: "flex-end",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    }, 
    buyBtn: {
        width: '30%',
        backgroundColor: '#DA5A34',
        //borderRadius: 7,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '70%',
        borderTopLeftRadius:10,
        borderBottomRightRadius:10,

    },
    Text: {
        color: 'white',
    },
})

