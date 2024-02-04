import React, { FC } from 'react'
import { formatCurrency } from "@/lib/utils";
import DeleteButton from '../DeleteButton';

interface MyExpenseProps {
  title: string,
  amount: number,
  color: string,
  id: string
}
const MyExpense: FC<MyExpenseProps> = ({ id, title, amount, color }) => {
  return (
    <div className="md:w-[50vw] w-[80vw]">
      <div className="bg-slate-500 rounded-full flex items-center py-2 hover:scale-105 transition-all group">
        <div className={"h-[20px] w-[20px] rounded-full ml-2 flex group-hover:h-[25px] group-hover:w-[25px]"} style={{ backgroundColor: color }}>
          <DeleteButton context={"expense"} id={id} >
            -
          </DeleteButton>
        </div>
        <div className="flex justify-between flex-1 mx-2">
          <p>{title}</p>
          <p className="self-end">{formatCurrency(amount)}</p>
        </div>
      </div>
    </div>
  )
}

export default MyExpense
