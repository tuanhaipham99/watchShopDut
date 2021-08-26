import React, { Component } from 'react';
import { View,Alert, Button, Text, StyleSheet, Modal, Dimensions, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const { width, height } = Dimensions.get('window');


export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            icon: 'eye-slash',
            isShow: true,
            confirmPassword: "",
            username: "",
            password: "",
            fullname: "",
            phone: "",
            email: "",
            birthday: "",
            address: "",
        };

    }
    changeUsername = (text) => {
        this.setState({ username: text });
    };

    changePassword = (text) => {
        this.setState({ password: text });
    };

    changeConfirmPassword = (text) => {
        this.setState({ confirmPassword: text });
    };

    changeEmail = (text) => {
        this.setState({ email: text });
    };
    changeName = (text) => {
        this.setState({ fullname: text });
    };

    changeAddress = (text) => {
        this.setState({ address: text });
    };

    changePhone = (text) => {
        this.setState({ phone: text });
    };
    changeBirthday = (text) => {
        this.setState({ birthday: text });
    }
    hideShowPassword = () => {
        this.setState({
            icon: this.state.icon === 'eye' ? 'eye-slash' : 'eye',
            isShow: !this.state.isShow,
        })
    }
    onCreate = async () => {
        if (this.state.password == this.state.confirmPassword) {
            await fetch("https://shopwatchdut.herokuapp.com/api/user/register", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                    fullname: this.state.fullname,
                    address: this.state.address,
                    phone: this.state.phone,
                    birthday: this.state.birthday,
                    email: this.state.email,
                })
            }
            ).then((response) => response.json())
                .then((responseData) => {
                    console.log(responseData);
                    if (responseData.meta.message === "Processed successfully") {
                        this.showAlert();
                        this.props.navigation.navigate("Login");                
                    }
                }).catch((error)=> {
                    Alert.alert(
                        "Messages",
                        "Create failed. Check again",
                        [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ])
                })
                
        }
        else {
            Alert.alert(
                "Messages",
                "Check your password and confirm password",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ])
        }
    }
    showAlert = () => {
        Alert.alert(
            "Messages",
            "Sign up successfully",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        )
    }
    return = () => {
        this.state.navigation.goBack()
    }
    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.headerPro}>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <View style={{}}>
                            <Text>WELCOME TO WATCHSHOP</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <ScrollView style={styles.scroll}>
                        <View style={{ width: width, height: "100%", alignItems: "center", justifyContent: "center" }}>
                            <View style={styles.Image}>
                                <Image source={require('../../assets/image/clock4.jpg')} style={styles.imageBackground} ></Image>
                            </View>
                            <Text style={styles.text}>LET'S GET STARTED</Text>
                            <View style={styles.inputView} >
                                <View style={styles.iconUserPassword}>
                                    <FontAwesome5
                                        name="user-circle"
                                        color="#05375a"
                                        //size={20}
                                        height='100%'
                                        position='absolute'
                                        alignItems='center'
                                        justifyContent='center'
                                    ></FontAwesome5>
                                </View>
                                <TextInput
                                    onChangeText={this.changeUsername}
                                    underlineColorAndroid="transparent"
                                    style={styles.inputText}
                                    placeholder="Username"
                                    placeholderTextColor="#808080"
                                />
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
                                    onChangeText={this.changePassword}
                                    style={styles.inputText}
                                    placeholder="Password"
                                    placeholderTextColor="#808080"
                                    secureTextEntry={this.state.isShow}
                                >
                                </TextInput>
                                <TouchableOpacity
                                    style={styles.touchableShowPassword}
                                    onPress={this.hideShowPassword}
                                >
                                    <FontAwesome5
                                        style={styles.eyeIcon}
                                        name={this.state.icon}
                                    ></FontAwesome5>
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
                                    onChangeText={this.changeConfirmPassword}
                                    style={styles.inputText}
                                    placeholder="Confirm Password"
                                    placeholderTextColor="#808080"
                                    secureTextEntry={this.state.isShow}
                                >
                                </TextInput>
                            </View>
                            <View style={styles.inputView} >
                                <View style={styles.iconUserPassword}>
                                    <FontAwesome5
                                        name="user-circle"
                                        color="#05375a"
                                        //size={20}
                                        height='100%'
                                        position='absolute'
                                        alignItems='center'
                                        justifyContent='center'
                                    ></FontAwesome5>
                                </View>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={styles.inputText}
                                    onChangeText={this.changeName}
                                    placeholder="Full name"
                                    placeholderTextColor="#808080"
                                />
                            </View>

                            <View style={styles.inputView} >
                                <View style={styles.iconUserPassword}>
                                    <FontAwesome5
                                        name="user-circle"
                                        color="#05375a"
                                        //size={20}
                                        height='100%'
                                        position='absolute'
                                        alignItems='center'
                                        justifyContent='center'
                                    ></FontAwesome5>
                                </View>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={styles.inputText}
                                    onChangeText={this.changePhone}
                                    placeholder="Phone number"
                                    placeholderTextColor="#808080"
                                />
                            </View>
                            <View style={styles.inputView} >
                                <View style={styles.iconUserPassword}>
                                    <FontAwesome5
                                        name="user-circle"
                                        color="#05375a"
                                        //size={20}
                                        height='100%'
                                        position='absolute'
                                        alignItems='center'
                                        justifyContent='center'
                                    ></FontAwesome5>
                                </View>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={styles.inputText}
                                    onChangeText={this.changeEmail}
                                    placeholder="Email"
                                    placeholderTextColor="#808080"
                                />
                            </View>
                            <View style={styles.inputView} >
                                <View style={styles.iconUserPassword}>
                                    <FontAwesome5
                                        name="user-circle"
                                        color="#05375a"
                                        //size={20}
                                        height='100%'
                                        position='absolute'
                                        alignItems='center'
                                        justifyContent='center'
                                    ></FontAwesome5>
                                </View>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={styles.inputText}
                                    placeholder="Address"
                                    onChangeText={this.changeAddress}
                                    placeholderTextColor="#808080"
                                />
                            </View>
                            <View style={styles.inputView} >
                                <View style={styles.iconUserPassword}>
                                    <FontAwesome5
                                        name="user-circle"
                                        color="#05375a"
                                        //size={20}
                                        height='100%'
                                        position='absolute'
                                        alignItems='center'
                                        justifyContent='center'
                                    ></FontAwesome5>
                                </View>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={styles.inputText}
                                    placeholder="Birthday"
                                    onChangeText={this.changeBirthday}
                                    placeholderTextColor="#808080"
                                />
                            </View>
                            <View style={styles.btnFrame}>
                                <TouchableOpacity style={styles.buyBtn} onPress={this.onCreate}>
                                    <Text style={styles.Text}>CREATE</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </ScrollView>
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
        backgroundColor: '#ffffff',
    },
    Image: {
        width: width / 2,
        height: height / 6,
        //borderWidth:0.3,
    },
    text: {
        marginBottom: "3%",
    },
    imageBackground: {
        width: '100%',
        //height: height/24,
        resizeMode: 'cover',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    headerPro: {
        width: '100%',
        height: height * 0.07,
        backgroundColor: '#f5f5f5',
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
        backgroundColor: '#ECF3F3',
        borderRadius: 25,
        height: 40,
        marginBottom: '3%',
        marginLeft: '10%',
        justifyContent: 'center',
        padding: 20,
        borderWidth: 0.2,
        borderColor: "#4ec0db",
        shadowColor: '#ECF3F3',

        shadowOffset: {
            width: 6,
            height: 5
        },
        shadowOpacity: 1,
    },
    inputViewPassword: {
        position: 'relative',
        alignSelf: 'stretch',
        backgroundColor: '#ECF3F3',
        shadowColor: '#ECF3F3',

        shadowOffset: {
            width: 6,
            height: 5
        },
        shadowOpacity: 1,
        justifyContent: 'center',
        width: '80%',
        borderRadius: 25,
        height: 40,
        marginBottom: '3%',
        marginLeft: '10%',
        padding: 20,
        borderWidth: 0.2,
        borderColor: "#4ec0db"
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
    scroll: {
        flex: 1,
        height: "100%",
        width: "100%",
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