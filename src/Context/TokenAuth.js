import React, { createContext, useState } from 'react'

export const ToeknContext = createContext();

const TokenAuth = ({ children }) => {

    const [accessToken, setToken] = useState(0);

    const value = { accessToken, setToken }
    return <ToeknContext.Provider value={value} >
        {children}
    </ToeknContext.Provider>
}

export default TokenAuth
