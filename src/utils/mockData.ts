import { Transaction } from '../types'; // Removed "type" keyword and it now points to the new file
export const initialTransactions: Transaction[] = [
  { id: 'tx_001', date: '2023-10-01', amount: 5200.00, category: 'Salary', type: 'Income', description: 'October Base Salary' },
  { id: 'tx_002', date: '2023-10-03', amount: 1250.00, category: 'Housing', type: 'Expense', description: 'Monthly Rent' },
  { id: 'tx_003', date: '2023-10-05', amount: 85.50, category: 'Utilities', type: 'Expense', description: 'Electric Bill' },
  { id: 'tx_004', date: '2023-10-08', amount: 320.00, category: 'Groceries', type: 'Expense', description: 'Whole Foods Market' },
  { id: 'tx_005', date: '2023-10-12', amount: 150.00, category: 'Subscriptions', type: 'Expense', description: 'Software Licenses' },
  { id: 'tx_006', date: '2023-10-15', amount: 800.00, category: 'Freelance', type: 'Income', description: 'Web Design Project' },
  { id: 'tx_007', date: '2023-10-18', amount: 65.00, category: 'Dining', type: 'Expense', description: 'Dinner at Mario\'s' },
  { id: 'tx_008', date: '2023-10-22', amount: 120.00, category: 'Groceries', type: 'Expense', description: 'Trader Joe\'s' },
  { id: 'tx_009', date: '2023-10-25', amount: 45.00, category: 'Transportation', type: 'Expense', description: 'Uber Rides' },
  { id: 'tx_010', date: '2023-10-28', amount: 200.00, category: 'Savings', type: 'Expense', description: 'Transfer to High-Yield' },
];