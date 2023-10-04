import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

const CustomerDetailsBox = () => {

    const callCustomer = useCallback(() => {
        let phoneNumber = '';
        if (Platform.OS === 'android') {
            phoneNumber = `tel:+${12255}`;
        } else {
            phoneNumber = `telprompt:+${1265}`;
        }
        Linking.openURL(phoneNumber);
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.boldText}>{'Customer Details'}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.mediumText}>{'Order ID '}</Text>
                    <Text style={styles.boldText}>{'#10765'}</Text>
                </View>
            </View>
            <View style={{ paddingHorizontal: 10 }}>
                <View style={{ flexDirection: 'row', marginTop: 3 }}>
                    <Text style={styles.regularText}>{'Name : '}</Text>
                    <Text style={styles.nameText}>{'Shaan Nigam'}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 3 }}>
                    <Text style={styles.regularText}>{'Location : '}</Text>
                    <Text style={styles.addrText}>{'Neendakara - Chinnakkada Rd, Kavanad, Kollam, Kerala 691003'}</Text>
                </View>
                <TouchableOpacity
                    onPress={callCustomer}
                    style={styles.callContainer}
                >
                    <Ionicons name='ios-call' color='#fff' size={15} />
                    <Text style={styles.callText}>{'Call Customer'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CustomerDetailsBox

const styles = StyleSheet.create({
    container: { 
        borderRadius: 15, 
        backgroundColor: '#fff', 
        shadowOpacity: 0.2, 
        shadowOffset: { height: 1, width: 1 },
        marginTop: 10, 
        elevation: 1, 
        marginHorizontal: 2, 
        paddingBottom: 5, 
        marginBottom: 5 
    },
    header: { 
        flexDirection: 'row', 
        borderTopRightRadius: 15, 
        borderTopLeftRadius: 15, 
        backgroundColor: '#F8F8F8', 
        paddingHorizontal: 10, 
        paddingVertical: 5, 
        justifyContent: 'space-between', 
        alignItems: 'center' 
    },
    boldText: { 
        fontFamily: 'Poppins-Bold', 
        fontSize: 11, 
        color: '#23233C' 
    },
    mediumText: { 
        fontFamily: 'Poppins-Medium', 
        fontSize: 10, 
        color: '#23233C' 
    },
    regularText: { 
        fontFamily: 'Poppins-Regular', 
        fontSize: 10, 
        color: '#23233C' 
    },
    nameText: { 
        fontFamily: 'Poppins-SemiBold', 
        fontSize: 10, 
        color: '#23233C' 
    },
    addrText: { 
        fontFamily: 'Poppins-SemiBold', 
        fontSize: 10, 
        color: '#23233C', 
        paddingRight: 60 
    },
    callContainer: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        borderRadius: 5, 
        padding: 5, 
        backgroundColor: '#576FD0', 
        alignSelf: 'flex-end' 
    },
    callText: { 
        fontFamily: 'Poppins-SemiBold', 
        fontSize: 11, 
        color: '#fff', 
        marginLeft: 3 
    }

})
