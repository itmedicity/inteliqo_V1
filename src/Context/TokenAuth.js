import React, { createContext, useState } from 'react'

export const ToeknContext = createContext();

const TokenAuth = ({ children }) => {

    const [loggedUserID, setLoggedUserID] = useState(0);

    const value = { loggedUserID, setLoggedUserID }

    return <ToeknContext.Provider value={value} >
        {children}
    </ToeknContext.Provider>
}

export default TokenAuth
