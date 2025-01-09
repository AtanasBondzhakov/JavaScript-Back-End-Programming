import User from "../models/User.js"

export const authService = {
    async register(email, password, rePassword) {
        if (password !== rePassword) {
            throw new Error('Passwords don\'t match!');
        }

        const user = await User.findOne({ $or: [{ username }, { email }] });

        if(user) {
            throw new Error('User already exist!');
        }

        return await User.create({ email, password });
    }
}