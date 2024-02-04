"use client"
import { db } from "@/lib/firebase/firebase.config";
import { AddExpenseDocument, AddIncomeDocument, ExpenseDocument, IncomeDocument } from "@/types/income.doc";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import React, { createContext, useState, Dispatch, SetStateAction } from "react";

interface FinanceContextSchema {
    incomeDocs: IncomeDocument[],
    expenseDocs: ExpenseDocument[],
    setIncomeDocs: Dispatch<SetStateAction<IncomeDocument[]>>,
    setExpenseDocs: Dispatch<SetStateAction<ExpenseDocument[]>>
    addIncomeDocs: Function,
    deleteIncomeDocs: Function,
    addExpenseDocs : Function
}

export const finaceContext = createContext<FinanceContextSchema>({
    incomeDocs: [],
    expenseDocs: [],
    setIncomeDocs: () => { },
    setExpenseDocs: () => { },
    addIncomeDocs: async () => { },
    deleteIncomeDocs: async () => { },
    addExpenseDocs : async () => {}
})

export const FinanceProvider = ({ children }: { children: React.ReactNode }) => {

    const [incomeDocs, setIncomeDocs] = useState<IncomeDocument[]>([]);
    const [expenseDocs, setExpenseDocs] = useState<ExpenseDocument[]>([]);
    const addIncomeDocs = async (addIncomeDoc: AddIncomeDocument) => {
        try {
            const colRef = collection(db, "income");
            const response = await addDoc(colRef, addIncomeDoc)
            console.log(response.id);
            setIncomeDocs((prev) => {
                return [...prev, { ...addIncomeDoc, id: response.id }]
            })
        } catch (error) {
            console.log(error);
        }
    };
    const deleteIncomeDocs = async (id: string) => {
        try {
            await deleteDoc(doc(db, "income", id));
            setIncomeDocs((prev) => {
                return prev.filter((p) => p.id != id)
            })
        } catch (error) {

        }
    };
    const addExpenseDocs = async (addExpenseDoc: AddExpenseDocument) => {
        try {
            const colRef = collection(db, "expense");
            const response = await addDoc(colRef, addExpenseDoc)
            setExpenseDocs((prev) => {
                return [...prev, { ...addExpenseDoc, id: response.id }]
            })
        } catch (error) {
            console.log(error);
        }
    }
    const value = { incomeDocs, addIncomeDocs, deleteIncomeDocs, setIncomeDocs, expenseDocs, setExpenseDocs , addExpenseDocs}
    return <finaceContext.Provider value={value}>
        {children}
    </finaceContext.Provider>
}