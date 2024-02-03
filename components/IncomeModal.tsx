"use client"
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import Modal from './Modal'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { db } from "@/lib/firebase/firebase.config"
import { IncomeDocument } from '@/types/income.doc'

interface IncomeModalProps {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>
}
const IncomeModal: FC<IncomeModalProps> = ({ isOpen, setIsOpen }) => {

    const [incomeDocs, setIncomeDocs] = useState<IncomeDocument[]>([]);
    useEffect(() => {

        const getIncomes = async () => {
            const colRef = collection(db, "income")
            try {
                const docs = await getDocs(colRef)
                console.log(docs.docs);
                const retreivedDocs: IncomeDocument[] = docs.docs.map((doc) => {
                    const idoc: IncomeDocument = { 
                        id: doc.id, 
                        amount: doc.data().amount, 
                        createdAt: new Date(doc.data().createdAt.toMillis()), 
                        description: doc.data().description 
                    }
                    return idoc;
                });
                console.log(retreivedDocs);
                setIncomeDocs(retreivedDocs)

            } catch (error) {
                console.log(error);

            }
        }
        getIncomes();
    })

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} >
            <h3>Hello</h3>
            <form>
                <div className="form-group">
                    <label htmlFor="income">Income</label><br />
                    <input className="form-input" type="number" name="income" id="income" />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label><br />
                    <input className="form-input" type="number" name="description" id="description" />
                </div>
                <button className="btn btn-ok">Add</button>
            </form>
            {
                incomeDocs.length > 0 && incomeDocs.map((idoc) => {
                    return <></>
                })
            }
        </Modal>
    )
}

export default IncomeModal
