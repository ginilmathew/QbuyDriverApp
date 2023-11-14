import { StyleSheet, Text, Image, ScrollView, View } from 'react-native'
import React, { useCallback, useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import SettingsCard from './SettingsCard'
import HeaderWithTitle from '../../../Components/HeaderWithTitle'
import ProfileDp from './ProfileDp'
import customAxios from '../../../CustomeAxios'
import reactotron from 'reactotron-react-native'
import { IMG_URL } from '../../../config/constants'
import Toast from 'react-native-toast-message'

const Settings = ({ navigation }) => {


    const [profileItems, setProfileItems] = useState(null)

    reactotron.log(profileItems, "PITEMS")

    useEffect(() => {
        profileData()
    }, [])
    

    const profileData = async () => {
        try {
            const res = await customAxios.get(`rider/profile`)
            if (res?.data?.message === "success") {
                setProfileItems(res?.data?.data)
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

    const goProfile = useCallback(() => {
        navigation.navigate('Profile', { item: profileItems })
    }, [navigation, profileItems])

    const goRateCard = useCallback(() => {
        navigation.navigate('RateCard')
    }, [])

    const goSupport = useCallback(() => {
        navigation.navigate('Support')
    }, [])

    const goReferFriend = useCallback(() => {
        navigation.navigate('ReferFriend')
    }, [])

    return (
        <>
            <HeaderWithTitle title={'Settings'} drawerOpen={() => navigation.openDrawer()} />
            <ScrollView style={{ backgroundColor: '#F3F3F3', paddingHorizontal:15, }}>
                <ProfileDp 
                name={profileItems?.name}
                rider_id={profileItems?.rider_id} 
                franchise={profileItems?.primary_franchise?.franchise_name} 
                days={28}
                src={profileItems?.image ? ({ uri: IMG_URL + profileItems?.image }) : (require('../../../Images/drawerLogo.png'))}
                />
                <SettingsCard 
                    onPress={goProfile}
                    label={'Profile'} 
                    leftElement={<FontAwesome6 name='person' color='#586DD3' size={20}/>}
                />
                <SettingsCard 
                    onPress={goRateCard}
                    label={'Rate Card'} 
                    leftElement={<Image
                        style={styles.logo}
                        source={require('../../../Images/rs.jpeg')}
                        resizeMode='contain'
                    />}
                />
                <SettingsCard 
                    onPress={goSupport}
                    label={'Support'} 
                    leftElement={<FontAwesome6 name='headset' color='#586DD3' size={18}/>}
                />
                <SettingsCard
                    onPress={goReferFriend}
                    label={'Refer A Friend'}
                    leftElement={<Image
                        style={styles.logo}
                        source={require('../../../Images/refer.jpeg')}
                        resizeMode='contain'
                    />}
                />
            </ScrollView>
        </>
    )
}

export default Settings

const styles = StyleSheet.create({
	logo: {
		width: 22,
		height: 22,
	},
})