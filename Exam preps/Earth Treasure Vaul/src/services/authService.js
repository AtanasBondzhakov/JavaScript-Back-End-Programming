import User from "../models/User.js"

export const authService = {
    async register(email, password, rePassword) {
        console.log(email);
        
        return await User.create({ email, password });
    }
}