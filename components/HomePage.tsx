import { finaceContext } from '@/app/FinanceProvider';
import { db } from '@/lib/firebase/firebase.config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import IncomeModal from './Income/IncomeModal';
import { formatCurrency, getExpenseDocuments, getIncomeDocuments } from '@/lib/utils';
import MyExpense from './Expense/MyExpense';
import Nav from './Nav';
import { userContext } from '@/app/UserProvider';
import ExpenseModal from './Expense/ExpenseModal';

const HomePage = () => {
    const { incomeDocs, setIncomeDocs, expenseDocs, setExpenseDocs } = useContext(finaceContext);
    const { user } = useContext(userContext)
    const [isIncomeModalOpen, setIsIncomeModalOpen] = useState<boolean>(false);
    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState<boolean>(false);
    const [balance, setBalance] = useState<number>(incomeDocs.reduce((a, b) => { return (a + b.amount) }, 0) - expenseDocs.reduce((a, b) => { return (a + b.amount) }, 0))
    const getIncomes = async () => {
        const colRef = collection(db, "income")
        const q = query(colRef, where("uid", "==", user?.uid))
        const retreivedDocs = await getIncomeDocuments(q, user?.uid + "")
        console.log(retreivedDocs);
        if (retreivedDocs) {
            setIncomeDocs(retreivedDocs);
        }
    }
    const getExpenses = async () => {
        const colRef = collection(db, "expense")
        const q = query(colRef, where("uid", "==", user?.uid))
        const retreivedDocs = await getExpenseDocuments(q, user?.uid + "")
        console.log(retreivedDocs);

        if (retreivedDocs) {
            setExpenseDocs(retreivedDocs);
        }
    }
    const updateBalance = () => {
        setBalance(incomeDocs.reduce((a, b) => { return (a + b.amount) }, 0) - expenseDocs.reduce((a, b) => { return (a + b.amount) }, 0))
    }
    useEffect(() => {
        getIncomes();
        getExpenses();
    }, [])
    useEffect(() => {
        updateBalance();
    }, [incomeDocs, expenseDocs])

    return (
        <div>
            <Nav />
            {
                isIncomeModalOpen && <IncomeModal isOpen={isIncomeModalOpen} setIsOpen={setIsIncomeModalOpen} />

            }
            {
                isExpenseModalOpen && <ExpenseModal isOpen={isExpenseModalOpen} setIsOpen={setIsExpenseModalOpen} />
            }
            <div className="px-[5%]">
                <p className="text-gray-500">My Balance</p>
                <h1 className="text-3xl">{formatCurrency(balance)}</h1>
                <div className="flex gap-4 mt-4">
                    <button onClick={() => setIsExpenseModalOpen(true)} className="btn btn-primary">
                        + Expense
                    </button>
                    <button onClick={() => setIsIncomeModalOpen(true)} className="btn btn-ok">
                        + Income
                    </button>
                </div>

                <section>
                    <h1 className="text-3xl my-4">My Expenses</h1>
                    <div className="flex flex-col gap-4">
                        {
                            expenseDocs.map((expense) => {
                                return <MyExpense key={expense.id} amount={expense.amount} color={expense.color} title={expense.title} />
                            })
                        }
                    </div>
                </section>
            </div>
        </div>
    )
}

export default HomePage
