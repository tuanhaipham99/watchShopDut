import React, {Component} from 'react';
import {View, Text, StyleSheet, ImageBackground, Dimensions, TextInput, TouchableOpacity, FlatList, Image} from 'react-native';

const {width} = Dimensions.get('window');
const height = width * 0.5;

const productWidth = width-20;
const productHeight = width / 2 -15;
export default class ProductList extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            data: {
                // {id: 1, name: 'Đồng hồ thụy sĩ',image: require('../../assets/productImage/watch1.jpg')},
                // {id: 2, name: 'Đồng hồ Đức', image: require('../../assets/productImage/watch2.jpg')},
                // {id: 3, name: 'Đồng hồ 3', image: require('../../assets/productImage/watch3.jpg')},
                // {id: 4, name: 'Đồng hồ 3', image: require('../../assets/productImage/watch3.jpg')},
            }
        };
    }
    
    Click = (idItem) => {
        this.props.navigation.navigate("Product", {id: idItem});
        
    }
    fetchData = async () => {
        const response = await fetch("https://shopwatchdut.herokuapp.com/api/product/")
        const json = await response.json()
        if (this.props.category==="men") {
            this.setState({ data: json.data.filter(item => item.sex !== false) });
        }
        else if (this.props.category==="women"){
            this.setState({ data: json.data.filter(item => item.sex !== true) });
        }
        else this.setState({data: json.data}) 
    }
    componentDidMount() {
        this.fetchData();
    }
    
    render() {
        
        return(
            <View style={{flex:1, width: productWidth, height: productHeight, paddingHorizontal:20}}>
                <FlatList
                    //contentContainerStyle = {{padding: 15}} 
                    columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 10, marginRight:10}}
                    numColumns = {2}
                    keyExtractor = {(item) => item.id}
                    data={this.state.data}                
                    renderItem = {({item}) => (
                        <TouchableOpacity onPress={() => this.Click(item.id)} >
                            <View style={{}}>
                                <View style={styles.frameImage}>                                
                                    <Image source={{uri:item.image}} style={styles.productImg}></Image>
                                    <Text style={styles.text}> {item.name}</Text>
                                    <View style={{justifyContent:"flex-end", flex:1}}><Text style={styles.price}>{item.price}</Text></View>                                    
                                </View>                            
                            </View>
                        </TouchableOpacity>         
                    )}
                />
            </View>
        )
        
    }
    
}

const imageWidth = width/2.5;
const imageHeight = width /2.5;
const styles = StyleSheet.create({
    productImg: {
        resizeMode: 'stretch',
        width: imageWidth,
        height: imageHeight,
        borderColor: "#868B8B",
        borderWidth:0.2,

    },
    frameImage: {
        flex:1,
        backgroundColor: 'white',
        width: imageWidth,
        height: imageHeight+width/4.5,
        // borderRadius: 5,
        shadowColor: '#2E272B',
        borderColor: "#868B8B",
        borderWidth:0.2,
        
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
        color:'red',
    }
})