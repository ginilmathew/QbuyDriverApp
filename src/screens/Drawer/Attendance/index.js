import { StyleSheet, Text, Image, ScrollView, View, useWindowDimensions, RefreshControl, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

import HeaderWithTitle from '../../../Components/HeaderWithTitle'

import TableHeading from './TableHeading'
import HistoryList from './HistoryList'
import DetailsBox from '../../../Components/DetailsBox'
import CommonDropdown from '../../../Components/CommonDropdown'
import customAxios from '../../../CustomeAxios'
import reactotron from 'reactotron-react-native'
import Toast from 'react-native-toast-message'

const Attendance = ({ navigation }) => {

    const { width } = useWindowDimensions()

    const [selectedMonth, SetSelectedMonth] = useState(null);
    const [selectedYear, SetSelectedYear] = useState(null);
    const [newData, setNewData] = useState('')
    const [years, setYears] = useState(null)

    const [isfilteredData, setIsFilteredData] = useState(null);
    //const [noDataFound, setNoDataFound] = useState(false);
    const [showClearButton, setShowClearButton] = useState(false);

    reactotron.log(newData, "DATA")
    reactotron.log(isfilteredData, "isfilteredData")

    const [loading, setLoading] = useState(false)

    reactotron.log(selectedMonth, "selectedMonth")
    reactotron.log(selectedYear, "selectedYear")

    useEffect(() => {
        getAttendance()
        yearData()
    }, [])

    useEffect(() => {
        if (selectedMonth !== null && selectedYear !== null) {
            filterData();
            setShowClearButton(true); // Show clear button
        } else {
            setShowClearButton(false); // Hide clear button
        }
    }, [selectedMonth, selectedYear]);

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
            Toast.show({
                type: 'error',
                text1: error
            });
        } finally {
            setLoading(false);
        }
    }

    const filterData = async () => {

        let data = {
            month: selectedMonth,
            year: selectedYear,
        }

        if (loading) return;
        setLoading(true);

        try {
            const filteredData = await customAxios.post(`rider/attendance-filter`, data)
            reactotron.log(filteredData, "FLITER")
            if (filteredData?.data?.message === "Success") {
                if (filteredData?.data?.data) {
                    setIsFilteredData(filteredData?.data?.data);
                }
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: error
            });
        } finally {
            setLoading(false);
        }
    }

    const yearData = async () => {
        try {
            const yrsData = await customAxios.get(`rider/get-year`)
            if (yrsData?.data?.message === "Success") {
                setYears(yrsData?.data?.data || [])
            } else {
                throw "Internal server error"
            }
        }
        catch (error) {
            Toast.show({
                type: 'error',
                text1: error
            });
        }
    }

    const clearFilter = () => {
        SetSelectedMonth(null);
        SetSelectedYear(null);
        setIsFilteredData(null);
        setShowClearButton(false);
    }

    const filterProcess = () => {
        return (
            <>
                {isfilteredData?.attendance_list?.map((item, index) => (
                    <HistoryList item={item} key={index} />
                ))}
            </>
        )
    }

    const dataProcess = () => {
        return (
            <>
                {newData?.attendance_list?.map((item, index) => (
                    <HistoryList item={item} key={index} />
                ))}
            </>
        )
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
                            data={years || []}
                            value={selectedYear}
                            setValue={SetSelectedYear}
                            width={width / 2.25}
                            placeholder="Eg:- 2023"
                        />
                    </View>
                    <View style={{ alignItems: "flex-end" }}>
                        {showClearButton && (
                            <TouchableOpacity
                                title="Clear Filter"
                                onPress={() => clearFilter()}
                                style={styles.clearStyle}
                            >
                                <Text style={{ fontSize: 15, color: "white", fontFamily: "Poppins-Medium", marginTop: 3, marginRight: 5 }}>Clear</Text>
                                <Ionicons name='close' color='white' size={25} />
                            </TouchableOpacity>
                        )}
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
                {isfilteredData?.attendance_list?.length === 0 ? (
                    <View style={{alignItems: "center", gap: 8}}>
                    <Ionicons name='alert-circle' color='#D2D2D2' size={50} />
                    <Text style={styles.noDataMessage}>No Attendance Found!</Text>
                    </View>
                    
                ) : (
                    <>
                        <TableHeading />
                        {isfilteredData ? filterProcess() : dataProcess()}
                    </>
                )}

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
    },
    item: {
        paddingVertical: 17,
        paddingHorizontal: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
    },
    noDataMessage: {
        fontSize: 20,
        color: "#D2D2D2",
        fontFamily: "Poppins-SemiBold"
    },
    clearStyle: {
        backgroundColor: "red",
        marginTop: -10,
        paddingHorizontal: 10,
        paddingVertical: 3,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        flexDirection: "row"
    }
})