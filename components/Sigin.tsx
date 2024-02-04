"use client"
import { userContext } from '@/app/UserProvider'
import React, { useContext } from 'react'

const Sigin = () => {
    const { googleLogin } = useContext(userContext)
    return (
        <div>
            <button onClick={(event: React.MouseEvent<HTMLButtonElement>) => googleLogin(event)}>
                login
            </button>
        </div>
    )
}

export default Sigin
