class TransactionAnalyzer {
    constructor(transactions) {
        this.transactions = transactions;
    }

    addTransaction(transaction) {
        this.transactions.push(transaction);
    }

    getUniqueTransactionTypes() {
        const types = new Set();x
        this.transactions.forEach(transaction => types.add(transaction.transaction_type));
        return Array.from(types);
    }

    getTotalAmount() {
        return this.transactions.reduce((total, transaction) => total + transaction.transaction_amount, 0);
    }

    getTotalAmountByDate(year, month, day) {
        const date = new Date(year, month - 1, day);
        return this.transactions
            .filter(transaction => new Date(transaction.transaction_date) <= date)
            .reduce((total, transaction) => total + transaction.transaction_amount, 0);
    }

    getTransactionsByType(type) {
        return this.transactions.filter(transaction => transaction.transaction_type === type);
    }

    getTransactionsInRange(startDate, endDate) {
        return this.transactions.filter(transaction => {
            const transactionDate = new Date(transaction.transaction_date);
            return transactionDate >= startDate && transactionDate <= endDate;
        });
    }

    getTransactionsByMerchant(merchantName) {
        return this.transactions.filter(transaction => transaction.merchant_name === merchantName);
    }

    getAverageTransactionAmount() {
        const totalAmount = this.getTotalAmount();
        return totalAmount / this.transactions.length;
    }

    getTransactionsInAmountRange(minAmount, maxAmount) {
        return this.transactions.filter(transaction => {
            return transaction.transaction_amount >= minAmount && transaction.transaction_amount <= maxAmount;
        });
    }

    getTotalDebitAmount() {
        return this.transactions
            .filter(transaction => transaction.transaction_type === 'debit')
            .reduce((total, transaction) => total + transaction.transaction_amount, 0);
    }

    findMonthWithMostTransactions() {
        const months = {};
        this.transactions.forEach(transaction => {
            const month = new Date(transaction.transaction_date).getMonth() + 1;
            months[month] = (months[month] || 0) + 1;
        });
        let maxMonth;
        let maxCount = 0;
        for (const month in months) {
            if (months[month] > maxCount) {
                maxMonth = month;
                maxCount = months[month];
            }
        }
        return parseInt(maxMonth);
    }

    findMonthWithMostDebitTransactions() {
        const debitTransactions = this.transactions.filter(transaction => transaction.transaction_type === 'debit');
        return this.findMonthWithMostTransactions(debitTransactions);
    }

    getTransactionTypesWithMostTransactions() {
        const debitCount = this.transactions.filter(transaction => transaction.transaction_type === 'debit').length;
        const creditCount = this.transactions.filter(transaction => transaction.transaction_type === 'credit').length;
        if (debitCount > creditCount) {
            return 'debit';
        } else if (creditCount > debitCount) {
            return 'credit';
        } else {
            return 'equal';
        }
    }

    getTransactionsBeforeDate(date) {
        return this.transactions.filter(transaction => new Date(transaction.transaction_date) < date);
    }

    findTransactionById(id) {
        return this.transactions.find(transaction => transaction.transaction_id === id);
    }

    mapTransactionDescriptions() {
        return this.transactions.map(transaction => transaction.transaction_description);
    }
}

module.exports = TransactionAnalyzer;
