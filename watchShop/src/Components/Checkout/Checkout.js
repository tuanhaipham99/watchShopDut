import React, { Component } from 'react';
import { KeyboardAvoidingView, StyleSheet, View, Dimensions, Text, Modal, TouchableOpacity, ActivityIndicator, Button, Alert, TextInput, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from "@react-native-async-storage/async-storage"
const { width, height } = Dimensions.get('window')
import { connect } from "react-redux";
import { CartCount as getCartCount } from "../../redux/action/CartCount"
class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paypalURL: "",
            textSearch: '',
            qty: 1,
            showModal: false,
            prog: false,
            progClr: "#000",
            name: "",
            address: "",
            phone: "",
            note: "",
            totalPrice: "",
            cartCount: "",
            TOKEN: "",
            id: "",
        }
    }
    setShowModal = (value) => {
        this.setState({ showModal: value != null ? value : !this.state.showModal })
    }
    setProg = (value) => {
        this.setState({ prog: value != null ? value : !this.state.prog })
    }
    setProgClr = (value) => {
        this.setState({ progClr: value })
    }
    changeTextSearch = (text) => {
        this.setState({
            textSearch: text,
        })
    }

    fetchData = async () => {
        var ID = await AsyncStorage.getItem("id_user");
        var TEMP_TOKEN = await AsyncStorage.getItem("id_token");
        this.setState({ TOKEN: TEMP_TOKEN });
        this.setState({ id: ID });
        fetch(`https://shopwatchdut.herokuapp.com/api/cart/${ID}/price`, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + TEMP_TOKEN
            },
        }
        ).then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                this.setState({ totalPrice: responseData.data });
                this.props.getCartCount(this.state.TOKEN, this.state.id)
            }).catch((error) => {
                console.log("Error");
            });
    }
    turnback = async() => {
        var TOKEN = await AsyncStorage.getItem("id_token");
        var ID = await AsyncStorage.getItem("id_user");
        this.props.getCartCount(TOKEN,ID)
    }
    componentDidMount() {
        this.fetchData();
    }
    changeName = (text) => {
        this.setState({ name: text });
    };

    changeAddress = (text) => {
        this.setState({ address: text });
    };

    changePhone = (text) => {
        this.setState({ phone: text });
    };

    changeNote = (text) => {
        this.setState({ note: text });
    };

    onMessage(e) {
        let data = e.nativeEvent.data;
        console.log("data native", e.nativeEvent);
        console.log("data", data);
        let payment = JSON.parse(data);
        if (payment.status === 'COMPLETED') {
            alert('PAYMENT MADE SUCCESSFULLY!');
        } else {
            alert('PAYMENT FAILED. PLEASE TRY AGAIN.');
        }
    }
    go = async () => {
        if (this.state.name && this.state.phone && this.state.note && this.state.address) {
            var ID = await AsyncStorage.getItem("id_user");
            var TEMP_TOKEN = await AsyncStorage.getItem("id_token");
            fetch("https://shopwatchdut.herokuapp.com/api/order/payment/" + ID, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + TEMP_TOKEN
                },
                body: JSON.stringify({
                    id_user: ID,
                    receiver: this.state.name,
                    phone: this.state.phone,
                    note: this.state.note,
                    address: this.state.address
                })
            }
            ).then((response) => response.json())
                .then((responseData) => {
                    console.log(responseData);
                    this.setState({ paypalURL: responseData.meta.code ? responseData.meta.code : null });
                    this.setShowModal()
                }).catch((error) => {
                    console.log("Error" + error);
                });
        }
        else {
            Alert.alert(
                "Messages",
                "You must fill enough information",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            )
        }
    }
    render() {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.mainContainer}
            >
                <View style={styles.container}>
                    <TouchableOpacity style={styles.bars}>
                        <FontAwesome5 style={styles.iconbars} name={'bars'} />
                    </TouchableOpacity>
                    <Image source={require('../../assets/image/watchshop_logodesigns_final.jpg')} style={styles.imageBackground}>
                    </Image>
                </View>
                <View style={styles.headerCart}>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

                        <View style={{}}>
                            <Text>Check-out</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.wrapper}>
                    <View style={{ flex: 1, alignItems: "center", }}>
                        <View style={styles.barInf}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                style={styles.inputText}
                                onChangeText={this.changeName}
                                placeholder="Receiver name:"
                                placeholderTextColor="#808080"
                            />
                        </View>
                        <View style={styles.barInf}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                style={styles.inputText}
                                onChangeText={this.changeAddress}
                                placeholder="Address:"
                                placeholderTextColor="#808080"
                            />
                        </View>
                        <View style={styles.barInf}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                style={styles.inputText}
                                onChangeText={this.changePhone}
                                placeholder="Phone number:"
                                placeholderTextColor="#808080"
                            />
                        </View>
                        <View style={styles.barInf}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                style={styles.inputText}
                                onChangeText={this.changeNote}
                                placeholder="Note:"
                                placeholderTextColor="#808080"
                            />
                        </View>
                        <View style={styles.barInf}>
                            <Text style={styles.text}>Total price: {this.state.totalPrice}$</Text>
                        </View>
                    </View>
                    <View style={styles.btnFrame}>
                        <TouchableOpacity style={styles.buyBtn} onPress={this.go}>
                            <Text style={styles.Text}>BUY</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {!!this.state.showModal ? (
                    <Modal
                        visible={this.state.showModal}
                        onDismiss={() => {
                            this.setShowModal(false);
                            console.log("dismiss")
                        }}
                        onRequestClose={() => {
                            this.setShowModal(false);
                            // this.props.getCartCount(this.state.TOKEN,this.state.id)

                            this.props.navigation.navigate("Main");
                        }}
                        animationType={'fade'}
                        transparent>
                        <View style={styles.webViewCon}>
                            <View style={styles.wbHead}>
                                <TouchableOpacity
                                    style={{ padding: 13 }}
                                    onPress={() => {
                                        //this.props.getCartCount(this.state.TOKEN,this.state.id)
                                        this.props.navigation.navigate("Main",{screen: "Order"});
                                        this.setShowModal(false);
                                        this.turnback();
                                    }}>
                                    <Feather name={'x'} size={24} />
                                </TouchableOpacity>
                                <Text
                                    style={{
                                        flex: 1,
                                        textAlign: 'center',
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                        color: '#00457C',
                                    }}>
                                    PayPal GateWay
                        </Text>
                                <View style={{ padding: 13, opacity: this.state.prog ? 1 : 0 }}>
                                    <ActivityIndicator size={24} color={this.state.progClr} />
                                </View>
                            </View>
                            <WebView
                                source={{ uri: this.state.paypalURL }}
                                style={{ flex: 1 }}
                                onLoadStart={() => {
                                    this.setProg(true);
                                    this.setProgClr('#000');
                                }}
                                onLoadProgress={() => {
                                    this.setProg(true);
                                    this.setProgClr('#00457C');
                                }}
                                onLoadEnd={() => {
                                    this.setProg(false);
                                }}
                                onLoad={() => {
                                    this.setProg(false);
                                }}
                                onMessage={this.onMessage}
                            />
                        </View>
                    </Modal>
                ) : null}
            </KeyboardAvoidingView>
        );
    }
}
function mapStateToProp(state) {
    return {
        cartCount: state.CartCount.cartCount,
    }
}

const mapDispatchToProps = {
    getCartCount,
};

export default connect(mapStateToProp, mapDispatchToProps)(Checkout)

const styles = StyleSheet.create({
    inputText: {
        left: 7,
        height: 40,
        color: 'black',
        width: "100%",
    },
    text: {
        left: 7,
        //height: 40,
        color: 'black'
    },
    barInf: {
        width: "90%",
        marginTop: 3,
        borderRadius: 10,
        position: 'relative',
        flexDirection: "row",
        //alignSelf: 'stretch',
        //justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        height: 40,
        alignItems: "center",

    },
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
        flex: 1,
        flexDirection: 'column',
        elevation: 1,
        alignItems: 'center',
    },
    imageBackground: {
        width: '30%',
        height: height / 24,
        resizeMode: 'contain',
        flex: 8,
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '100%',
        marginLeft: -20,
    },
    wrapper: {
        width: '95%',
        height: height / 2.7,
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: '3%',
        //justifyContent: "center", 
        //alignItems: "center",
        borderColor: 'black',
        borderWidth: 1,
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
    user: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: 30,
        // backgroundColor: 'black',
    },
    viewuser: {
        height: 30,
        width: 30,
        borderRadius: 25,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconuser: {
        color: 'white',
        fontSize: 15,
    },
    viewSearch: {
        flex: 6,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerCart: {
        width: '95%',
        height: height / 20,
        backgroundColor: 'white',
        marginTop: '3%',
        borderRadius: 10,
        justifyContent: "center",
        alignContent: "center",
        shadowColor: '#2E272B',
        //flexDirection: 'row',
        shadowOffset: {
            width: 2,
            height: 6
        },
        shadowOpacity: 1,
    },
    btnFrame: {
        width: '100%',
        //height: '50%',

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
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,

    },
    Text: {
        color: 'white',
    },
    webViewCon: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    wbHead: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        zIndex: 25,
        elevation: 2,
    },
});