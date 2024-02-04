"use client"
import React, { Dispatch, FC, SetStateAction, useContext, useEffect, useRef, useState } from 'react'
import Modal from '../Modal'
import { addDoc, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from "@/lib/firebase/firebase.config"
import { AddIncomeDocument, IncomeDocument } from '@/types/income.doc'
import IncomeHistory from './IncomeHistory'
import { finaceContext } from '@/app/FinanceProvider'
import { userContext } from '@/app/UserProvider'
import { getIncomeDocuments } from '@/lib/utils'

interface IncomeModalProps {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>
}
const IncomeModal: FC<IncomeModalProps> = ({ isOpen, setIsOpen }) => {

    const { incomeDocs, setIncomeDocs, addIncomeDocs } = useContext(finaceContext);
    const { user } = useContext(userContext)
    const incomeRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLInputElement>(null);
    const [ispending, setIsPending] = useState<boolean>(false);

    const addIncomeDocsHandler = async () => {
        setIsPending(true)
        const addIncomeDoc: AddIncomeDocument = {
            uid: user?.uid,
            amount: Number(incomeRef.current?.value || 0),
            description: descriptionRef.current?.value || "Nothing",
            createdAt: new Date()
        }
        await addIncomeDocs(addIncomeDoc)
        setIsPending(false)
        setIsOpen(false)
    }
    const getIncomes = async () => {
        const colRef = collection(db, "income")
        const q = query(colRef, where("uid", "==", user?.uid))
        try {
            const docs = await getDocs(q)
            const retreivedDocs = await getIncomeDocuments(q, user?.uid + "")
            console.log(retreivedDocs);
            if (retreivedDocs) {
                setIncomeDocs(retreivedDocs);
            }

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getIncomes();
    }, [])

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} >
            <form onSubmit={(e) => { e.preventDefault(); addIncomeDocsHandler(); }}>
                <div className="form-group">
                    <label htmlFor="income">Income</label><br />
                    <input ref={incomeRef} className="form-input" placeholder='Enter your expenses' type="number" name="income" id="income" />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label><br />
                    <input ref={descriptionRef} className="form-input" placeholder='Enter the description' name="description" id="description" />
                </div>
                <button disabled={ispending} className="btn btn-ok">{ispending ? "Adding..." : "Add Expense" }</button>
            </form>
            {
                incomeDocs.length > 0 && <IncomeHistory incomes={incomeDocs} />
            }
        </Modal>
    )
}

export default IncomeModal
