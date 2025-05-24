const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const User = require('../models/user');



const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validimi bazik në backend (regex për fjalëkalimin)
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const passwordRegex = /^[A-Z](?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error: 'Password must start with an uppercase letter, contain at least 8 characters, a number, and a special character.'
      });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); 
    const user = await User.create({ username, email, password: hashedPassword, role: 'patient' });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Registration error:', error);  
    res.status(400).json({ error: error.message });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: 'JWT_SECRET is not defined in environment variables' });
    }

    // Validim bazik për email dhe fjalëkalim
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

   
    // Regex për password (njësoj si në regjistrim)
    const passwordRegex = /^[A-Z](?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error: 'Invalid password format. Must start with an uppercase letter, contain at least 8 characters, a number, and a special character.'
      });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('ubtsecured', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 60 * 60 * 1000 
    });

    res.json({ 
      message: 'Login successful', 
      token,
      user: { id: user.id, username: user.username, role: user.role } 
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = { register, login };
