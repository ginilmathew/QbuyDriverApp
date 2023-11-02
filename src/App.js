import { AppState, Image, Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Navigation from './Navigations'
import { Provider } from 'react-redux'
import store from './Redux/store'
import LoadProvider from './contexts/Loader/loaderContext'
import AuthProvider from './contexts/Auth/AuthContext'
import { NativeBaseProvider } from 'native-base'
import LocationStatus from './hooks/LocationStatus'


const App = () => {

    // const { user, getProfileDetails } = useContext(AuthContext)

    // reactotron.log(user, "DTA")

    // const isLoco = LocationStatus();

    // useEffect(() => {
    //     if(!isLoco) {
    //         console.log("NOTHING");
    //     }
    //   }, [isLoco])


    return (
        <Provider store={store}>
            <NativeBaseProvider>
                <LoadProvider>
                    <AuthProvider>
                        <Navigation />
                    </AuthProvider>
                </LoadProvider>
            </NativeBaseProvider>
        </Provider>

    )
}

export default App

const styles = StyleSheet.create({

})