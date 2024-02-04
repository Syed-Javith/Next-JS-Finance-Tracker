import { ExpenseDocument, IncomeDocument } from "@/types/income.doc"
import { User } from "firebase/auth"
import { Query, getDocs } from "firebase/firestore"

export const formatCurrency = (amount : number) => {
    const formatted = Intl.NumberFormat('en-US',{
        currency : "INR",
        style : "currency"
    })
    return formatted.format(amount)
}

export const getIncomeDocuments = async (q : Query , uid : string) => {
    try {
        const docs = await getDocs(q)
        const retreivedDocs: IncomeDocument[] = docs.docs.map((doc) => {
            const idoc: IncomeDocument = { 
                uid : uid,
                id: doc.id, 
                amount: doc.data().amount, 
                createdAt: new Date(doc.data().createdAt.toMillis()), 
                description: doc.data().description 
            }
            return idoc;
        });
        return retreivedDocs;
        // console.log(retreivedDocs);
        // setIncomeDocs(retreivedDocs);
        // setBalance(incomeDocs.reduce((a, b) => { return (a + b.amount) }, 0))
    } catch (error) {
        console.log(error);
    }
}
export const getExpenseDocuments = async (q : Query , uid : string) => {
    try {
        const docs = await getDocs(q)
        const retreivedDocs: ExpenseDocument[] = docs.docs.map((doc) => {
            const idoc: ExpenseDocument = { 
                uid : uid,
                id: doc.id, 
                amount: doc.data().amount, 
                color : doc.data().color,
                title : doc.data().title,
            }
            return idoc;
        });
        return retreivedDocs;
        // console.log(retreivedDocs);
        // setIncomeDocs(retreivedDocs);
        // setBalance(incomeDocs.reduce((a, b) => { return (a + b.amount) }, 0))
    } catch (error) {
        console.log(error);
    }
}