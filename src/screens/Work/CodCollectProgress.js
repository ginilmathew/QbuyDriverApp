import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CodCollectProgress = ({ amount }) => {
    return (
        <View
            style={{ flexDirection: 'row', borderTopWidth: 1, borderColor: amount === 1000 ? '#FF7B7B' : '#FFB83FA6', borderBottomRightRadius: 15, height: 25, }}
        >
            <View
                style={{
                    backgroundColor: amount >= 1000 ? '#FF7B7B' :  amount <= 0 ? 'transparent' : '#FFB83FA6',
                    width: amount <= 100 ? '10%' : amount <= 200 ? '20%' : amount <= 300 ? '30%' : amount <= 400 ? '40%' : amount <= 500 ? '50%' : amount <= 600 ? '60%' : amount <= 700 ? '70%' : amount <= 800 ? '80%' : amount <= 900 ? '90%' : amount < 1000 ? '90%' : '100%',
                    borderBottomLeftRadius: 15,
                    borderBottomRightRadius: amount >= 1000 ? 15 : 0,
                    height: 25
                }}
            >
            </View>
        </View>
    )
}

export default CodCollectProgress

const styles = StyleSheet.create({})