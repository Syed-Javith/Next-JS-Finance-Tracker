"use client"
import React, { Dispatch, FC, SetStateAction, useContext, useRef, useState } from 'react'
import Modal from '../Modal'
import { finaceContext } from '@/app/FinanceProvider'
import { AddExpenseDocument } from '@/types/income.doc'
import { userContext } from '@/app/UserProvider'

interface ExpenseModalProps {
  isOpen : boolean ,
  setIsOpen : Dispatch<SetStateAction<boolean>>,
}

const ExpenseModal : FC<ExpenseModalProps>= ({ isOpen , setIsOpen }) => {
  const {addExpenseDocs } = useContext(finaceContext);
  const {user} = useContext(userContext)
  const [isPending , setIsPending] = useState<boolean>(false);
  const titleRef = useRef<HTMLInputElement>(null)
  const amountRef = useRef<HTMLInputElement>(null)
  const colorRef = useRef<HTMLInputElement>(null)

  const addExpenseHandler = async () => {
    setIsPending(true)
    const addExpenseDoc : AddExpenseDocument = {
      amount : Number(amountRef.current?.value),
      title : titleRef.current?.value + "",
      color : colorRef.current?.value || "#fff",
      uid : user?.uid 
    }
    await addExpenseDocs(addExpenseDoc)
    setIsPending(false)
    setIsOpen(false)
  }
  return (
    <div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <form onSubmit={(e) => { e.preventDefault(); addExpenseHandler() }}>
          <div className="form-group">
            <label htmlFor="title">
              Your Expense
            </label>
            <input ref={titleRef} type="text" className="form-input" />
          </div>
          <div className="form-group">
            <label htmlFor="amount">
              Your Amount
            </label>
            <input ref={amountRef} type="number" className="form-input" />
          </div>
          <div className="form-group">
            <label htmlFor="color">
              Pick color
            </label>
            <input ref={colorRef} type="color" className="form-input" />
          </div>
          <input type="submit" value={isPending ? "Adding..." : "Add Expense" } className='btn btn-danger' />
        </form>
      </Modal>
    </div>
  )
}

export default ExpenseModal
