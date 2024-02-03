import { finaceContext } from '@/app/FinanceProvider';
import { formatCurrency } from '@/lib/utils';
import { IncomeDocument } from '@/types/income.doc'
import { CalendarDays, Trash2Icon } from 'lucide-react';
import React, { FC, useContext } from 'react'

interface IncomeHistoryProps {
    incomes: IncomeDocument[],
}

const IncomeHistory: FC<IncomeHistoryProps> = ({ incomes }) => {
    const {deleteIncomeDocs} = useContext(finaceContext)
    const deleteIncomeHandler = async (id : string) => {
        await deleteIncomeDocs(id)
    }
    return (
        <div className='mt-4'>
            {
                incomes.map((income) => {
                    return <div className='my-2'>
                        <div className='p-4 w-[90%] bg-slate-700 text-white rounded-md flex justify-evenly'>
                            <div>
                                <p>
                                    <span className='text-xl font-bold text-blue-400 mr-2'>{income.description}</span> {formatCurrency(income.amount)}
                                </p>
                            </div>
                            <div className='flex flex-col gap-2 w-full mt-auto'>
                                <p className='flex gap-2'><CalendarDays /> {income.createdAt.toLocaleDateString('in')}</p>
                                <div>
                                    <Trash2Icon onClick={() => deleteIncomeHandler(income.id)} className='self-end' size={20} />
                                </div>
                            </div>
                        </div>
                    </div>;
                })
            }
        </div>
    )
}

export default IncomeHistory