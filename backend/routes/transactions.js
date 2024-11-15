const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
const router = require('express').Router();
const { 
    register, 
    login, 
    getProfile, 
    updateProfile 
} = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/add-income', addIncome)
    .get('/get-incomes/:userId', getIncomes)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense', addExpense)
    .get('/get-expenses/:userId', getExpense)
    .delete('/delete-expense/:id', deleteExpense)
    .post('/register', register)
    .post('/login', login)
    .get('/profile', auth, getProfile)
    .put('/profile', auth, updateProfile);

module.exports = router