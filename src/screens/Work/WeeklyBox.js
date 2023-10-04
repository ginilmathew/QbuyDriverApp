import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const WeeklyBox = () => {
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <View style={styles.topBoxes}>
                    <Text style={styles.titleText}>Total Orders</Text>
                    <Text style={{fontFamily:'Poppins-Bold', fontSize:17, color:'#1675C8'}}>5000</Text>
                </View>
                <View style={styles.topBoxes}>
                    <Text style={styles.titleText}>Total Earnings</Text>
                    <Text style={{fontFamily:'Poppins-Bold', fontSize:17, color:'#2EA10C'}}>25000</Text>
                </View>
                <View style={styles.topBoxRight}>
                    <Text style={styles.titleText}>Total Login Hrs</Text>
                    <Text style={{fontFamily:'Poppins-Bold', fontSize:17, color:'#C311CA'}}>5</Text>
                </View>
            </View>
            <View style={styles.bottom}>
                <View style={styles.bottomBoxLeft}>
                    <Text style={styles.titleText}>Total Denials</Text>
                    <Text style={{fontFamily:'Poppins-Bold', fontSize:17, color:'#FC2020'}}>1</Text>
                </View>
                <View style={styles.bottomBoxRight}>
                    <Text style={styles.titleText}>Total Cancellations</Text>
                    <Text style={{fontFamily:'Poppins-Bold', fontSize:17, color:'#A10C0C'}}>23</Text>
                </View>
            </View>
        </View>
    )
}

export default WeeklyBox

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        backgroundColor: '#fff',
        shadowOpacity: 0.2,
        shadowOffset: { height: 1, width: 1 },
        marginBottom: 17,
        elevation: 1,
        marginHorizontal: 1,
        height: 150,
        padding: 10
    },
    top: { 
        flex: 0.5, 
        borderBottomWidth: 1, 
        borderColor: '#F3F3F3', 
        flexDirection: 'row', 
        paddingBottom: 5 
    },
    topBoxes: { 
        flex: 0.33, 
        borderRightWidth: 1, 
        borderColor: '#F3F3F3', 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    topBoxRight: { 
        flex: 0.33, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    bottom: { 
        flex: 0.5, 
        flexDirection: 'row', 
        paddingTop: 5 
    },
    bottomBoxLeft: { 
        flex: 0.5, 
        borderRightWidth: 1, 
        borderColor: '#F3F3F3', 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    bottomBoxRight: { 
        flex: 0.5, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    titleText: {
        fontFamily:'Poppins-Regular', 
        fontSize:12, 
        color:'#000000'
    }
})