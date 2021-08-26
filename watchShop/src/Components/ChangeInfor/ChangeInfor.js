import React, { Component } from 'react';
import { View, Alert,Text, StyleSheet, Modal, Dimensions, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from "@react-native-async-storage/async-storage"
import Moment from "moment";
const { width, height } = Dimensions.get('window');


export default class ChangeInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            fullname: '',
            address: '',
            phone: '',
            email: '',
            date: '',
        };
    };

    fetchData = async () => {
        var ID = await AsyncStorage.getItem("id_user");
        var TEMP_TOKEN = await AsyncStorage.getItem("id_token");
        fetch("https://shopwatchdut.herokuapp.com/api/user/id?id=" + ID, {
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
    componentDidMount() {
        this.fetchData();
    }
    // componentDidUpdate(prevProps, prevState) {
    //     if (prevProps.data !== this.state.data) {
    //         this.fetchData();
    //     }
    // }
    changeFullname = (text) => {
        this.setState({ fullname: text });
    };
    changeAddress = (text) => {
        this.setState({ address: text });
    };
    changePhone = (text) => {
        this.setState({ phone: text });
    };
    changeEmail = (text) => {
        this.setState({ email: text });
    };
    changeDate = (text) => {
        this.setState({ date: text });
    };

    updateInfor = async () => {
        var ID = await AsyncStorage.getItem("id_user");
        var TEMP_TOKEN = await AsyncStorage.getItem("id_token");
        console.log("ful",this.state.fullname)
        await fetch("https://shopwatchdut.herokuapp.com/api/user/1/updateinfo", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + TEMP_TOKEN
            },
            body: JSON.stringify({
                fullname: this.state.fullname ? this.state.fullname : this.state.data.fullname,
                address: this.state.address ? this.state.address: this.state.data.address,
                phone: this.state.phone ? this.state.phone: this.state.data.phone,
                email: this.state.email ? this.state.email: this.state.data.email,
                birthday: this.state.date ? this.state.date: Moment(this.state.data.birthday).format('DD/MM/YYYY')
            })
        }
        ).then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                if (responseData.meta.message==="Processed successfully") {
                    this.showAlert();
                }
            });
    }
    turnback = () => {
        this.props.navigation.navigate("Main",{screen: "Home"});
    }
    showAlert = () =>
    Alert.alert(
      "Messages",
      "You have updated success",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
    render() {
        console.log(this.state.data)
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
                    <View style={styles.inforBar}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={{marginLeft:"2%"}}>Name :</Text>
                            <TextInput
                                underlineColorAndroid="transparent"
                                onChangeText={this.changeFullname}
                                style={styles.inputText}
                                placeholderTextColor="#808080"
                                defaultValue={this.state.data.fullname}
                            />
                        </View>

                    </View>

                    <View style={styles.inforBar}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={{marginLeft:"2%"}}>Address:</Text>
                            <TextInput
                                underlineColorAndroid="transparent"
                                onChangeText={this.changeAddress}
                                style={styles.inputText}
                                defaultValue={this.state.data.address}
                                placeholderTextColor="#808080"
                            />
                        </View>

                    </View>
                    <View style={styles.inforBar1}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={{marginLeft:"2%"}}>Phone number:</Text>
                            <TextInput
                                underlineColorAndroid="transparent"
                                onChangeText={this.changePhone}
                                style={styles.inputText}
                                defaultValue={this.state.data.phone}
                                placeholderTextColor="#808080"
                            />
                        </View>
                    </View>
                    <View style={styles.inforBar}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={{marginLeft:"2%"}}t>Email:</Text>
                            <TextInput
                                underlineColorAndroid="transparent"
                                onChangeText={this.changeEmail}
                                style={styles.inputText}
                                defaultValue={this.state.data.email}
                                placeholderTextColor="#808080"
                            />
                        </View>

                    </View>
                    <View style={styles.inforBar}>

                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={{marginLeft:"2%"}}>Date of birth</Text>
                            <TextInput
                                underlineColorAndroid="transparent"
                                onChangeText={this.changeDate}
                                style={styles.inputText}
                                defaultValue={Moment(this.state.data.birthday).format('DD/MM/YYYY')}
                                placeholderTextColor="#808080"
                            />
                        </View>
                    </View>
                    <View style={styles.btnFrame}>
                        <TouchableOpacity style={styles.SaveBtn} onPress={this.updateInfor}>
                            <Text style={styles.Text}>SAVE INFORMATION</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.SaveBtn} onPress={() => this.turnback()}>
                            <Text style={styles.Text}>TURN BACK</Text>
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
        color: '#808080',
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
    avtImage: {
        resizeMode: 'stretch',
        width: width / 4,
        height: width / 4,
    },
    wrapper: {
        width: '95%',
        height: height * 0.8,
        backgroundColor: '#DEE7EA',
        //borderRadius: 10,
        paddingTop: '10%',
    },
    inforBar: {
        width: "100%",
        height: "8%",
        backgroundColor: 'white',
        marginBottom: 1,
        //alignItems:"center",
        justifyContent: "center",
    },
    inforBar1: {
        marginTop: 5,
        width: "100%",
        height: "9%",
        marginBottom: 1,
        backgroundColor: 'white',
        //alignItems:"center",
        justifyContent: "center"
    },
    formLogin: {
        backgroundColor: '#DEE7EA',
        width: '80%',
        height: height / 2.6,
        borderRadius: 30,
        marginTop: -height / 2.9,
        borderColor: 'black',
        borderWidth: 1,
    },
    btnFrame: {
        width: "100%",
        height: "80%",
    },
    SaveBtn: {
        width: '100%',
        backgroundColor: '#DA5A34',
        borderRadius: 8,
        height: "10%",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: "3%"
    },
})