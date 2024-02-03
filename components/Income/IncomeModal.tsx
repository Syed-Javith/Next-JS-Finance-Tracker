"use client"
import React, { Dispatch, FC, SetStateAction, useContext, useEffect, useRef, useState } from 'react'
import Modal from '../Modal'
import { addDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { db } from "@/lib/firebase/firebase.config"
import { AddIncomeDocument, IncomeDocument } from '@/types/income.doc'
import IncomeHistory from './IncomeHistory'
import { finaceContext } from '@/app/FinanceProvider'

interface IncomeModalProps {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>
}
const IncomeModal: FC<IncomeModalProps> = ({ isOpen, setIsOpen }) => {

    const {incomeDocs, setIncomeDocs , addIncomeDocs} = useContext(finaceContext);
    const incomeRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLInputElement>(null);
    const [ispending , setIsPending] = useState<boolean>(false);

    const addIncomeDocsHandler = async () => {
        setIsPending(true)
        const addIncomeDoc : AddIncomeDocument = { 
            amount : Number(incomeRef.current?.value || 0) ,
            description : descriptionRef.current?.value || "Nothing",
            createdAt : new Date()
        }
        await addIncomeDocs(addIncomeDoc)
        setIsPending(false)
    }
    const getIncomes = async () => {
        const colRef = collection(db, "income")
        try {
            const docs = await getDocs(colRef)
            const retreivedDocs: IncomeDocument[] = docs.docs.map((doc) => {
                const idoc: IncomeDocument = { 
                    id: doc.id, 
                    amount: doc.data().amount, 
                    createdAt: new Date(doc.data().createdAt.toMillis()), 
                    description: doc.data().description 
                }
                return idoc;
            });
            // console.log(retreivedDocs);
            setIncomeDocs(retreivedDocs)

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getIncomes();
    },[])

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} >
            <h3>Hello</h3>
            <form onSubmit={(e) => { e.preventDefault(); addIncomeDocsHandler();}}>
                <div className="form-group">
                    <label htmlFor="income">Income</label><br />
                    <input ref={incomeRef} className="form-input" type="number" name="income" id="income" />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label><br />
                    <input ref={descriptionRef} className="form-input" name="description" id="description" />
                </div>
                <button disabled={ispending} className="btn btn-ok">Add</button>
            </form>
            {
                incomeDocs.length > 0 && <IncomeHistory incomes={incomeDocs} />
            }
        </Modal>
    )
}

export default IncomeModal
