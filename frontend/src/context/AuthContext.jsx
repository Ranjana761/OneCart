import React, { createContext } from 'react'

export const authDatacontext = createContext()
function AuthContext({children}) {
    let serverUrl = "https://onecart-backend-bxoq.onrender.com"
    let value ={
       serverUrl
    }
  return (
    
      <authDatacontext.Provider value={value}>
        {children}
      </authDatacontext.Provider>
   
  )
}

export default AuthContext
