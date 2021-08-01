import React, {Component} from 'react';
import {View, Text, StyleSheet, ImageBackground, Dimensions, TextInput, TouchableOpacity, FlatList, Image} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const {width} = Dimensions.get('window');
export default class OrderDetail extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            data: [
                // {id: 1, name: 'Đồng hồ thụy sĩ',image: require('../../assets/productImage/watch1.jpg')},
                // {id: 2, name: 'Đồng hồ Đức', image: require('../../assets/productImage/watch2.jpg')},
                // {id: 3, name: 'Đồng hồ 3', image: require('../../assets/productImage/watch3.jpg')},
                // {id: 4, name: 'Đồng hồ 3', image: require('../../assets/productImage/watch3.jpg')},
            ],

        };
    }
    fetchData = async () => {
        const id = this.props.route.params.id;
        const response = await fetch("https://shopwatchdut.herokuapp.com/api/order/"+id)
        const json = await response.json()
        this.setState({data: json.data});
        
    }
    componentDidMount() {
        this.fetchData();
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
                                            <Image source={item.image} style={styles.productImg}></Image>
                                            <View style={styles.Info}>
                                                <Text style={styles.text}> {item.itemOrder.name}</Text>
                                                <View style={{ flexDirection: 'row',}}>
                                                    <Text>Price:</Text>
                                                    <Text>{item.itemOrder.price} </Text>
                                                </View>
                                                <View style={{ flexDirection: 'row',}}>
                                                    <Text>Quantity:</Text>
                                                    <Text>{item.quantity}</Text>
                                                </View>                                                                                            
                                            </View> 
                                        </View>
                                   </View>
                      )}
                        
                    />
                     <View style={styles.btnFrame}> 
                            <Text style={styles.buyBtn} >Total Price: </Text>
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
        //flexDirection: 'row',
        shadowOffset: {
            width: 2,
            height: 6
        },
        shadowOpacity: 1,
    },
    trash: {
        
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
        //height: '50%',
        //flex:1,
        flexDirection: 'row',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopWidth:0.3,
    }, 
    buyBtn: {
        width: '30%',  
        //borderRadius: 7,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        //marginLeft: '70%',

    },
})

