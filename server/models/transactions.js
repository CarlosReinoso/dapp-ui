const bookshelf = require('../bookshelf');

const Transaction = bookshelf.model('Transaction', {
  tableName: 'transactions',
});

module.exports = Transaction;