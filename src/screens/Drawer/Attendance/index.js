import { StyleSheet, Text, Image, ScrollView, View, useWindowDimensions, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

import HeaderWithTitle from '../../../Components/HeaderWithTitle'

import TableHeading from './TableHeading'
import HistoryList from './HistoryList'
import DetailsBox from '../../../Components/DetailsBox'
import CommonDropdown from '../../../Components/CommonDropdown'
import customAxios from '../../../CustomeAxios'
import reactotron from 'reactotron-react-native'
import { useToast } from 'native-base';


const Attendance = ({ navigation }) => {

    const { width } = useWindowDimensions()
    const toast = useToast()

    const [selectedMonth, SetSelectedMonth] = useState(null);
    const [selectedYear, SetSelectedYear] = useState(null);
    const [newData, setNewData] = useState(null)
    const [years, setYears] = useState(null)

    reactotron.log(years,"KGKU:FDJK")

    const [loading, setLoading] = useState(false)

    reactotron.log(selectedMonth, "selectedMonth")
    reactotron.log(selectedYear, "selectedYear")

    useEffect(() => {
        getAttendance()
        yearData()
    }, [])

    useEffect(() => {
        if (selectedMonth && selectedYear) {
            filterData()
        }
    }, [selectedMonth, selectedYear])

    const months = [
        { label: '01', value: '1' },
        { label: '02', value: '2' },
        { label: '03', value: '3' },
        { label: '04', value: '4' },
        { label: '05', value: '5' },
        { label: '06', value: '6' },
        { label: '07', value: '7' },
        { label: '08', value: '8' },
        { label: '09', value: '9' },
        { label: '10', value: '10' },
        { label: '11', value: '11' },
        { label: '12', value: '12' },
    ];

    const year = [
        { label: '2020', value: '1' },
        { label: '2021', value: '2' },
        { label: '2022', value: '3' },
        { label: '2023', value: '4' },
    ];

    const getAttendance = async () => {
        setLoading(true);
        try {
            const attData = await customAxios.get(`rider/attendance`)
            if (attData?.data?.message === "Success") {
                reactotron.log(attData, "ATTTTT")
                setNewData(attData?.data?.data)
            } else {
                throw "Internal server error"
            }

        } catch (error) {
            if (error) {
                toast.show({
                    title: error,
                    backgroundColor: "error.400",
                    duration: 1500
                })
            }
            else {
                toast.show({
                    description: error,
                    backgroundColor: 'error.400'
                })
            }
        } finally {
            setLoading(false);
        }
    }

    const filterData = async () => {

        let data = {
            month: selectedMonth,
            year: selectedYear,
        }

        //if (loading) return;
        //setLoading(true);

        try {
            const filteredData = await customAxios.post(`rider/attendance-filter`, data)
            reactotron.log(filteredData, "FLITER")
            // if (filteredData?.data?.status === 200) {
            //     if (filteredData?.data?.data) {
            //         //setNewData(filteredData?.data?.data)
            //     }
            //     else {
            //        // setSearchResults([])
            //     }
            // }

        } catch (error) {
            if (error) {
                toast.show({
                    description: error,
                    backgroundColor: 'error.400'
                })
            }
            else {
                toast.show({
                    description: error,
                    backgroundColor: 'error.400'
                })
            }
        }
    }

    const yearData = async () => {
        try {
            const yrsData = await customAxios.get(`rider/get-year`)
            if (yrsData?.data?.message === "Success") {
                setYears(yrsData?.data?.data)
            } else {
                throw "Internal server error"
            }
        }
        catch (error) {
            if (error) {
                toast.show({
                    title: error,
                    backgroundColor: "error.400",
                    duration: 1500
                })
            }
            else {
                toast.show({
                    description: error,
                    backgroundColor: 'error.400'
                })
            }
        }
    }

    return (
        <>
            <HeaderWithTitle title={'Attendance'} drawerOpen={() => navigation.openDrawer()} />
            <ScrollView style={{ backgroundColor: '#fff' }} refreshControl={<RefreshControl refreshing={loading} onRefresh={getAttendance} />}>
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
                <View style={styles.border} />
                <Text style={styles.attndHistory}>{'Attendance History'}</Text>

                <TableHeading />

                {newData?.attendance_list?.map((item, index) => (<HistoryList item={item} key={index} />))}

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
        marginTop: 20
    },
    attndHistory: {
        fontFamily: 'Poppins-SemiBold',
        color: '#000000',
        fontSize: 15,
        padding: 15
    }
})