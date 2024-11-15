const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');



// Register new user
exports.register = async (req, res) => {
  try {
    const { firstName, email, password } = req.body;

    // Trim all inputs
    const trimmedFirstName = firstName.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    // Check if user already exists
    const existingUser = await User.findOne({ email: trimmedEmail });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = await User.create({
      firstName: trimmedFirstName,
      email: trimmedEmail,
      password: trimmedPassword
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        email: user.email
      },
      userId: user._id
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Trim the inputs
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();
    
    console.log('Login attempt:', { 
      email: trimmedEmail,
      passwordLength: trimmedPassword.length 
    });

    // Check if user exists
    const user = await User.findOne({ email: trimmedEmail });
    
    if (!user) {
      console.log('No user found with email:', trimmedEmail);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('Password comparison:', {
      providedPassword: trimmedPassword,
      storedPassword: user.password,
      doTheyMatch: trimmedPassword === user.password
    });

    // Direct password comparison
    if (trimmedPassword !== user.password) {
      console.log('Password mismatch');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );


    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        firstName: user.firstName,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, email } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { firstName, email },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        firstName: user.firstName,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

