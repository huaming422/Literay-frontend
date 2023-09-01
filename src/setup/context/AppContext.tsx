/* eslint-disable array-callback-return */
import React, { useContext, createContext } from "react"
import { RootState } from '..'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { UserModel } from "../../app/pages/auth/models/UserModel"

const Context = createContext<any>({})

export function useAuth() {
    return useContext(Context)
}

export function AuthProvider({ children }: any) {

    // const dispatch = useDispatch()
    const user: UserModel = useSelector<RootState>(({ auth }) => auth.user, shallowEqual) as UserModel


    const value = {
        user
    }
    return (
        <Context.Provider value={value} >
            {children}
        </Context.Provider>
    )
}
