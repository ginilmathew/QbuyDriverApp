import { StyleSheet, Text, View, ScrollView, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import HeaderWithTitle from '../../Components/HeaderWithTitle'
import CustomButton from '../../Components/CustomButton'
import Ionicons from 'react-native-vector-icons/Ionicons'
import WorkCard from './WorkCard'
import CommonModal from '../../Components/CommonModal'
import CommonTexts from '../../Components/CommonTexts'
import WeeklyBox from './WeeklyBox'
import Calendar from "react-native-calendar-range-picker";
import moment from 'moment'
import Filter from './Filter'

const Work = ({ navigation }) => {

    const { width } = useWindowDimensions()

    const [showFilter, setShowFilter] = useState(false);

    const [filterType, setFilterType] = useState(false);

    const [dates, setDates] = useState('');

    // console.log({dates})

    // useEffect(() => {

    //     if(dates){
    //         let datefiltered = works?.filter((da)=>(da?.date === dates))
    //         console.log({datefiltered})

    //     }

    // }, [dates])



    let works = [
        {
            id: '1',
            status: 'Completed',
            date: '24/03/2023',
            amount: 10
        },
        {
            id: '2',
            status: 'Completed',
            date: '21/03/2023',
            amount: 450
        },
        {
            id: '3',
            status: 'Pending',
            date: '12/11/2022',
            amount: 1000
        },
        {
            id: '4',
            status: 'Completed',
            date: '02/03/2023',
            amount: 670
        },
        {
            id: '5',
            status: 'Pending',
            date: '01/02/2023',
            amount: 810
        },
        {
            id: '6',
            status: 'Pending',
            date: '01/02/2023',
            amount: 1000
        },
        {
            id: '7',
            status: 'Pending',
            date: '25/03/2023',
            amount: 1000
        },
    ]

    let datas = [
        {
            id: '1',
            name: 'Daily Report',
            month: false
        },
        {
            id: '2',
            name: 'Weekly Report',
            month: false
        },
        {
            id: '3',
            name: 'Monthly Report',
            month: true
        },

    ]


    const openFilter = useCallback(() => {
        setShowFilter(true)
    }, [])

    const openDrawer = useCallback(() => {
        navigation.openDrawer()
    }, [])

    const applyFilter = useCallback((data) => {
        // console.log({data})
        setFilterType(data)
        setShowFilter(false)
        setDates(data)
    }, [])

    return (
        <>
            <HeaderWithTitle title={'Work'} drawerOpen={openDrawer} />
            <View style={{ flex: 1, backgroundColor: '#F3F3F3', paddingHorizontal: 15 }}>

                <CustomButton
                    onPress={openFilter}
                    label={'Filter'} bg='#5261E0' mt={15}
                    rightIconName='filter'
                />

                {showFilter &&
                    <Filter
                        item={datas}
                        closeFilter={() => setShowFilter(false)}
                        filterAction={applyFilter}
                    />
                }
                <ScrollView
                    style={{ backgroundColor: '#F3F3F3', marginBottom: 80, paddingTop: 15 }}
                    showsVerticalScrollIndicator={false}
                >

                    {/* DATABOX IS HERE */}

                    {/* <View style={styles.dataBox}>
                        <View style={styles.rowStyle}>
                            <View style={styles.verticalStyle}>
                                <Text style={styles.headingStyle}>Total Orders</Text>
                                <Text style={styles.numberStyle}>5000</Text>
                            </View>
                        </View>
                    </View> */}

                    {filterType === 'Weekly Report' && <WeeklyBox />}

                    {works?.map((item) => (
                        <WorkCard item={item} key={item?.id} />
                    ))}
                </ScrollView>
            </View>
            {/* <CommonModal
                visible={modalVisible}
                onClose={closeModal}
                mt={168}
            >
                <CommonTexts textAlign={'center'} label={'Filter'} fontSize={22} mt={-25}/>
                
                <CustomButton
                    onPress={onSubmit}
                    label={'Apply'} bg='#58D36E'
                    width={width / 3.5}
                    alignSelf='center'
                    my={20}
                />
            </CommonModal> */}
        </>
    )
}

export default Work

const styles = StyleSheet.create({
    filterView: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 15,
        alignSelf: 'center',
        shadowOffset: { height: 1, width: 1 },
        elevation: 1,
        shadowOpacity: 0.2,
        position: 'absolute',
        zIndex: 1,
        top: 70
    },
    // dataBox: {
    //     backgroundColor: "#fff",
    //     padding: 50,
    //     borderRadius: 11,
    //     marginBottom: 25
    // },
    // rowStyle: {
    //     flexDirection: "row"
    // },
    // verticalStyle: {
    //     gap: 8,
    //     alignItems: "center",
    //     borderRightColor: "#F5F5F5",
    //     borderRightWidth: 2
    // },
    // headingStyle: {
    //     fontSize: 15,
    //     fontFamily: "Poppins-Regular"
    // },
    // numberStyle: {
    //     fontSize: 20,
    //     fontFamily: "Poppins-Bold"
    // },

})