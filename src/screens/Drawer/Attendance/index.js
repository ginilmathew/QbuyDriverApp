import { StyleSheet, Text, Image, ScrollView, View, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

import HeaderWithTitle from '../../../Components/HeaderWithTitle'
import CommonSelectDropdown from '../../../Components/CommonSelectDropdown'

import TableHeading from './TableHeading'
import HistoryList from './HistoryList'
import DetailsBox from '../../../Components/DetailsBox'


const Attendance = ({ navigation }) => {

    const { width } = useWindowDimensions()

    const [selectedMonth, SetSelectedMonth] = useState(null);
    const [selectedYear, SetSelectedYear] = useState(null);


    // console.log({ selectedMonth, selectedYear })


    const months = [
        { label: 'January', value: '1' },
        { label: 'February', value: '2' },
        { label: 'March', value: '3' },
        { label: 'April', value: '4' },
        { label: 'May', value: '5' },
        { label: 'June', value: '6' },
        { label: 'July', value: '7' },
        { label: 'August', value: '8' },
        { label: 'September', value: '9' },
        { label: 'October', value: '10' },
        { label: 'November', value: '11' },
        { label: 'December', value: '12' },
    ];

    const year = [
        { label: '2020', value: '1' },
        { label: '2021', value: '2' },
        { label: '2022', value: '3' },
        { label: '2023', value: '4' },
    ];

    const attendanceList = [
        { date: '20/05/2022', id: '1' },
        { date: '21/05/2022', id: '2' },
        { date: '22/05/2022', id: '3' },
        { date: '23/05/2022', id: '4' },
        { date: '24/05/2022', id: '5' },
        { date: '25/05/2022', id: '6' },
        { date: '26/05/2022', id: '7' },
    ];

    return (
        <>
            <HeaderWithTitle title={'Attendance'} drawerOpen={() => navigation.openDrawer()} />
            <ScrollView style={{ backgroundColor: '#F3F3F3', }}>
                <View style={{ paddingHorizontal: 15, }}>
                    <View style={{ flexDirection: 'row', marginTop: 15, justifyContent: 'space-between' }}>
                        <CommonSelectDropdown
                            topLabel={'Month'}
                            mb={20}
                            data={months}
                            value={selectedMonth}
                            setValue={SetSelectedMonth}
                            width={width / 2.25}
                        />
                        <CommonSelectDropdown
                            topLabel={'Year'}
                            mb={20}
                            data={year}
                            value={selectedYear}
                            setValue={SetSelectedYear}
                            width={width / 2.25}
                        />
                    </View>
                    <DetailsBox
                        count={125}
                        label='Total Attendance'
                        alignSelf={'center'}
                    />
                    <DetailsBox
                        bg={'#fae1e1'}
                        bgBox={'#FF6565'}
                        count={55}
                        label='Total Days Absent'
                        alignSelf={'center'}
                    />
                </View>
                <View style={styles.border}/>
                <Text style={styles.attndHistory}>{'Attendance History'}</Text>

                <TableHeading/>

                {attendanceList?.map((item, index)=>(<HistoryList item={item} key={index}/>))}

                

            </ScrollView>
        </>
    )
}

export default Attendance

const styles = StyleSheet.create({
    logo: {
        width: 22,
        height: 22,
    },
    border: { 
        height: 4, 
        backgroundColor: '#0D4E810D', 
        marginTop:20 
    },
    attndHistory: { 
        fontFamily: 'Poppins-SemiBold', 
        color: '#000000', 
        fontSize: 15, 
        padding:15
    }
})