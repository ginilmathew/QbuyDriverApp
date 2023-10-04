import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import OrderedItems from './OrderedItems'

const TotalBillBox = ({item}) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.boldText}>{'Aalife Restaurant'}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.mediumText}>{'Order ID '}</Text>
                    <Text style={styles.orderID}>{'#10765'}</Text>
                </View>
            </View>
            <View  style={{ backgroundColor: '#fff', marginTop: 5, }}>
                <View style={styles.innerHeader}>
                    <View style={{ flex: 0.7 }}>
                        <Text style={styles.semiBoldText}>{'Product'}</Text>
                    </View>
                    <View style={{ flex: 0.25 }}>
                        <Text style={styles.semiBoldText}>{'Qty'}</Text>
                    </View>
                    <View>
                        <Text style={styles.semiBoldText}>{'Price'}</Text>
                    </View>
                </View>
                {item?.map((item, index) =>  (<OrderedItems item={item} key={index}/>))}
            </View>
            <View style={styles.totalBox}>
                <Text style={styles.boldText}>{'Total Bill'}</Text>
                <Text style={styles.total}>₹ {'1320'}</Text>
            </View>
        </View>
    )
}

export default TotalBillBox

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
    orderID: { 
        fontFamily: 'Poppins-Bold', 
        fontSize: 10, 
        color: '#23233C' 
    },
    innerHeader: { 
        flexDirection: 'row', 
        borderBottomWidth: 2, 
        borderColor: '#F8F8F8', 
        paddingHorizontal: 10 
    },
    semiBoldText: {
        fontFamily: 'Poppins-SemiBold',
        color: '#23233C',
        fontSize: 11
    },
    totalBox: { 
        borderTopWidth: 2, 
        borderColor: '#F8F8F8', 
        justifyContent: 'space-between', 
        flexDirection: 'row', 
        paddingHorizontal: 10, 
        paddingVertical: 2
    },
    total: { 
        fontFamily: 'Poppins-Bold', 
        fontSize: 11, 
        color: '#2EA10C', 
        marginRight: 15 
    }
})