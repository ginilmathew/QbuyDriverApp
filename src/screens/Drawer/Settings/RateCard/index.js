import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useCallback, useState } from 'react'
import CommonDatePicker from '../../../../Components/CommonDatePicker'
import CommonTexts from '../../../../Components/CommonTexts'
import HeaderWithTitle from '../../../../Components/HeaderWithTitle'
import moment from 'moment';
import DetailsBox from '../../../../Components/DetailsBox'
import ChargesTableHeading from './ChargesTableHeading'
import SurgeChargeList from './SurgeChargeList'

const RateCard = ({navigation}) => {

    const [date, setDate] = useState(new Date())
    const [openCalendar, setOpenCalendar] = useState(false)

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


    const chargeList = [
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
            <HeaderWithTitle title={'Rate Card'} backAction />
            <View style={{ flex: 1, backgroundColor: '#fff', }}>
                <ScrollView style={{ backgroundColor: '#fff', marginBottom: 80 }} showsVerticalScrollIndicator={false}>
                    <View style={{ paddingHorizontal: 15, }}>
                        <CommonDatePicker
                            onPress={calendarOpen}
                            date={date ? date : new Date()}
                            label={moment(date).format("DD-MM-YYYY")}
                            openCalendar={openCalendar}
                            onConfirm={selectDate}
                            onCancel={calendarClose}
                            mb={10}
                        />
                        <DetailsBox
                            bgBox={'#58D36E'}
                            count={55}
                            label='Order Pay'
                            unit={'₹'}
                            leftElement
                            wid={85}
                        />
                        <DetailsBox
                            bgBox={'#BFC65C'}
                            bg={'#eef0d5'}
                            count={100}
                            label='Heavy Rain'
                            unit={'₹'}
                            wid={85}
                            ht={85}
                            leftElement
                            Franchisee={'Qbuy Kollam'}
                            surgeCharge='This is a surge charge given due to heavy rain in the particular location'
                            status={'ACTIVE'}
                        />
                        <DetailsBox
                            bgBox={'#BFC65C'}
                            bg={'#eef0d5'}
                            count={100}
                            label='Traffic Block'
                            unit={'₹'}
                            wid={85}
                            ht={85}
                            leftElement
                            Franchisee={'Qbuy Trivandrum'}
                            surgeCharge='This is a surge charge given due to heavy traffic in the particular location'
                            status={'ACTIVE'}
                        />
                    </View>
                    <View style={styles.border} />
                    <CommonTexts label={'Surge Charges'} fontSize={15} ml={15} mb={7}/>
                    <ChargesTableHeading/>
                    {chargeList?.map((item, index)=>(<SurgeChargeList item={item} key={index}/>))}

                </ScrollView>
            </View>
        </>
    )
}

export default RateCard

const styles = StyleSheet.create({
    border: {  
        height: 4,
        backgroundColor: '#0D4E810D', 
        marginVertical:20,
    }
})