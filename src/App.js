import { AppState, Platform, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import Navigation from './Navigations'
import LoadProvider from './contexts/Loader/loaderContext'
import AuthProvider from './contexts/Auth/AuthContext'
import Toast from 'react-native-toast-message';
import NetInfo from '@react-native-community/netinfo'
import { focusManager, onlineManager, QueryClient, QueryClientProvider } from '@tanstack/react-query'


onlineManager.setEventListener(setOnline => {
    return NetInfo.addEventListener(state => {
      setOnline(!!state.isConnected)
    })
})

const queryClient = new QueryClient()

const App = () => {

    // const { user, getProfileDetails } = useContext(AuthContext)

    // reactotron.log(user, "DTA")

    // const isLoco = LocationStatus();

    // useEffect(() => {
    //     if(!isLoco) {
    //         console.log("NOTHING");
    //     }
    //   }, [isLoco])

    

    function onAppStateChange(status) {
        if (Platform.OS !== 'web') {
          focusManager.setFocused(status === 'active')
        }
      }

    
    useEffect(() => {
        const subscription = AppState.addEventListener('change', onAppStateChange)
        return () => subscription.remove()
    }, []);


    return (
        <QueryClientProvider client={queryClient}>
            <LoadProvider>
                <AuthProvider>
                    <Navigation />
                </AuthProvider>
            </LoadProvider>
            <Toast
                position='bottom'
                bottomOffset={20}
            />
        </QueryClientProvider>

    )
}

export default App

const styles = StyleSheet.create({

})