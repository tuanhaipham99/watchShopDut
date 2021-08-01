import React, {Component} from 'react';
import {View, Text, StyleSheet, Modal, Dimensions, TextInput, TouchableOpacity, FlatList, Image} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const {width, height} = Dimensions.get('window');


export default class ChangeInfor extends Component{
    constructor(props){
        super(props);
       
    }

    render(){
        return(
            <View style={styles.mainContainer}>
                <View style={styles.headerPro}>
                    <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                        <View style={{}}>
                            <Text>Change information</Text>
                        </View>                                        
                    </View>    
                </View>
                <View style={styles.wrapper}>    
                        <View style={styles.inforBar}>
                            <View style={{flexDirection:"row",  alignItems:"center"}}>
                                <Text>Name:</Text>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    onChangeText={this.changeUsername}
                                    style={styles.inputText}
                                    placeholder="Pham Tuan Hai"
                                    placeholderTextColor="#808080"
                                />
                            </View>
                            
                        </View>
                        
                        <View style={styles.inforBar}>
                            <View style={{flexDirection:"row",  alignItems:"center"}}>
                                <Text>Address:</Text>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    onChangeText={this.changeUsername}
                                    style={styles.inputText}
                                    placeholder="08 Hà Văn Tính, Tp. Đà Nẵng"
                                    placeholderTextColor="#808080"
                                />
                            </View>
                            
                        </View>
                        <View style={styles.inforBar1}>  
                            <View style={{flexDirection:"row",  alignItems:"center"}}>
                                    <Text>Phone number:</Text>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        onChangeText={this.changeUsername}
                                        style={styles.inputText}
                                        placeholder="0385391814"
                                        placeholderTextColor="#808080"
                                    />
                            </View>
                        </View>
                        <View style={styles.inforBar}>
                        <View style={{flexDirection:"row",  alignItems:"center"}}>
                                <Text>Email:</Text>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    onChangeText={this.changeUsername}
                                    style={styles.inputText}
                                    placeholder="tuanhaipham99@gmail.com"
                                    placeholderTextColor="#808080"
                                />
                            </View>
                            
                        </View>
                        <View style={styles.inforBar}>
                        <View style={{flexDirection:"row",  alignItems:"center"}}>
                                <Text>Gender:</Text>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    onChangeText={this.changeUsername}
                                    style={styles.inputText}
                                    placeholder="Nam"
                                    placeholderTextColor="#808080"
                                />
                            </View>
                        </View>
                        <View style={styles.inforBar}>
                            
                            <View style={{flexDirection:"row",  alignItems:"center"}}>
                                <Text>Date of birth</Text>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    onChangeText={this.changeUsername}
                                    style={styles.inputText}
                                    placeholder="29/12/1999"
                                    placeholderTextColor="#808080"
                                />
                            </View>
                        </View>
                        <View style={styles.btnFrame}>
                            <TouchableOpacity style={styles.SaveBtn} onPress={this.gotochange}>
                                        <Text style={styles.Text}>SAVE INFORMATION</Text>
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
        borderLeftColor:"#DEE7EA",
        borderLeftWidth:0.7, height:"100%", 
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
        height: height/24,
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
        height: height*0.07,
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
        height: height*0.8,
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
    SaveBtn: {
        width: '100%',
        backgroundColor: '#DA5A34',
        borderRadius: 8,
        height: "10%",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:"3%"
    },
})