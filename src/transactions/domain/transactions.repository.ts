
export interface TransactionRepository {
    createTransaction(data)
    transactions(transactionWhereUniqueInput)
    transaction(transactionWhereInput)
    updateTransaction(transactionWhereUniqueInput, data)
    removeTransaction(transactionWhereUniqueInput)

}