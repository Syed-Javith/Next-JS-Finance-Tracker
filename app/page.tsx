"use client"
import { formatCurrency } from "@/lib/utils";
import MyExpense from "../components/MyExpense";
import { useContext, useState } from "react";
import IncomeModal from "../components/Income/IncomeModal";
import { finaceContext } from "./FinanceProvider";

export default function Home() {
  const {incomeDocs} = useContext(finaceContext);
  const [isIncomeModalOpen , setIsIncomeModalOpen] = useState<boolean>(false);
  const [balance,setBalance] = useState<number>( incomeDocs.reduce((a,b) => { return (a + b.amount )},0) )

  return (
    <>
      {
        isIncomeModalOpen && <IncomeModal isOpen={isIncomeModalOpen} setIsOpen={setIsIncomeModalOpen} />
        
      }
      <div className="px-[5%]">
        <p className="text-gray-500">My Balance</p>
        <h1 className="text-3xl">{formatCurrency(balance)}</h1>
        <div className="flex gap-4 mt-4">
          <button onClick={() => setIsIncomeModalOpen(true)} className="btn btn-primary">
            + Expense
          </button>
          <button onClick={() => setIsIncomeModalOpen(true)} className="btn btn-ok">
            + Income
          </button>
        </div>

        <section>
          <h1 className="text-3xl my-4">My Expenses</h1>
          <div className="flex flex-col gap-4">
            <MyExpense amount={5000} color="yellow" title="petrol" />
            <MyExpense amount={400} color="green" title="food" />
            <MyExpense amount={20000} color="red" title="vacation" />
            <MyExpense amount={5000} color="orange" title="clothes" />
          </div>
        </section>
      </div>
    </>
  );
}
