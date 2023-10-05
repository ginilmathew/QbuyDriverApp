import { StyleSheet } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { useDispatch, useSelector } from 'react-redux';
import { navigationRef } from './RootNavigation';
import Login from '../screens/auth/Login';
import Otp from '../screens/auth/Otp';
import Menu from './Menu';
import Register from '../screens/auth/Register';
import ImageUploadScreen from '../screens/auth/ImageUploadScreen';
import SplashScreen from '../screens/SplashScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createStackNavigator();

const Navigation = () => {

    const [initialScreen, setInitialScreen] = useState(null)
    useEffect(() => { 
        checkLogin();   
    }, [])
    const checkLogin = async() => {
        //await AsyncStorage.clear()
        const token = await AsyncStorage.getItem("token");
        // reactotron.log({token})
        if(token){
            // const user = await AsyncStorage.getItem("user");
            setInitialScreen('Menu');
            // if(user){
            //     let userData = JSON.parse(user);
            //     // reactotron.log({userData})
            //     dispatch(getProfile(userData?._id))
            //     setInitialScreen('Menu');
            // }
            // else{
            //     setInitialScreen('AppIntro');
            // }
        }
        else{
            setInitialScreen('Login');
        }
    }
    if(!initialScreen){
        return(
            <SplashScreen/>
        )
    }



	return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName={initialScreen} screenOptions={{ headerShown: false }}>

                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Otp" component={Otp} />
                <Stack.Screen name="ImageUploadScreen" component={ImageUploadScreen} />

                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Menu" component={Menu} />

            </Stack.Navigator>
        </NavigationContainer>
	)
}

export default Navigation

const styles = StyleSheet.create({})