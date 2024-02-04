export interface IncomeDocument {
    uid: string | undefined,
    amount: number,
    createdAt: Date,
    description: string
    id: string
}

export interface AddIncomeDocument {
    uid: string | undefined,
    amount: number,
    createdAt: Date,
    description: string
}

export interface ExpenseDocument {
    id: string,
    amount: number,
    color: string,
    title: string
    uid: string | undefined
}
export interface AddExpenseDocument {
    amount: number,
    color: string,
    title: string
    uid: string | undefined
}