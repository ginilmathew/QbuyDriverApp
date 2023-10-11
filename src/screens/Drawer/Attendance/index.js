import { StyleSheet, Text, Image, ScrollView, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

import HeaderWithTitle from '../../../Components/HeaderWithTitle'

import TableHeading from './TableHeading'
import HistoryList from './HistoryList'
import DetailsBox from '../../../Components/DetailsBox'
import CommonDropdown from '../../../Components/CommonDropdown'
import customAxios from '../../../CustomeAxios'
import reactotron from 'reactotron-react-native'


const Attendance = ({ navigation }) => {

    const { width } = useWindowDimensions()

    const [selectedMonth, SetSelectedMonth] = useState(null);
    const [selectedYear, SetSelectedYear] = useState(null);

    const [newData, setNewData] = useState(null)

    reactotron.log(newData, "NEW")

    const [loading, setLoading] = useState(false)

    // console.log({ selectedMonth, selectedYear })

    useEffect(() => {
        getAttendance()
    }, [])

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

    const getAttendance = async () => {
        try {
            //setLoading(true);
            const attData = await customAxios.get(`rider/attendance`)
            if (attData?.data?.message === "Success") {
                reactotron.log(attData, "ATTTTT")
                setNewData(attData?.data?.data)
            } else {
                throw "Internal server error"
            }
            //setLoading(false);

        } catch (error) {
            //setIsLoading(false);
            if (error?.response) {
                // toast.show({
                //     description: error?.response?.data?.message,
                //     backgroundColor: 'error.400'
                // })
            }
            else {
                // toast.show({
                //     description: error,
                //     backgroundColor: 'error.400'
                // })
            }
        }
    }





    return (
        <>
            <HeaderWithTitle title={'Attendance'} drawerOpen={() => navigation.openDrawer()} />
            <ScrollView style={{ backgroundColor: '#fff' }}>
                <View style={{ paddingHorizontal: 15 }}>
                    <View style={{ flexDirection: 'row', marginTop: 15, justifyContent: 'space-between' }}>
                        <CommonDropdown
                            topLabel={'Month'}
                            mb={20}
                            data={months}
                            value={selectedMonth}
                            setValue={SetSelectedMonth}
                            width={width / 2.25}
                            placeholder="Eg:- January"
                        />
                        <CommonDropdown
                            topLabel={'Year'}
                            mb={20}
                            data={year}
                            value={selectedYear}
                            setValue={SetSelectedYear}
                            width={width / 2.25}
                            placeholder="Eg:- 2023"
                        />
                    </View>
                    <DetailsBox
                        count={newData?.total_attendance}
                        label='Total Attendance'
                        alignSelf={'center'}
                    />
                    <DetailsBox
                        bg={'#fae1e1'}
                        bgBox={'#FF6565'}
                        count={newData?.total_absent}
                        label='Total Days Absent'
                        alignSelf={'center'}
                    />
                </View>
                <View style={styles.border}/>
                <Text style={styles.attndHistory}>{'Attendance History'}</Text>

                <TableHeading/>

                {newData?.attendance_list?.map((item, index)=>(<HistoryList item={item} key={index}/>))}

                

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