import { User } from '../models/User.js';

export class UserServcie {
    async findById(id) {
        const users = await User.findById(id);
        return users;
    }

    async modifyUser(id, user) {
        const userRecord = await User.modifyUser(id, user);
        const accessToken = await userRecord.generateAccessToken(); 
        const refreshToken = await userRecord.generateRefreshToken(); 
        return { userRecord, accessToken, refreshToken };
    }

    async deleteUser(id) {
        await User.deleteUser(id);
    }
}