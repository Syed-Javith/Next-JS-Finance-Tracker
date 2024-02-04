import React, { FC } from 'react'
import { formatCurrency } from "@/lib/utils";

interface MyExpenseProps {
  title : string,
  amount : number,
  color : string
}
const MyExpense : FC<MyExpenseProps> = ({ title , amount , color } ) => {
  return (
    <div className="w-[50vw]">
    <div className="bg-slate-500 rounded-full flex items-center py-2 hover:scale-105 transition-all">
      <div className={"h-[20px] w-[20px] rounded-full ml-2"} style={{backgroundColor : color}}></div>
      <div className="flex justify-between flex-1 mx-2">
        <p>{title}</p>
        <p className="self-end">{formatCurrency(amount)}</p>
      </div>
    </div>
  </div>
  )
}

export default MyExpense
