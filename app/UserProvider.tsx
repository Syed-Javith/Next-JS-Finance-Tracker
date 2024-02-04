"use client"
import { auth } from "@/lib/firebase/firebase.config";
import { GoogleAuthProvider, User, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth"

interface UserProviderSchema {
    user: User | null | undefined,
    googleLogin: Function,
    loading: boolean,
    logout: Function
}

export const userContext = createContext<UserProviderSchema>({
    user: null,
    loading: false,
    googleLogin: async () => { },
    logout: async () => { }
})

export const UserProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, loading] = useAuthState(auth)
    const googlAuthProvider = new GoogleAuthProvider()

    const googleLogin = async () => {
        try {
            await signInWithPopup(auth, googlAuthProvider);
        } catch (error) {
            console.log(error);
            throw error
        }
    }
    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {

        }
    }
    const value = { user, loading, googleLogin, logout }
    return <userContext.Provider value={value}>
        {children}
    </userContext.Provider>
}