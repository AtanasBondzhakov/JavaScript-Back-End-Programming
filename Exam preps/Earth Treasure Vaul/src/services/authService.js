import bcrypt from 'bcrypt';

import User from "../models/User.js";
import jwt from '../lib/jwt.js';

export const authService = {
    async register(email, password, rePassword) {
        if (password !== rePassword) {
            throw new Error('Passwords don\'t match!');
        }

        const user = await User.findOne({ email });

        if (user) {
            throw new Error('User already exist!');
        }

        const newUser = await User.create({ email, password });

        return this.generateToken(newUser);
    },
    async login(email, password) {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('Invalid user or password');
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            throw new Error('Invalid user or password');
        }

        return this.generateToken(user);
    },
    async generateToken(user) {
        const payload = {
            _id: user._id,
            email: user.email
        }

        const header = { expiresIn: '2h' };

        const token = await jwt.sign(payload, process.env.JWT_SECRET, header);

        return token;
    }
}