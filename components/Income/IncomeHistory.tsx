import { formatCurrency } from '@/lib/utils';
import { IncomeDocument } from '@/types/income.doc'
import { CalendarDays, Trash2Icon } from 'lucide-react';
import React, { FC } from 'react'
import DeleteButton from '../DeleteButton';

interface IncomeHistoryProps {
    incomes: IncomeDocument[],
}

const IncomeHistory: FC<IncomeHistoryProps> = ({ incomes }) => {
    return (
        <div className='mt-4'>
            {
                incomes.map((income) => {
                    return <div key={income.id} className='my-2'>
                        <div className='p-4 w-[90%] bg-slate-700 text-white rounded-md flex justify-evenly'>
                            <div>
                                <p>
                                    <span className='md:text-xl font-bold text-blue-400 mr-2 text-md'>{income.description}</span> {formatCurrency(income.amount)}
                                </p>
                            </div>
                            <div className='flex flex-col gap-2 w-full mt-auto'>
                                <p className='flex gap-2 self-end'><CalendarDays /> {income.createdAt.toLocaleDateString('in')}</p>
                                <DeleteButton context={'income'} id={income.id}>
                                    <Trash2Icon />
                                </DeleteButton>
                            </div>
                        </div>
                    </div>;
                })
            }
        </div>
    )
}

export default IncomeHistory
