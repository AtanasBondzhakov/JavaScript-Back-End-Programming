import bcrypt from 'bcrypt';

import jwt from '../lib/jwt.js';
import User from "../models/User.js";

export const authService = {
    async register(firstName, lastName, email, password, rePassword) {

        if (password !== rePassword) {
            throw new Error('Passwords mismatch!');
        }
        const user = await User.findOne({ $or: [{ email }] });

        if (user) {
            throw new Error('User already exist!');
        }

        const newUser = await User.create({ firstName, lastName, email, password });

        return this.generateToken(newUser);
    },
    async login(email, password) {
        //TODO Modify userdata
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
        //TODO Modify data
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