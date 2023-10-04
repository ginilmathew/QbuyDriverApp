import { StyleSheet, Text, ScrollView, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import moment from 'moment';
import HeaderWithTitle from '../../../../Components/HeaderWithTitle';
import SelectTab from '../../../../Components/SelectTab';
import CommonDatePicker from '../../../../Components/CommonDatePicker';
import TicketCard from './TicketCard';
import CustomButton from '../../../../Components/CustomButton';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import CommonInput from '../../../../Components/CommonInput';
import CommonModal from '../../../../Components/CommonModal';
import CommonTexts from '../../../../Components/CommonTexts';

const Support = ({ navigation }) => {

    const {width} = useWindowDimensions()

    const [modalVisible, setModalVisible] = useState(false);
    const [date, setDate] = useState(new Date())
    const [openCalendar, setOpenCalendar] = useState(false)
    const [currentTab, setCurrentTab] = useState(0)

    const [openTicket, setOpenTicket] = useState([])
    const [closedTicket, setClosedTicket] = useState([])


	const schema = yup.object({
		subject: yup.string().min(8).required('Subject is required'),
	}).required();

	const { control, handleSubmit, formState: { errors }, setValue } = useForm({
		resolver: yupResolver(schema)
	});



    // console.log({pendingList})

    useEffect(() => {
        open = tickets.filter(item=>item.status === 'open')
        let openTicket = open.sort(function(a,b){
            return moment(`${b.date}`, "DD-MM-YYYY") - moment(`${a.date}`, "DD-MM-YYYY");
        });
        setOpenTicket(openTicket)
        closed = tickets.filter(item=>item.status === 'closed')
        let closedTicket = closed.sort(function(a,b){
            return moment(`${b.date}`, "DD-MM-YYYY") - moment(`${a.date}`, "DD-MM-YYYY");
        });
        setClosedTicket(closedTicket)
    }, [])


    let tickets = [
        {
            id: '#220',
            status: 'open',
            date : '22/05/2022'
        },
        {
            id: '#221',
            status: 'open',
            date : '28/03/2022'
        },
        {
            id: '#222',
            status: 'closed',
            date : '12/11/2022'
        },
        {
            id: '#223',
            status: 'open',
            date : '02/03/2023'
        },
        {
            id: '#224',
            status: 'closed',
            date : '01/02/2023'
        },
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

    const selectOpenTickets = useCallback(() => {
        setCurrentTab(0)
    }, [])

    const selectClosedTickets = useCallback(() => {
        setCurrentTab(1)
    }, [])


    const openModal = useCallback(() => {
        setModalVisible(true)
    }, [])

    const closeModal = useCallback(() => {
        setModalVisible(false)
    }, [])

    const onSubmit = useCallback(() => {
        setModalVisible(false)
      
    }, [])


    return (
        <>
            <HeaderWithTitle title={'Support'} backAction />
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
                            label={"Open Tickets"}
                            onPress={selectOpenTickets}
                            selected={currentTab === 0 ? true : false}
                            wid={width/3.2}
                        />
                        <SelectTab
                            label={"Closed Tickets"}
                            onPress={selectClosedTickets}
                            selected={currentTab === 1 ? true : false}
                            wid={width/3.2}

                        />
                    </View>

                    <View style={styles.border}/>

                    {currentTab === 0 && openTicket?.map((item) => (
                        <TicketCard item={item} key={item?.id} />
                    ))}
                    {currentTab === 1 && closedTicket?.map((item) => (
                        <TicketCard item={item} key={item?.id} />
                    ))}
                </ScrollView>
                <View style={{position:'absolute', width:width, bottom:40, paddingHorizontal:15}}>
                    <CustomButton
                        onPress={openModal}
                        bg={'#58D36E'}
                        label='New Support Request'
                    />
                </View>
            
            </View>
        
            <CommonModal
                visible={modalVisible}
                onClose={closeModal}
            >
                <CommonTexts textAlign={'center'} label={'Support Request'} fontSize={22} mt={-25}/>
                <View style={{paddingHorizontal:10,}}>
                    <CommonInput
                        control={control}
                        error={errors.mobile}
                        fieldName="mobile"
                        placeholder='Subject'
                        backgroundColor={'#F2F2F2'}
                    />
                    <CommonInput
                        control={control}
                        error={errors.subject}
                        fieldName="comments"
                        placeholder='Type your comments here...'
                        backgroundColor={'#F2F2F2'}
                        height={100}
                        mt={10}
                        fontFamily='Poppins-LightItalic'
                    />
                </View>
                <CustomButton
                    onPress={onSubmit}
                    label={'Confirm'} bg='#58D36E'
                    width={width / 3.5}
                    alignSelf='center'
                    my={20}
                />
            </CommonModal>


        </>

    )
}

export default Support

const styles = StyleSheet.create({
    tabContainer: { 
        marginTop: 15, 
        flexDirection: 'row', 
        width: '70%', 
        justifyContent: 'space-between', 
        alignSelf: 'center'
    },
    border: { 
        backgroundColor: '#00000014', 
        height: 2, 
        marginTop: -1.5, 
        width: '70%', 
        alignSelf: 'center',
        marginBottom:20
    }
})