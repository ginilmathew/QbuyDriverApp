import { StyleSheet, Text, View, ScrollView, useWindowDimensions, TouchableOpacity, FlatList, ActivityIndicator, PixelRatio, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import HeaderWithTitle from '../../Components/HeaderWithTitle'
import CustomButton from '../../Components/CustomButton'
import Ionicons from 'react-native-vector-icons/Ionicons'
import WorkCard from './WorkCard'
import Filter from './Filter'
import customAxios from '../../CustomeAxios'
import { workList, filterList } from '../../Api/work'
import { useRefreshOnFocus } from '../../hooks/useRefreshOnFocus'
import { useMutation, useQuery, QueryClient, useQueryClient, QueryCache } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'
import { useFocusEffect } from '@react-navigation/native'


const getFontSize = size => size / PixelRatio.getFontScale();

const Work = ({ navigation }) => {

    const openDrawer = useCallback(() => {
        navigation.openDrawer()
    }, []);


    const [showFilter, setShowFilter] = useState(false);


    const [workState, setWorkState] = useState();
    const [loading, setLoading] = useState(false);

    const workList = async () => {
       try {
           setLoading(true);
           const listData = await customAxios.get('rider/work/list');
           setWorkState(listData?.data?.data);
       } catch (error) {
            Toast.show({
                type: 'error',
                text1: error
            })
       } finally {
        setLoading(false);
       }
    }

    const filterList = async (data) => {
        try {
            setLoading(true);
            const filterList = await customAxios.post('rider/work/list-filter', {
                "from_date": data?.startDate,
                "to_date": data?.endDate
            });
            setWorkState(filterList?.data?.data);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: error
            })
        }
        finally {
            setLoading(false);
        }
    }



    // const { refetch, error, isError, isFetching, data, isLoading } = useQuery({
    //     queryKey: ['work-list'],
    //     queryFn: workList
    // });


    // if(isError) {
    //     console.log(error);
    // }

    // const mutation = useMutation({
    //     mutationFn: filterList,
    //     onSuccess: (lists, values) => {
    //         setWorkState(lists);
    //     }
    // });

    // useRefreshOnFocus(refetch);


    useFocusEffect(useCallback(() => {
        workList();
    }, []))

    // { refetch, isError, workList, error, isLoading, isFetching }
   

    const { width, height } = useWindowDimensions();

    // useEffect(() => {
    //     refetch();
    // }, [])

    // useEffect(() => {

    //     if (isError || mutation?.isError) {
    //         Toast.show({
    //             type: 'error',
    //             text1: error || mutation?.error
    //         })
    //     }

    // }, [isError, mutation?.isError]);


    let datas = [
        {
            id: '1',
            name: 'Daily Report',
            picker: false
        },
        {
            id: '2',
            name: 'Date Picker',
            picker: true
        }
    ]


    const closeFilter = useCallback(() => setShowFilter(false), []);

    const openFilter = useCallback(() => {
        setShowFilter(true)
    }, []);


    const onSubmit = ({ startDate, endDate, selected }) => async () => {

        if (selected === 'Date Picker' && !endDate) return;

        closeFilter();

        if (selected === 'Daily Report') {
            workList();
        }
        else if (selected === 'Date Picker') {

            if (!endDate) return;

            filterList({ startDate, endDate });
        }
    }


    const renderItem = ({ item }) => (
        <WorkCard item={item} key={item?.id} />
    )

    return (
        <>
            <HeaderWithTitle title={'Work'} drawerOpen={openDrawer} />

            <View style={{ width: '100%', paddingHorizontal: 15, backgroundColor: '#F3F3F3' }}>
                <CustomButton
                    onPress={openFilter}
                    label={'Filter'} bg='#5261E0' mt={15}
                    rightIconName='filter'
                />

                {
                    (loading) && (
                        <ActivityIndicator />
                    )
                }

                {showFilter &&
                    <Filter
                        item={datas}
                        closeFilter={closeFilter}
                        onSubmit={onSubmit}
                    />
                }

            </View>
            <FlatList
                style={{ flex: 1, backgroundColor: '#F3F3F3', paddingHorizontal: 15 }}
                data={workState?.work_list}
                refreshControl={<RefreshControl refreshing={loading} onRefresh={workList}  />}
                ListHeaderComponent={
                    <View style={styles.summary}>
                        <View style={[styles.container, { borderBottomWidth: 1 }]}>
                            <View style={styles.box}>
                                <Text style={styles.containerText}>Total Orders</Text>
                                <Text style={[styles.BoxText, { color: '#1675C8' }]}>{workState?.total_order}</Text>
                            </View>
                            <View style={styles.box}>
                                <Text style={styles.containerText}>Total Earnings</Text>
                                <Text style={[styles.BoxText, { color: '#2EA10C' }]}>{workState?.total_earnings}</Text>
                            </View>
                            <View style={[styles.box, { borderRightWidth: 0 }]}>
                                <Text style={styles.containerText}>Total Login Hrs</Text>
                                <Text style={[styles.BoxText, { color: '#C311CA' }]}>{
                                    workState?.total_logged_in_time?.slice(0, workState?.total_logged_in_time?.indexOf('hrs'))
                                }</Text>
                            </View>
                        </View>
                        <View style={styles.container}>
                            <View style={styles.box}>
                                <Text style={styles.containerText}>Total Denials</Text>
                                <Text style={[styles.BoxText, { color: '#FC2020' }]}>{workState?.total_denial}</Text>
                            </View>
                            <View style={[styles.box, { borderRightWidth: 0 }]}>
                                <Text style={styles.containerText}>Total Cancellations</Text>
                                <Text style={[styles.BoxText, { color: '#A10C0C' }]}>{workState?.total_cancelled}</Text>
                            </View>
                        </View>
                    </View>
                }
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                ListFooterComponent={<View style={{ backgroundColor: '#F3F3F3', marginBottom: 80, paddingTop: 15 }} />}
                ListEmptyComponent={(<View style={{ flex: 1 }}>
                    <Text style={{ textAlign: 'center' }}>No Data found!</Text>
                </View>)}
            />


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
    summary: {
        borderRadius: 15,
        marginTop: 20,
        backgroundColor: '#fff',
        shadowOpacity: 0.2,
        shadowOffset: { height: 1, width: 1 },
        marginBottom: 17,
        elevation: 1,
        marginHorizontal: 1,
        padding: 12
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: 'rgba(0,0,0,.03)'
    },
    box: {
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        padding: 10,
        borderRightWidth: 1,
        borderColor: 'rgba(0,0,0,.03)'
    },
    containerText: {
        color: '#000',
        fontSize: getFontSize(13)
    },
    BoxText: {
        fontWeight: '700',
        fontSize: getFontSize(18),
        marginTop: 2
    }
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