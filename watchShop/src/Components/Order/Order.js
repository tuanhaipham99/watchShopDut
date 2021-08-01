import React, {Component} from 'react';
import {View, Text, StyleSheet, ImageBackground, Dimensions, TextInput, TouchableOpacity, FlatList, Image} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from "@react-native-async-storage/async-storage"
const {width} = Dimensions.get('window');

export default class Order extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            data: [
                // {id: 1, name: 'Đồng hồ thụy sĩ',image: require('../../assets/productImage/watch1.jpg')},
                // {id: 2, name: 'Đồng hồ Đức', image: require('../../assets/productImage/watch2.jpg')},
            ],
        };
    }
    fetchData = async () => {

        var TEMP_TOKEN = await AsyncStorage.getItem("id_token");
        fetch("https://shopwatchdut.herokuapp.com/api/order/user/1", {
            method:"GET",
            headers: {
                'Authorization': 'Bearer ' + TEMP_TOKEN
              },
        }
        ).then((response) => response.json())
        .then((responseData) => {
            console.log(responseData);
            this.setState({data: responseData.data});
        }).catch((error) => {
            console.log("Error");
        });
        
    }
    componentDidMount() {
        this.fetchData();
    }
    gotoDetail = (idOrder) => {
        this.props.navigation.navigate("OrderDetail", {id: idOrder});
    }
    render(){
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
                    <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                        <View style={{}}>
                            <Text>My orders</Text>
                        </View>                                        
                    </View>    
                </View>
                <View style={styles.wrapper}>
                    <View style={{flex:1}}>
                        <FlatList
                            keyExtractor = {(item) => item.id}
                            data={this.state.data}
                            renderItem = {({item}) => ( 
                                    <View style={{flexDirection:"row", marginTop:"1.5%"}}>
                                        <View style={{}}>
                                            <Image source={require('../../assets/image/cart.jpg')} style={styles.productImg}></Image>
                                        </View>
                                        
                                        <View style={styles.Info}>  
                                            <View style={{flex:1}}>
                                                <View style={{flexDirection:"row"}}>
                                                    <Text>Receiver: </Text>
                                                    <Text>{item.receiver}</Text>
                                                </View> 
                                                <View style={{flexDirection:"row"}}>
                                                    <Text>Destination:</Text>
                                                    <Text>{item.address}</Text>
                                                </View>
                                                <View style={{flexDirection:"row"}}>
                                                    <Text>Note:</Text>
                                                    <Text>{item.note}</Text>
                                                </View>  
                                                <View style={{flexDirection:"row"}}>
                                                    <Text>Total price:</Text>
                                                    <Text></Text>
                                                </View>     
                                            </View>
                                            
                                            <View style={styles.btnFrame}>
                                                <TouchableOpacity style={styles.buyBtn} onPress={() => this.gotoDetail(item.id)}>
                                                    <Text style={styles.Text}>SHOW DETAIL</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View> 
                                   </View>
                      )}
                        
                        />
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
        elevation: 8,
        maxHeight: 50,
    },
    mainContainer: {
        flex:1,
        flexDirection: 'column',
        elevation:1,
        alignItems: 'center',
        backgroundColor: '#DEE7EA',
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
        width: '100%',
        height: '7%',
        backgroundColor: 'white',
        //marginTop: '3%',
        //borderRadius: 10,
        justifyContent: "center",
        alignContent:"center",
        shadowColor: '#2E272B',
        //flexDirection: 'row',
        shadowOffset: {
            width: 2,
            height: 6
        },
        shadowOpacity: 1,
    },
    productImg: {
        resizeMode: 'stretch',
        width: width/4,
        height: width/4,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        //marginTop: "2%",
        marginLeft: "2%",
        borderColor: "grey",
        borderWidth: 0.5,
        marginBottom: "5%",   
    },
    Info:{
        //marginBottom: "5%",
        flex:1,
        height: width/4,
        borderColor: "grey",
        borderWidth: 0.5,
        justifyContent: "flex-end", 
    },
        
    btnFrame: {
        width:"100%",
        
        //marginTop:10,
    }, 
    buyBtn: {
        width: '100%',
        backgroundColor: '#DA5A34',
        //borderRadius: 7,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
})