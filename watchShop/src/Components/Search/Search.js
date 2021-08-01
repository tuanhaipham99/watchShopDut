import React, { useState, Component } from 'react';
import { StyleSheet,View, Text, Dimensions,TouchableOpacity } from 'react-native';
import {SearchBar} from "react-native-elements"
import {CheckBox} from "react-native-elements";
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from "@react-native-async-storage/async-storage"
const {width, height} = Dimensions.get('window');


export default class Search extends Component{
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            clockwork: [],
            color: [],
            albert: [],
            checked: false,
            setSelection: false, 
            idClock: '',
            selectedColor: "",
            selectedAlbert:"",

        }
        for( var i =0; i< this.state.clockwork.length; i++){
            this.state.clockwork[i].checked=false
        }
    }
    fetchData = async () => {    
        var TEMP_TOKEN = await AsyncStorage.getItem("id_token");
        fetch("https://shopwatchdut.herokuapp.com/api/clockwork/", {
            method:"GET",
            headers: {
                'Authorization': 'Bearer ' + TEMP_TOKEN
              },
        }
        ).then((response) => response.json())
        .then((responseData) => {
            console.log(responseData);
            this.setState({clockwork: responseData.data});
        }).catch((error) => {
            console.log("Error");
        });
        
        fetch("https://shopwatchdut.herokuapp.com/api/color/", {
            method:"GET",
            headers: {
                'Authorization': 'Bearer ' + TEMP_TOKEN
              },
        }
        ).then((response) => response.json())
        .then((responseData) => {
            console.log(responseData);
            this.setState({color: responseData.data});
            
        }).catch((error) => {
            console.log("Error");
        });

        fetch("https://shopwatchdut.herokuapp.com/api/albert/", {
            method:"GET",
            headers: {
                'Authorization': 'Bearer ' + TEMP_TOKEN
              },
        }
        ).then((response) => response.json())
        .then((responseData) => {
            console.log(responseData);
            this.setState({albert: responseData.data});
            
        }).catch((error) => {
            console.log("Error");
        });

    }
    componentDidMount() {
        this.fetchData();
    }
    onChecked(id){
        
        const clockwork = this.state.clockwork
        const index = clockwork.findIndex(x =>x.id === id)
        const result = clockwork[index].checked
        for( var i =0; i< this.state.clockwork.length; i++){
            this.state.clockwork[i].checked=false
        }
        clockwork[index].checked = !result
        this.setState(clockwork)
        this.setState({idClock: index})
        
    }
    onSubmit = () => {
        const ind = parseInt(this.state.idClock)
        if (this.state.clockwork[ind].checked===true) console.log(this.state.clockwork[ind].name)
        
    }
    renderClock() {
        //console.log(this.state.idColor)
        return this.state.clockwork.map((item, key) => {
            return(  
                <TouchableOpacity style={{flexDirection:"row", alignItems:"center", margin:"-3%"}} key={key} onPress={()=>{this.onChecked(item.id)}}  >
                    <CheckBox 
                    onPress={()=>{this.onChecked(item.id)}}
                    checked={item.checked} 
                    />
                    <Text style={{fontWeight:"bold"}}>{item.name}</Text>
                </TouchableOpacity>
            )
        })
    }
    colorList = () =>{
        return(
            this.state.color.map((item, key) => {
                return(  
                    <Picker.Item key={key} value={item.color} label={item.color} style={{color:"black",backgroundColor:"white"}} />
                )
            }
        ))   
    }
    renderColor() {
        //console.log(this.state.idColor)
        return(  
            <View style={{flexDirection:"row", height:height/5, alignItems:"center",marginBottom:"-20%"}}>
                <View style={{borderWidth:1, backgroundColor:"white",borderColor:"grey",width:"57%",height:"40%", justifyContent:"center", marginLeft:"5%"}}>  
                    <Picker
                        selectedValue={this.state.selectedColor}
                        onValueChange={ (color) => ( this.setState({selectedColor:color}) ) } 
                        dropdownIconColor="black"
                        color= "white"
                        mode="dropdown"
                       
                        >
                        {this.colorList()}
                    </Picker>
                </View>
                
                
            </View>
        );
    }
    albertList = () => {
        return(
            this.state.albert.map((item, key) => {
                return(  
                    <Picker.Item key={key} value={item.name} label={item.name} style={{color:"black",backgroundColor:"white"}} />
                )
            }
        ))   
    }
    renderAlbert() {
        //console.log(this.state.idColor)
        return(  
            <View style={{flexDirection:"row",height:height/5, alignItems:"center",marginBottom:"-10%"}}>
                <View style={{borderWidth:1, backgroundColor:"white",borderColor:"grey",width:"57%",height:"40%", justifyContent:"center", marginLeft:"5%"}}>  
                    <Picker
                        selectedValue={this.state.selectedAlbert}
                        onValueChange={ (albert) => ( this.setState({selectedAlbert:albert}) ) } 
                        dropdownIconColor="black"
                        mode="dropdown"
                        >
                        {this.albertList()}
                    </Picker>
                </View>
                
                
            </View>
        );
    }
    updateSearch = (search) => {
        this.setState({search});
      };

    render(){
        console.log(this.state.color)
        return(

            <View style={styles.mainContainer}>
                <View style={styles.headerPro}>
                    <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                        <View style={{}}>
                            <Text>SEARCH</Text>
                        </View>                                        
                    </View>    
                </View>
                <View style={{width:"100%"}} >
                    <SearchBar
                        placeholder="Type Here..."
                        onChangeText={this.updateSearch}
                        value={this.state.search}
                        //round
                        searchIcon={{ size: 27 }}
                        style={styles.Search}
                    />
                </View>
                <View style={styles.wrapper}>
                    <Text>CLOCKWORK:</Text>
                    {this.renderClock()}
                    <View style={{flex:1,marginTop:"-8%"}}>
                        <View style={{height:height/8,flexDirection:"row", alignItems:"center"}}>
                            <View style={{flex:0.4}}>
                                <Text>COLOR:</Text>
                            </View>
                            <View style={{}}>
                                {this.renderColor()}
                            </View>
                            
                        </View>
                        <View style={{height:height/8,flexDirection:"row", alignItems:"center"}}>    
                            <View style={{flex:0.4}}>
                                <Text>ALBERT:</Text>
                            </View>
                            <View style={{}}>
                                {this.renderAlbert()}
                            </View>                        
                        </View>
                        
                    </View>
                    
                    <View style={styles.btnFrame}>
                                <TouchableOpacity style={styles.buyBtn} onPress={this.onSubmit}>
                                            <Text style={styles.Text}>FIND</Text>
                                </TouchableOpacity>
                            </View>
                </View>
                
            </View>
        )
    }
}
const styles = StyleSheet.create({
    mainContainer: {
        flex:1,
        flexDirection: 'column',
        elevation:1,
        alignItems: 'center',
        backgroundColor: '#DEE7EA',
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
    Search: {
        height:"10%"
    },
    wrapper: {
        width: '95%',
        height: height*0.8,
        backgroundColor: '#DEE7EA',
        //borderRadius: 10,
        paddingTop: '5%',
    },
    btnFrame: {
        width:'100%',
        //height: '50%',
    
        flexDirection: 'row',
        //justifyContent: "flex-end",
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
        borderTopLeftRadius:10,
        borderBottomRightRadius:10,

    },
    Text: {
        color: 'white',
    },
})