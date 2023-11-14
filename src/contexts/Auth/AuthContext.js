import React, { useState, useEffect } from "react";
import Context from "./index";
import customAxios from "../../CustomeAxios";
import Toast from "react-native-toast-message";

const AuthProvider = (props) => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState({});

    const getProfileDetails = async () => {
        try {
            const response = await customAxios.get(`rider/profile`);
            if (response?.data?.message === "success") {
                setUserData(response?.data?.data)
            } else {
                throw "Internal server error"
            }
        } catch (error) {
   
            Toast.show({
                type: 'error',
                text1: error
            });
        }
    }

    return (
        <Context.Provider
            value={{
                ...props,
                user,
                userData,
                setUserData,
                setUser,
                getProfileDetails
            }}
        >
            {props.children}
        </Context.Provider>
    );
}

export default AuthProvider;

