export const formatCurrency = (amount : number) => {
    const formatted = Intl.NumberFormat('en-US',{
        currency : "INR",
        style : "currency"
    })
    return formatted.format(amount)
}