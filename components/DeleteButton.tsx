"use client"
import { finaceContext } from '@/app/FinanceProvider'
import React, { useContext } from 'react'

const DeleteButton = ({ id, context, children }: { id: string, context: string, children: React.ReactNode }) => {
    const { deleteExpenseDocs, deleteIncomeDocs } = useContext(finaceContext);
    const handler = (id: string) => {
        if (context === "income") {
            deleteIncomeDocs(id)
        } else {
            deleteExpenseDocs(id)
        }
    }
    if(context === "income")
     return <button className='self-end md:size-6 size-4'>
        {children}
     </button>
    return (
        <button onClick={() => handler(id)} className='text-center text-md font-bold items-center justify-center m-auto hidden group-hover:inline-block'>
            {children}
        </button>
    )
}

export default DeleteButton
