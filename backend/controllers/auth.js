exports.register = async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user with plain password
        const newUser = new User({
            email,
            password,  // Plain text password
            firstName,
            lastName
        });

        await newUser.save();
        // ... rest of registration logic ...
    } catch (error) {
        // ... error handling ...
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        // Direct password comparison
        if (password !== user.password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // ... rest of login logic ...
    } catch (error) {
        // ... error handling ...
    }
}; 