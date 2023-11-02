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
import AuthContext from '../contexts/Auth';
import { AppState } from 'react-native';
import { useRef } from 'react';
import reactotron from '../ReactotronConfig';
import customAxios from '../CustomeAxios';
import { useToast } from 'native-base';


const Stack = createStackNavigator();

const Navigation = () => {

    const [initialScreen, setInitialScreen] = useState(null)
    const authContext = useContext(AuthContext)

    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    reactotron.log(appStateVisible, "STATUS")
  

    useEffect(() => { 
        checkLogin();   
    }, [])

    
    useEffect(() => {
      const onlineStatus = AppState.addEventListener('change', nextAppState => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
            getStatus();
        }
  
        appState.current = nextAppState;
        setAppStateVisible(appState.current);
        console.log('AppState', appState.current);
      });
  
      return () => {
        onlineStatus.remove();
      };
    }, []);

    const getStatus = async () => {

		const datas = {
			user_id: user?._id,
			online_status: appStateVisible
		};

        try {
            const response = await customAxios.post(`rider/online-status-change`,datas);
			reactotron.log(response, "RES!@")
           
        } catch (error) {
   
            Toast.show({
                type: 'error',
                title: error
            });
        }
    }

    const checkLogin = async() => {
        //await AsyncStorage.clear()
        const token = await AsyncStorage.getItem("token");
        // reactotron.log({token})
        if(token){
            // const user = await AsyncStorage.getItem("user");
            authContext.getProfileDetails()
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