
export interface TransactionRepository {
    createTransaction(userId, data)
    transactions(transactionWhereInput)
    transaction(transactionWhereInput)
    updateTransaction(transactionWhereUniqueInput, data)
    removeTransaction(transactionWhereUniqueInput)

}