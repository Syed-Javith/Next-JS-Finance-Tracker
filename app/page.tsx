"use client"
import { formatCurrency } from "@/lib/utils";
import MyExpense from "./components/MyExpense";
import { useState } from "react";
import Modal from "./components/Modal";

export default function Home() {
  const [isOpen , setIsOpen] = useState<boolean>(false);
  return (
    <>
      {
        isOpen && 
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
        </Modal>
      }
      <div className="px-[5%]">
        <p className="text-gray-500">My Balance</p>
        <h1 className="text-3xl">{formatCurrency(100000)}</h1>
        <div className="flex gap-4 mt-4">
          <button onClick={() => setIsOpen(true)} className="btn btn-primary">
            + Expense
          </button>
          <button onClick={() => setIsOpen(true)} className="btn btn-ok">
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
