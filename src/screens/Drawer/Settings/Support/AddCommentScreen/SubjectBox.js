import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CommonTexts from '../../../../../Components/CommonTexts'

const SubjectBox = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <CommonTexts label={'Subject'} fontSize={15} />
                <Text style={styles.dateText}>22/05/2022 10:30am</Text>
            </View>
            <Text style={styles.content}>Vehicle Repair Under Process</Text>
        </View>
    )
}

export default SubjectBox

const styles = StyleSheet.create({
    container: { 
        backgroundColor: '#00000014', 
        padding: 10 
    },
    header: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
    },
    dateText: { 
        fontFamily: 'Poppins-Regular', 
        fontSize: 10, 
        color: '#8D8D8D' 
    },
    content: { 
        fontFamily: 'Poppins-Regular', 
        fontSize: 10, 
        color: '#23233C', 
        marginTop: 5 
    }
})