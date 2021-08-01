import React, {Component} from 'react';
import {View, Text, StyleSheet, ImageBackground, Dimensions, TextInput, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const {width, height} = Dimensions.get('window')

export default class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            icon: 'eye-slash',
            isShow: true,
        };
    };
    changeUsername = (text) => {
        this.setState({username: text});
    };
    changePassword = (text) => {
        this.setState({password: text});
    };
    hideShowPassword = () => {
        this.setState({
            icon: this.state.icon === 'eye' ? 'eye-slash' : 'eye',
            isShow: !this.state.isShow,
        })
    }
    setAsyncStorage = async (item, selectedValue) => {
        try {
            await AsyncStorage.setItem(item, selectedValue);
          } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
          }
    }
    setIdUser = async (item, selectedValue) => {
        try {
            selectedValue = selectedValue.toString();
            await AsyncStorage.setItem(item, selectedValue);
          } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
          }
    }
    showAlert = () =>
    Alert.alert(
      "Alert Title",
      "Login failed",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
    loginSuccess = () => {
        var STORAGE_KEY = 'id_token';
        var STORAGE_ID = 'id_user';
        fetch("https://shopwatchdut.herokuapp.com/api/user/login", {
            method:"POST",
            headers: {
                // 'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        }
        ).then((response) => response.json())
        .then((responseData) => {
            console.log(responseData);
            this.setAsyncStorage(STORAGE_KEY,responseData.token)
            this.setIdUser(STORAGE_ID,responseData.data)
            if (responseData.token!= null) this.props.navigation.navigate("Main");
        }).catch((error) => {
            console.log("Error");
            this.showAlert();
        });
        console.log(this.state.username);
        console.log(this.state.password);

    }    
    gotoRegister = () => {
        this.props.navigation.navigate("Register");
    }
    render() {
        return(
            <View style={styles.container}>
        
                <ImageBackground source={require('../../assets/image/photo-1573128619504-6c9c9cac8c7c.jpg')} style={styles.imageBackground}>
                    <View style={styles.formLogin}>
                        <Text style={styles.textLogin}>WELCOME!</Text>
                        <View style={styles.inputView}>
                            <View style={styles.iconUserPassword}>
                                <FontAwesome5 
                                    name="user-circle"
                                    color="#05375a"
                                    //size={20}
                                    height= '100%'
                                    position= 'absolute'
                                    alignItems= 'center'
                                    justifyContent= 'center'
                                ></FontAwesome5>
                            </View>
                            <TextInput
                            
                                underlineColorAndroid="transparent"
                                onChangeText={this.changeUsername}
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
                                    height= '100%'
                                    position= 'absolute'
                                    alignItems= 'center'
                                    justifyContent= 'center'
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
                        <View style={styles.button}>
                            <TouchableOpacity style={styles.loginBtn} onPress={this.loginSuccess} >
                                <Text style={styles.loginText}>LOG IN</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={this.gotoRegister}>
                            <Text style={styles.signUp}>SIGN UP</Text>
                        </TouchableOpacity>
                            
                    </View>
                    </ImageBackground>
              
                    
                                        
            </View>             

        )
    }
}



const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
        //flex: 1,
        flexDirection: "column",
        backgroundColor:'rgba(200,200,200,0.9)', 
        //justifyContent:'flex-end'
    },
    imageBackground: {
        width: '100%',
        height: '110%',
        //marginTop: 'auto',
        marginBottom: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '100%',
    },
    formLogin: {
        backgroundColor: '#DEE7EA',
        width: '80%',
        height: height /2.6,
        borderRadius: 30,
        marginTop: -height/2.9,
        borderColor: 'black',
        borderWidth: 1,
    },
    textLogin: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '3%',
        marginBottom: '7%',
        fontStyle: 'italic',
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
    loginBtn: {
        width: '60%',
        backgroundColor: '#60ADAD',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginText: {
        color: 'white',
    },
    signUp: {
        color: '#6F4693',
        fontSize: 13,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '5%',
        marginTop: '3%'
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '5%',
    },
});