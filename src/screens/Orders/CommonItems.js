import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import reactotron from 'reactotron-react-native'

const CommonItems = memo(({item, type}) => {

    reactotron.log(type, "TYPE")
    return (
        <View style={{ flexDirection: 'row', paddingTop: 5, paddingBottom: 5, paddingLeft: 10,}}>
            <View style={{ flex: 0.76 }}>
                <Text style={styles.mediumText}>{item?.name}</Text>
            </View>
            <View style={{ flex:  0.28 }}>
                <Text style={styles.mediumText}>{item?.quantity}</Text>
            </View>
            {/* {type === "Ready Cash" ? (<View style={{ flex: 0.40 }}>
                <Text style={styles.mediumText}>{item?.seller_price}</Text>
            </View>) : null} */}
            <View style={{ flex: 0.15 }}>
                <Text style={styles.mediumText}>{item?.regular_price}</Text>
            </View>
        </View>
    )
})

export default CommonItems

const styles = StyleSheet.create({
    mediumText: {
        fontFamily: 'Poppins-Medium',
        color: '#23233C',
        fontSize: 10
    }
})