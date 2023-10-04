import { ImageBackground, NativeModules, StyleSheet, Image, View } from 'react-native'
import React from 'react'
import CommonAuthBg from '../auth/CommonAuthBg';


const SplashScreen = ({ navigation }) => {


    return (
        <CommonAuthBg>
            <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
                <Image
                    style={styles.logo}
                    source={require('../../Images/splash.png')}
                    resizeMode='contain'
                />
            </View>
        </CommonAuthBg>
    )
}

export default SplashScreen

const styles = StyleSheet.create({

    logo: {
        width: 200,
        height: 250,
        alignSelf: 'center',
    },
})