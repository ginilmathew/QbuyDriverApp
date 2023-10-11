import React, { useState, useEffect } from "react";
import Context from "./index";

const AuthProvider = (props) => {
    const [user, setUser] = useState(null);
    return (
        <Context.Provider
            value={{
                ...props,
                user,
                setUser,
            }}
        >
            {props.children}
        </Context.Provider>
    );
}

export default AuthProvider;

