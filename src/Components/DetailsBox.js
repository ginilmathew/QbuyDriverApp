import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React from 'react'

const DetailsBox = ({ count, label, bg, bgBox, wid, ht, unit, status, leftElement, Franchisee, surgeCharge }) => {
    const { width } = useWindowDimensions()

    return (
        <View
            style={{ flexDirection: 'row', backgroundColor: bg ? bg : '#d7fae4', borderRadius: 10, justifyContent: 'space-between', marginTop: 10 }}
        >
            <View style={{ alignSelf: 'center', marginLeft: 10, flex: 1 }}>
                <View style={{ flexDirection: 'row' }}>
                    {leftElement && <View
                        style={{ width: 20, height: 20, borderRadius: 20, backgroundColor: bgBox, marginRight: 7, alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Text style={{ color: '#fff', fontSize: 16, marginLeft: 1 }}>{'₹'}</Text>
                    </View>}
                    <Text
                        style={{ fontFamily: 'Poppins-SemiBold', color: '#000000', fontSize: 13, }}
                    >{label}</Text>

                </View>
                <View style={{ marginLeft: 27 }}>
                    {Franchisee && <Text style={styles.regularText}>Franchisee : {Franchisee}</Text>}
                    {surgeCharge && <Text style={styles.lightItalicText}>{surgeCharge}</Text>}
                </View>
                {status && <Text
                    style={{ fontFamily: 'Poppins-SemiBold', color: '#19B529', fontSize: 10, position: 'absolute', right: 15, top: 3 }}
                >{status}</Text>}
            </View>

            <View
                style={{ width: wid ? wid : width / 4.5, backgroundColor: bgBox ? bgBox : '#58D36E', borderRadius: 10, height: ht ? ht : 40, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                    <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fff', fontSize: 20, }}>{count}</Text>
                    <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fff', fontSize: 10, marginBottom: 5, marginLeft: 5 }}>{unit ? unit : 'days'}</Text>
                </View>
            </View>
        </View>
    )
}

export default DetailsBox

const styles = StyleSheet.create({
    regularText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 11,
        color: '#8D8D8D',
        marginVertical: 3
    },
    lightItalicText: {
        fontFamily: 'Poppins-LightItalic',
        fontSize: 9,
        color: '#000',
    }
})