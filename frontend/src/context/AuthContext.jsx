import React, { createContext } from 'react'

export const authDatacontext = createContext()
function AuthContext({children}) {
    let serverUrl = "http://localhost:8000"
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
