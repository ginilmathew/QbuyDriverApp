import { StyleSheet, Text, Image, ScrollView, View, useWindowDimensions } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import moment from 'moment';
import HeaderWithTitle from '../../../Components/HeaderWithTitle'
import CommonDatePicker from '../../../Components/CommonDatePicker'
import CommonTexts from '../../../Components/CommonTexts';
import ReservationCard from './ReservationCard';


const Reservation = ({ navigation }) => {

    const{width}= useWindowDimensions()

    const [date, setDate] = useState(new Date())
    const [openCalendar, setOpenCalendar] = useState(false)

    const [reseredList, setReservedList] = useState([])
    const [completedList, setCompletedList] = useState([])

    let reservations = [
        {
            id: '1',
            status: 'Reserved',
            date : '22/05/2022 10:30am'
        },
        {
            id: '2',
            status: 'Reservation Completed',
            date : '28/03/2022 11:30am'
        },
        {
            id: '3',
            status: 'Reservation Completed',
            date : '12/11/2022 10:20am'
        },
        {
            id: '4',
            status: 'Reserved',
            date : '02/03/2023 09:30am'
        },
        {
            id: '5',
            status: 'Reservation Completed',
            date : '01/02/2023 11:10am'
        },
    ]

    useEffect(() => {
        reserved = reservations.filter(item=>item.status === 'Reserved')
        let sortedReserved = reserved.sort(function(a,b){
            return moment(`${b.date}`, "DD-MM-YYYY") - moment(`${a.date}`, "DD-MM-YYYY");
        });
        setReservedList(sortedReserved)

        completed = reservations.filter(item=>item.status === 'Reservation Completed')

        let sortedCompleted = completed.sort(function(a,b){
            return moment(`${b.date}`, "DD-MM-YYYY") - moment(`${a.date}`, "DD-MM-YYYY");
        });
        setCompletedList(sortedCompleted)
    }, [])

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

    const openDrawer = useCallback(() => {
        navigation.openDrawer()
    }, [])

    return (
        <>
            <HeaderWithTitle title={'Reservation'} drawerOpen={openDrawer} />
            <View style={{flex:1, backgroundColor: '#F3F3F3', }}>
                <ScrollView style={{ backgroundColor: '#F3F3F3', marginBottom:80 }} showsVerticalScrollIndicator={false}>
                    <View style={{paddingHorizontal:15, }}>
                        <CommonDatePicker
                            onPress={calendarOpen}
                            date={ date ? date : new Date()}
                            label={moment(date).format("DD-MM-YYYY")}
                            openCalendar={openCalendar}
                            onConfirm={selectDate}
                            onCancel={calendarClose}
                            mb={10}
                        />
                        {reseredList?.map((item, index)=>(<ReservationCard item={item} key={index}/>))}
                    </View>
                    <View style={styles.border}/>
                    <View style={{paddingHorizontal:15, }}>
                        <Text style={styles.semiBoldText}>Reservation History</Text>
                        {completedList?.map((item, index)=>(<ReservationCard item={item} key={index}/>))}
                    </View>
                </ScrollView>
            </View>
        </>
    )
}

export default Reservation

const styles = StyleSheet.create({
	logo: {
		width: 22,
		height: 22,
	},    
    semiBoldText: {
        fontFamily: 'Poppins-SemiBold',
        color: '#000',
        fontSize: 15,
        marginBottom:10
    },
    regularText: {
        fontFamily: 'Poppins-Regular',
        color: '#23233C',
        fontSize: 10,
    },
    border: {  
        height: 4,
        backgroundColor: '#0D4E810D', 
        marginVertical:10 
    }
})