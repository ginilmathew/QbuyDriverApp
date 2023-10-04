import { StyleSheet, View, Text, FlatList, useWindowDimensions, Image } from 'react-native'
import React from 'react'

const Comments = () => {

    const {width} = useWindowDimensions()

    const datas = [
        {   id: 1, 
            receive:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            receiveTime:"8:30 AM, Today",           
            send:'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            sendTime:'8:32 AM, Today'
        },
        
    ]      

    const renderItems = ({item}) => {    
    return(
        <View>
            <View style={{marginVertical:10, flexDirection:'row', alignSelf:'flex-end'}} >
                <View style={{alignItems:'flex-end'}}>
                    <Text 
                        style={{fontSize:8, color:'#F71C1C', fontFamily:'Montserrat-Medium', marginBottom:2 }}
                    >{item.sendTime}</Text>
                    <View 
                        style={{backgroundColor:'#DFEFE2', padding:10, borderRadius:15, borderTopRightRadius:0, maxWidth: width-100}}
                    >   
                        <Text  style={{ fontSize:11, color:'#0A2638', fontFamily:'Nunito-SemiBold' }}>{item.send}</Text>
                    </View>
                </View>
                <View 
                    style={{width:30, height:30, borderRadius:15, backgroundColor:'#58D36E', alignItems:'center', justifyContent:'center', marginTop:10, marginLeft:5}}
                >
                    <Image
                        style={styles.logo}
                        source={require('../../../../../Images/logo.png')}
                    />
                </View>
            </View>
            <View style={{marginVertical:5, flexDirection:'row',}}>
                <Image
                    style={{width:30, height:30, borderRadius:15, marginRight:5, marginTop:10}}
                    source={require('../../../../../Images/men.jpg')}
                />
                
                <View >
                    <Text  
                        style={{ fontSize:8, color:'#F81C1C', fontFamily:'Montserrat-Medium', marginBottom:2 }}
                    >{item.receiveTime}</Text>
                    <View 
                        style={{alignSelf:'flex-start', backgroundColor:'#DFEFE2', padding:10, borderRadius:15, borderTopLeftRadius:0, maxWidth: width-100  }}
                    >   
                        <Text style={{ fontSize:11, color:'#0A2638', fontFamily:'Nunito-SemiBold' }}>{item.receive}</Text>
                    </View>
                </View>
            </View>
            
        </View>
            
        )
    }

        return (
        
            <FlatList 
                data={datas}
                keyExtractor={(item) => item.id}
                renderItem={renderItems}
                
            />  
        )
    }

export default Comments

const styles = StyleSheet.create({
    logo: {
		width: 30,
		height: 30,
		resizeMode: 'contain',
        marginTop:7
	},
})