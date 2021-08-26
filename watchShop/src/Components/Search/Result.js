import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, FlatList, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { } from 'react-native-gesture-handler';
import ProductList from '../ProductList/ProductList'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import AsyncStorage from "@react-native-async-storage/async-storage"
const { width, height } = Dimensions.get('window');
// const height = width * 0.3;
const images = [
    '../../assets/image/home1.jpg',
    '../../assets/image/home2.jpg'
]
const imageWidth = width * 0.8;
const imageHeight = height * 0.5;

const productWidth = width - 20;
const productHeight = width / 2 - 15;
export default class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    };
    fetchData = async () => {
        var TEMP_TOKEN = await AsyncStorage.getItem("id_token");
        const searchValue = this.props.route.params.searchValue;
        const key = this.props.route.params.key;
        const clockworkId = this.props.route.params.clockworkId;
        const albertId = this.props.route.params.albertId;
        const colorId = this.props.route.params.colorId;
        console.log("colorId", colorId)
        console.log("clockworkId", clockworkId)
        console.log("key", key)
        if (key === "search") {
            fetch("https://shopwatchdut.herokuapp.com/api/product/search?name=" + searchValue, {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + TEMP_TOKEN
                },
            }
            ).then((response) => response.json())
                .then((responseData) => {
                    console.log(responseData);
                    this.setState({ data: responseData.data });
                }).catch((error) => {
                    console.log("Error");
                });
        }
        else if (key === "filter") {
            fetch("https://shopwatchdut.herokuapp.com/api/product/filter", {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + TEMP_TOKEN,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_color: colorId,
                    id_albert: albertId,
                    id_clockwork: clockworkId,
                })
            }
            ).then((response) => response.json())
                .then((responseData) => {
                    console.log(responseData);
                    this.setState({ data: responseData.data });
                }).catch((error) => {
                    console.log("Error");
                });
        }
    }

componentDidMount() {
    this.fetchData();
}
Click = (idItem) => {
    this.props.navigation.navigate("Product", { id: idItem });

}
render() {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <Image
                    source={require('../../assets/image/watchshop_logodesigns_final.jpg')}
                    style={styles.imageHeader}>
                </Image>
                <TouchableOpacity style={styles.bars} onPress={this.Logout}>
                    <SimpleLineIcons name="logout" style={styles.iconbars}></SimpleLineIcons>
                    <Text>Log-out</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.product}>
                <Text style={styles.textInput}>RESULT OF SEARCHING</Text>
                <View style={{ flex: 1, width: productWidth, paddingHorizontal: 20 }}>
                    <FlatList
                        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 10, marginRight: 10 }}
                        numColumns={2}
                        keyExtractor={(item) => item.id}
                        data={this.state.data}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => this.Click(item.id)} >
                                <View style={{}}>
                                    <View style={styles.frameImage}>
                                        <Image source={{ uri: item.image }} style={styles.productImg}></Image>
                                        <Text style={styles.text}> {item.name}</Text>
                                        <View style={{ justifyContent: "flex-end", flex: 1 }}><Text style={styles.price}>{item.price}</Text></View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        </View>
    )
}
}



const styles = StyleSheet.create({
    mainContainer: {
        height: height,
        flex: 1,
        flexDirection: 'column',
        elevation: 1,
        backgroundColor: '#DEE7EA',
        alignItems: 'center',
        shadowColor: '#2E272B',

    },
    container: {
        width: '100%',
        height: '7.5%',
        justifyContent: 'center',
        alignItems: 'center',
        //flex: 1,
        flexDirection: "row",
        backgroundColor: 'white',
        elevation: 10,
    },
    imageBackground: {
        width: imageWidth * 0.8,
        height: height,
        resizeMode: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        //margin: 'auto', 
    },
    space: {
        height: "100%",
        width: width - width / 1.0025,
        backgroundColor: "grey",
    },
    imageHead: {
        width: width / 2.005,
        height: "100%",
        resizeMode: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageFrame: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginLeft: 30,
        marginRight: 30,
    },
    product: {
        flex: 1,
        backgroundColor: '#F6FBFB',
        height: "10%",
        width: "90%"
    },
    textInput: {
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: '3%',
        marginBottom: '3%',
        marginLeft: '3%',
        fontStyle: 'italic',
    },
    imageHeader: {
        width: '65%',
        height: '60%',
        resizeMode: 'contain',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '100%',
        marginLeft: "15%",
    },
    bars: {

        // marginRight: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        width: "15%",
        height: "100%",
        marginTop: "2%"
    },
    iconbars: {
        color: 'black',
        fontSize: 22,
    },
    productImg: {
        resizeMode: 'stretch',
        width: width / 2.5,
        height: width / 2.5,
        borderColor: "#868B8B",
        borderWidth: 0.2,

    },
    frameImage: {
        flex: 1,
        backgroundColor: 'white',
        width: width / 2.5,
        height: width / 2.5 + width / 4.5,
        // borderRadius: 5,
        shadowColor: '#2E272B',
        borderColor: "#868B8B",
        borderWidth: 0.2,

        shadowOffset: {
            width: 2,
            height: 3
        },
        shadowOpacity: 1,
    },
    text: {
        marginTop: '10%'
    },
    price: {
        color: 'red',
    }
});