import { StyleSheet, Text, Image, ScrollView, View } from 'react-native'
import React, { useCallback } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import SettingsCard from './SettingsCard'
import HeaderWithTitle from '../../../Components/HeaderWithTitle'
import ProfileDp from './ProfileDp'


const Settings = ({ navigation }) => {

    const goProfile = useCallback(() => {
        navigation.navigate('Profile')
    }, [])

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
                <ProfileDp />
                <SettingsCard 
                    onPress={goProfile}
                    label={'Profile'} 
                    leftElement={<Ionicons name='person' color='#586DD3' size={20}/>}
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
                    leftElement={<Ionicons name='headset' color='#586DD3' size={18}/>}
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