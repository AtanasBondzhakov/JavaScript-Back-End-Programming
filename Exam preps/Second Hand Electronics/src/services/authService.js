import bcrypt from 'bcrypt';

import jwt from '../lib/jwt.js';
import User from "../models/User.js";



export const authService = {
    async register(email, username, password, rePassword) {

        if (password !== rePassword) {
            throw new Error('Passwords don\'t match!');
        }
        const user = await User.findOne({ $or: [{ email }, { username }] });

        if (user) {
            throw new Error('User already exist!');
        }

        const newUser = await User.create({ email, username, password });

        return this.generateToken(newUser);


    },
    async login(email, password) {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('Invalid user or password');
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            throw new Error('Invalid user or password')
        }

        return this.generateToken(user);
    },
    async generateToken(user) {
        const payload = {
            _id: user._id,
            email: user.email,
            username: user.username
        }

        const header = { expiresIn: '2h' };

        const token = await jwt.sign(payload, process.env.JWT_SECRET, header);

        return token;
    }
}