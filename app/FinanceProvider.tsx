"use client"
import { db } from "@/lib/firebase/firebase.config";
import { AddIncomeDocument, IncomeDocument } from "@/types/income.doc";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import React, { createContext, useState , Dispatch, SetStateAction} from "react";

interface FinanceContextSchema {
    incomeDocs : IncomeDocument[],
    setIncomeDocs : Dispatch<SetStateAction<IncomeDocument[]>> ,
    addIncomeDocs : Function ,
    deleteIncomeDocs : Function
}

export const finaceContext = createContext<FinanceContextSchema>({
    incomeDocs: [],
    setIncomeDocs :  () => {}, 
    addIncomeDocs: async () => { },
    deleteIncomeDocs: async () => { },
})

export const FinanceProvider = ({ children }: { children: React.ReactNode }) => {

    const [incomeDocs, setIncomeDocs] = useState<IncomeDocument[]>([]);
    const addIncomeDocs = async (addIncomeDoc : AddIncomeDocument) => { 
        try {
            const colRef = collection(db,"income");
            const response = await addDoc(colRef,addIncomeDoc)
            console.log(response.id);
            setIncomeDocs(( prev ) => { 
               return [...prev ,  { ...addIncomeDoc ,id : response.id }]
            })
        } catch (error) {
            console.log(error);
        }
     };
    const deleteIncomeDocs = async (id : string) => {
        try {
            await deleteDoc(doc(db,"income",id));
            setIncomeDocs((prev) => {
              return  prev.filter((p) => p.id != id)
            })
        } catch (error) {
            
        }
     };
    const value = { incomeDocs, addIncomeDocs, deleteIncomeDocs , setIncomeDocs }
    return <finaceContext.Provider value={value}>
        {children}
    </finaceContext.Provider>
}