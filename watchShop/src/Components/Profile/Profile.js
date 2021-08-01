import React, {Component} from 'react';
import {View, Text, StyleSheet, ImageBackground, Dimensions, TextInput, TouchableOpacity, FlatList, Image} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from "@react-native-async-storage/async-storage"
const {width, height} = Dimensions.get('window')


export default class Profile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data:{},
        };   
    };
    fetchData = async () => {

        var TEMP_TOKEN = await AsyncStorage.getItem("id_token");
        fetch("https://shopwatchdut.herokuapp.com/api/user/", {
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
    gotochange = () => {
        this.props.navigation.navigate("ChangeInfor");
    }
    gotoPass = () => {
        this.props.navigation.navigate("ChangePass");
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
                <View style={styles.headerPro}>
                    <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                        <View style={{}}>
                            <Text>Account information</Text>
                        </View>                                        
                    </View>    
                </View>
                <View style={styles.wrapper}>
                    <View style={{justifyContent:"center", alignItems:"center"}}>
                        <Image source={require('../../assets/image/avt.png')} style={styles.avtImage}></Image>              
                    </View>       
                        <View style={styles.inforBar}>
                            <View style={{flexDirection:"row", height:"100%", justifyContent:"center", alignItems:"center"}}>
                                <Text>Name:</Text>
                                <Text style={{}}>{this.state.data.name} </Text>
                                <View style={{flex:1,justifyContent:"flex-end", flexDirection:"row"}}>  
                                </View>
                                <View style={styles.arrowBtn}></View>
                            </View>
                            
                        </View>
                        
                        <View style={styles.inforBar}>
                            <View style={{flexDirection:"row", height:"100%", justifyContent:"center", alignItems:"center"}}>
                                <Text>Address:</Text>
                                <View style={{flex:1,justifyContent:"flex-end", flexDirection:"row"}}>  
                                </View>
                                <View style={styles.arrowBtn}></View>
                            </View>
                            
                        </View>
                        <View style={styles.inforBar1}>  
                            <View style={{flexDirection:"row", height:"100%", justifyContent:"center", alignItems:"center"}}>
                                <Text>Phone number</Text>
                                <View style={{flex:1,justifyContent:"flex-end", flexDirection:"row"}}>  
                                </View>
                                <View style={styles.arrowBtn}></View>
                            </View>
                        </View>
                        <View style={styles.inforBar}>
                            <View style={{flexDirection:"row", height:"100%", justifyContent:"center", alignItems:"center"}}>
                                <Text>Email</Text>
                                <View style={{flex:1,justifyContent:"flex-end", flexDirection:"row"}}>  
                                </View>
                                <View style={styles.arrowBtn}></View>
                            </View>
                            
                        </View>
                        <View style={styles.inforBar}>
                            <View style={{flexDirection:"row", height:"100%", justifyContent:"center", alignItems:"center"}}>
                                <Text>Gender</Text>
                                <View style={{flex:1,justifyContent:"flex-end", flexDirection:"row"}}>  
                                </View>
                                <View style={styles.arrowBtn}></View>
                            </View>
                        </View>
                        <View style={styles.inforBar}>
                            
                            <View style={{flexDirection:"row", height:"100%", justifyContent:"center", alignItems:"center"}}>
                                <Text>Date of birth</Text>
                                <View style={{flex:1,justifyContent:"flex-end", flexDirection:"row"}}>  
                                </View>
                                <View style={styles.arrowBtn}></View>
                            </View>
                        </View>
                        <View style={{flex:1}}>
                        <View style={{marginTop:"3%"}}>
                            <View style={styles.btnFrame}>
                            <TouchableOpacity style={styles.InfBtn} onPress={this.gotochange}>
                                        <Text style={styles.Text}>CHANGE INFORMATION</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.PassBtn} onPress={this.gotoPass}>
                                    <Text style={styles.Text}>CHANGE PASSWORD</Text>
                                </TouchableOpacity>
                            </View>  
                        </View>
                        </View>
                        
                    </View>
                   
                </View>
        )
    }
}
const styles = StyleSheet.create({
    arrowBtn: {
        borderLeftColor:"#DEE7EA",
        borderLeftWidth:0.7, 
        height:"90%", 
        width:width/10, 
        justifyContent:"center", 
        alignItems:"center"
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
    headerPro:{
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
    avtImage:{
        resizeMode: 'stretch',
        width: width/4,
        height: width/4,
    },
    wrapper: {
        width: '95%',
        height: '80%',
        backgroundColor: '#DEE7EA',
        //borderRadius: 10,
        marginTop: '3%',
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
        marginTop:5,
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
        height: height /2.6,
        borderRadius: 30,
        marginTop: -height/2.9,
        borderColor: 'black',
        borderWidth: 1,
    },
            
    btnFrame: {
        width:"100%",
        height: "80%",
    }, 
    PassBtn: {
        width: '100%',
        backgroundColor: '#DA5A34',
        borderRadius: 8,
        height: "45%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    InfBtn: {
        width: '100%',
        backgroundColor: '#DA5A34',
        borderRadius: 8,
        height: "45%",
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom:"2%",
    },
})