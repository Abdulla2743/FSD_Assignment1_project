const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const users = [];
const SECRET_KEY = 'jkldfvhiilas1264@';

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, email, password: hashedPassword });
    res.status(201).send('User registered');
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(400).send({ error: 'User not found' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(400).send({ error: 'Invalid password' });
    }

    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
};

exports.logout = (req, res) => {
    res.status(200).send('User logged out');
};
