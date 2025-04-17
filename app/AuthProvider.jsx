import { api } from '@/convex/_generated/api';
import React, { useEffect, useState } from 'react'
import { useUser } from '@stackframe/stack';
import { useMutation } from 'convex/react';
import { UserContext } from './_context/UserContext';

const AuthProvider = ({children}) => {

    const user=useUser();
    const CreateUser=useMutation(api.users.CreateUser);
    const [userData,setUserData]=useState();
    useEffect(()=>{
        // only if user information is available 
            user && CreateNewUser();
        // console.log(user)

    },[user])

    // to save the user information
    const CreateNewUser=async()=>{
        const result=await CreateUser({
            name:user?.displayName,
            email:user.primaryEmail

        });
        // console.log(result);
        setUserData(result);
    }

  return (
    <div>
      <UserContext.Provider value={{userData,setUserData}}>
        {children}
      </UserContext.Provider>
    </div>
  )
}

export default AuthProvider
