import React, {createContext, useEffect, useState} from 'react'
import { Auth } from 'aws-amplify'

const UserContext = createContext()


export const UserProvider = ({children}) => {
    const [User, setUser] = useState(null)

        useEffect(() => {
            const getUserData = async () =>{
                try{
                    const currentUser = await Auth.currentAuthenticatedUser();
                    setUser(currentUser)
                }
             catch(error){
                setUser(null)
                console.error('Erro ao authenticar usuario')
            }
        }   
          getUserData()
        },[])
    

        return (
            <UserContext.Provider value={User}>
              {children}
            </UserContext.Provider>
          );
}

export default UserContext