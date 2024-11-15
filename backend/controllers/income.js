const IncomeSchema = require("../models/IncomeModel");

exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date ,userId} = req.body;

    const income = new IncomeSchema({
        title,
        amount,
        category,
        description,
        date,
        userId
    });

    try {
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' });
        }
        if (amount <= 0 || !amount === 'number') {
            return res.status(400).json({ message: 'Amount must be a positive number!' });
        }
        await income.save();
        res.status(200).json({ message: 'Income Added' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getIncomes = async (req, res) => {
        try {
            const { userId } = req.params;
            // Define filter criteria, for example:
            const filter = {
              userId: userId,
            };
        
            const incomes = await IncomeSchema.find(filter).sort({ createdAt: -1 });
            res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deleteIncome = async (req, res) => {
    const { id } = req.params;
    IncomeSchema.findByIdAndDelete(id).then((income) => {
        res.status(200).json({ message: 'Income Deleted' });
    }
    ).catch((err) => {
        res.status(500).json({ message: 'Server Error' });
    }); }