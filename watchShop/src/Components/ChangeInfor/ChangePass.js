import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, Modal, Dimensions, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from "@react-native-async-storage/async-storage"
const { width, height } = Dimensions.get('window');


export default class ChangePass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            icon: 'eye-slash',
            isShow: true,
            currentPass: "",
            newPass: "",
            confirmPass: "",
        }
    }
    hideShowPassword = () => {
        this.setState({
            icon: this.state.icon === 'eye' ? 'eye-slash' : 'eye',
            isShow: !this.state.isShow,
        })
    }
    changeCurrent = (text) => {
        this.setState({ currentPass: text });
    };
    changeNew = (text) => {
        this.setState({ newPass: text });
    };
    changeConfirm = (text) => {
        this.setState({ confirmPass: text });
    };
    create = async () => {
        var ID = await AsyncStorage.getItem("id_user");
        console.log("id", ID)
        var TEMP_TOKEN = await AsyncStorage.getItem("id_token");
        this.setState({ TOKEN: TEMP_TOKEN })
        if (this.state.newPass === this.state.confirmPass) {
            await fetch("https://shopwatchdut.herokuapp.com/api/user/14/changepassword", {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + TEMP_TOKEN
                },
                body: JSON.stringify({
                    password: this.state.newPass,
                })
            }
            ).then((response) => response.json())
                .then((responseData) => {
                    console.log(responseData);
                    this.setState({ data: responseData.data });
                    if (responseData.meta.message === "Processed successfully")
                        this.alert();
                }).catch((error) => {
                    console.log(error)
                    Alert.alert(
                        "Messages",
                        "Change password failed",
                        [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                    )
                });
        }
        else {
            Alert.alert(
                "Messages",
                "Confirm password not true",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            )
        }
    }
    alert = () => {
        Alert.alert(
            "Messages",
            "Update password successfully",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        )
    }
    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.headerPro}>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <View style={{}}>
                            <Text>Change information</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.wrapper}>

                    <View style={styles.inputViewPassword}>
                        <View style={styles.iconUserPassword}>
                            <FontAwesome5
                                name="lock"
                                color="#05375a"
                                //size={20}
                                height='100%'
                                position='absolute'
                                alignItems='center'
                                justifyContent='center'
                            ></FontAwesome5>
                        </View>
                        <TextInput
                            underlineColorAndroid='#FFF'
                            onChangeText={this.changeCurrent}
                            style={styles.inputText}
                            placeholder="Current Password"
                            placeholderTextColor="#808080"
                            secureTextEntry={this.state.isShow}
                        >
                        </TextInput>
                        <TouchableOpacity
                            style={styles.touchableShowPassword}
                            onPress={this.hideShowPassword}
                        >
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputViewPassword}>
                        <View style={styles.iconUserPassword}>
                            <FontAwesome5
                                name="lock"
                                color="#05375a"
                                //size={20}
                                height='100%'
                                position='absolute'
                                alignItems='center'
                                justifyContent='center'
                            ></FontAwesome5>
                        </View>
                        <TextInput
                            underlineColorAndroid='#FFF'
                            onChangeText={this.changeNew}
                            style={styles.inputText}
                            placeholder="New Password"
                            placeholderTextColor="#808080"
                            secureTextEntry={this.state.isShow}
                        >
                        </TextInput>
                    </View>
                    <View style={styles.inputViewPassword}>
                        <View style={styles.iconUserPassword}>
                            <FontAwesome5
                                name="lock"
                                color="#05375a"
                                //size={20}
                                height='100%'
                                position='absolute'
                                alignItems='center'
                                justifyContent='center'
                            ></FontAwesome5>
                        </View>
                        <TextInput
                            underlineColorAndroid='#FFF'
                            onChangeText={this.changeConfirm}
                            style={styles.inputText}
                            placeholder="Confirm Password"
                            placeholderTextColor="#808080"
                            secureTextEntry={this.state.isShow}
                        >
                        </TextInput>
                    </View>
                    <View style={styles.btnFrame}>
                        <TouchableOpacity style={styles.buyBtn} onPress={this.create}>
                            <Text style={styles.Text}>SAVE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    inputText: {
        left: 7,
        width: "100%",
        color: 'black',
    },
    arrowBtn: {
        borderLeftColor: "#DEE7EA",
        borderLeftWidth: 0.7, height: "100%",
        width: width / 10,
        justifyContent: "center",
        alignItems: "center"
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
        backgroundColor: '#DEE7EA',
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
    headerPro: {
        width: '100%',
        height: height * 0.07,
        backgroundColor: 'white',
        //marginTop: '3%',
        //borderRadius: 10,
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
    wrapper: {
        width: '95%',
        height: height * 0.8,
        backgroundColor: '#DEE7EA',
        //borderRadius: 10,
        paddingTop: '10%',
    },
    inputText: {
        left: 7,
        height: 40,
        color: 'black',
    },
    inputView: {
        position: 'relative',
        alignSelf: 'stretch',
        justifyContent: 'center',
        width: '80%',
        backgroundColor: '#f5f5f5',
        borderRadius: 25,
        height: 40,
        marginBottom: '3%',
        marginLeft: '10%',
        justifyContent: 'center',
        padding: 20,
    },
    inputViewPassword: {
        position: 'relative',
        alignSelf: 'stretch',
        justifyContent: 'center',
        width: '80%',
        backgroundColor: '#f5f5f5',
        borderRadius: 25,
        height: 40,
        marginBottom: '3%',
        marginLeft: '10%',
        padding: 20,
    },
    touchableShowPassword: {
        position: 'absolute',
        right: 5,
        height: 30,
        width: 35,
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconUserPassword: {
        position: 'absolute',
        height: 30,
        width: 35,
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    eyeIcon: {
        // resizeMode: 'contain',
        height: '100%',
        width: '100%',
    },
    btnFrame: {
        width: '100%',
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        marginTop: "3%",
    },
    buyBtn: {
        width: '40%',
        backgroundColor: '#60ADAD',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,

    },
    Text: {
        color: 'white',
    },
})