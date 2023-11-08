import { ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React, { memo, useCallback, useContext, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CommonPicker from '../../Components/CommonPicker'
import Calendar from "react-native-calendar-range-picker";
import moment from 'moment';
import CustomButton from '../../Components/CustomButton';
import CommonTexts from '../../Components/CommonTexts';
import CommonInput from '../../Components/CommonInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';



const Filter = ({ item, closeFilter, onSubmit }) => {

    const [selected, setSelected] = useState('Daily Report');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');


    const { width, height } = useWindowDimensions();

    const onCaledarChange = ({ startDate, endDate }) => {
        setStartDate(startDate)
        setEndDate(endDate)
    }



    return (

        <View style={[styles.filterView, { top: -50 }]}>
            <TouchableOpacity onPress={closeFilter} style={{ alignSelf: 'flex-end', padding: 5, zIndex: 1 }}>
                <Ionicons name={'close-circle'} size={28} color={'#000'} />
            </TouchableOpacity>
            <CommonTexts textAlign={'center'} label={'Filter'} fontSize={22} mt={-30} mb={-5} />
            {item && item?.map((res, i) =>
            (<View style={styles.filters} key={i}>
                <TouchableOpacity
                    onPress={() => setSelected(res?.name)}
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                    <Ionicons name={selected === res?.name ? 'ios-radio-button-on' : 'ios-radio-button-off'} color={'#58D36E'} size={17} />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.textRegular}>{res?.name}</Text>
                    </View>

                </TouchableOpacity>
            </View>)
            )}

            {
                selected === 'Date Picker' && (
                    <View style={styles.datePicker}>
                        <View style={{ zIndex: 132, height: height / 3, width: '100%' }} >
                            <Calendar
                                onChange={onCaledarChange}
                                // disabledBeforeToday={true}
                                futureYearRange={1}
                                style={{
                                    monthNameText: { color: '#057EC1', fontWeight: '700' },
                                    container: { width: '100%', height: '100%' },
                                    // dayNameText: {},
                                    // dayText: {},
                                    // dayTextColor: '#f7f7f7',
                                    // holidayColor: 'rgba(0,0,0,0.5)',
                                    todayColor: 'blue',
                                    // disabledTextColor: '#Hex',
                                    // selectedDayTextColor: '#Hex',
                                    // selectedDayBackgroundColor: '#Hex',
                                    // selectedBetweenDayTextColor: '#Hex',
                                    // selectedBetweenDayBackgroundTextColor: '#Hex',
                                }}
                            />
                        </View>
                    </View>
                )
            }

            <CustomButton
                onPress={onSubmit({ startDate, endDate, selected })}
                label={'Apply'} bg='#58D36E'
                width={170}
                alignSelf='center'
                my={10}
            />
        </View>


    )
}

export default Filter

const styles = StyleSheet.create({
    filters: {
        paddingHorizontal: 15,
        borderBottomWidth: 0.5,
        paddingVertical: 10,
        borderColor: "#F3F3F3"
    },
    datePicker: {
        width: '100%',
        padding: 20,
        alignItems: 'center',
        paddingVertical: 12
    },
    dateBtn: {
        width: '94%',
        padding: 10,
        borderRadius: 7,
        borderWidth: 2,
    },
    dateText: {
        textAlign: 'left'
    },
    textRegular: {
        color: '#23233C',
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        marginLeft: 5
    },
    textExtra: {
        fontFamily: 'Poppins-ExtraBold',
        fontSize: 13,
        color: '#089321',
        marginHorizontal: 2
    },
    filterView: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 15,
        alignSelf: 'center',
        shadowOffset: { height: 1, width: 1 },
        elevation: 10000,
        shadowOpacity: 0.2,
        zIndex: 1000,
        top: 70,
        gap: 8
    },
})
