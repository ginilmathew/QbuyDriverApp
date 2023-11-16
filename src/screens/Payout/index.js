import { StyleSheet, Text, ScrollView, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import HeaderWithTitle from '../../Components/HeaderWithTitle'
import moment from 'moment';
import CommonDatePicker from '../../Components/CommonDatePicker'
import PayoutCard from './PayoutCard'
import SelectTab from '../../Components/SelectTab';

const Payout = ({ navigation }) => {

    const [date, setDate] = useState(new Date())
    const [openCalendar, setOpenCalendar] = useState(false)
    const [currentTab, setCurrentTab] = useState(0)
    const [completeList, setCompleteList] = useState([])
    const [pendingList, setPendingList] = useState([])

    // console.log({pendingList})

    useEffect(() => {
        complete = payouts.filter(item=>item.status === 'Completed')
        let sortedCompleted = complete.sort(function(a,b){
            return moment(`${b.date}`, "DD-MM-YYYY") - moment(`${a.date}`, "DD-MM-YYYY");
        });
        setCompleteList(sortedCompleted)
        pendings = payouts.filter(item=>item.status === 'Pending')

        let sortedPending = pendings.sort(function(a,b){
            return moment(`${b.date}`, "DD-MM-YYYY") - moment(`${a.date}`, "DD-MM-YYYY");
        });
        setPendingList(sortedPending)
    }, [])


    let payouts = [
        // {
        //     id: '1',
        //     status: 'Completed',
        //     date : '22/05/2022'
        // },
        // {
        //     id: '2',
        //     status: 'Completed',
        //     date : '28/03/2022'
        // },
        // {
        //     id: '3',
        //     status: 'Pending',
        //     date : '12/11/2022'
        // },
        // {
        //     id: '4',
        //     status: 'Completed',
        //     date : '02/03/2023'
        // },
        // {
        //     id: '5',
        //     status: 'Pending',
        //     date : '01/02/2023'
        // },
    ]

    const calendarOpen = useCallback(() => {
        setOpenCalendar(true)
    }, [])

    const calendarClose = useCallback(() => {
        setOpenCalendar(false)
    }, [])

    const selectDate = useCallback((date) => {
        setOpenCalendar(false)
        setDate(date)
    }, [])

    const selectCompleted = useCallback(() => {
        setCurrentTab(0)
    }, [])

    const selectPending = useCallback(() => {
        setCurrentTab(1)
    }, [])

    const openDrawer = useCallback(() => {
        navigation.openDrawer()
    }, [])

    return (
        <>
            <HeaderWithTitle title={'Payout'} drawerOpen={openDrawer} />
            <View style={{flex:1, backgroundColor: '#F3F3F3', }}>
            <ScrollView style={{ backgroundColor: '#F3F3F3', paddingHorizontal: 15, marginBottom:80 }}>
                <CommonDatePicker
                    onPress={calendarOpen}
                    date={ date ? date : new Date()}
                    label={moment(date).format("DD-MM-YYYY")}
                    openCalendar={openCalendar}
                    onConfirm={selectDate}
                    onCancel={calendarClose}
                />
                <View style={styles.tabContainer}>
                    <SelectTab
                        label={"Completed"}
                        onPress={selectCompleted}
                        selected={currentTab === 0 ? true : false}
                    />
                    <SelectTab
                        label={"Pending"}
                        onPress={selectPending}
                        selected={currentTab === 1 ? true : false}
                    />
                </View>

                <View style={styles.border}/>

                {currentTab === 0 && 
                    <PayoutCard />
                }
                {currentTab === 1 &&
                    <PayoutCard />
                }
            </ScrollView>
            </View>
        </>
    )
}

export default Payout

const styles = StyleSheet.create({
    tabContainer: { 
        marginTop: 15, 
        flexDirection: 'row', 
        width: '60%', 
        justifyContent: 'space-between', 
        alignSelf: 'center'
    },
    border: { 
        backgroundColor: '#00000014', 
        height: 2, 
        marginTop: -1.5, 
        width: '60%', 
        alignSelf: 'center',
        marginBottom:10
    }
})