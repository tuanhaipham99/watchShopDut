import React, { useState, Component } from 'react';
import { StyleSheet , View, Text, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import AsyncStorage from "@react-native-async-storage/async-storage"
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default class HeaderShop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textSearch: '',
        }
    }
    changeTextSearch = (text) => {
        this.setState({
            textSearch: text,
        })
    }
    gotoSearch = () => {
        this.props.navigation.navigate("Search");
    }
    Logout = async () => {
        try {
            await AsyncStorage.removeItem("id_token");
            await AsyncStorage.removeItem("id_user");
            this.props.navigation.navigate("Login");   
        } catch (error) {
        console.log('AsyncStorage error: ' + error.message);
        }
    }
    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.container}>
                    <Image source={require('../../assets/image/watchshop_logodesigns_final.jpg')} style={styles.imageBackground}>
                    </Image>
                    <TouchableOpacity style={styles.bars} onPress={this.Logout}>
                        <SimpleLineIcons name="logout" style={styles.iconbars}></SimpleLineIcons>
                        <Text>Log-out</Text>
                    </TouchableOpacity>
                </View> 
                <View >
                    <TouchableOpacity style={{justifyContent:"center", alignItems:"center", width:"100%"}} 
                    onPress={this.gotoSearch}>   
                        <View style={styles.inputContainer}>
                            <FontAwesome5 name="search" size={24} color="#969696" style={styles.buttonSearch} />
                            <Text style={styles.text}>What are you looking for?</Text>
                        </View>
                    </TouchableOpacity>
      
                </View>
            </View>
            
        ); 
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
        //elevation:1,
        alignItems: 'center',
    },
    imageBackground: {
        width: '30%',
        height: '60%',
        resizeMode: 'contain',
        flex: 9,
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '100%',
        marginLeft:"15%",
    },
    alert: {
        flexDirection: 'row',
    },
    bars: {
        //flex: 1,
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
    inputText: {
        flex: 10,
        marginLeft: 20,
        color:"black",
    },
    buttonSearch: {
        flex: 1,
        marginLeft: 10,
    },
    inputContainer: {
        marginTop: 5,
        flexDirection: 'row',
        backgroundColor: '#fff',
        height: 40,
        width: '97%',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 20,
    },
    text: {
        color: "grey",
        marginRight: "50%",
    },
    
});