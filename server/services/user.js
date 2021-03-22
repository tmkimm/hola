import { User } from '../models/User.js';

export default class UserServcie {
    async findById(id) {
        const users = await User.findById(id);
        return users;
    }

    async modifyUser(id, user) {
        const userRecord = await User.modifyUser(id, user);
        return userRecord;
    }

    async deleteUser(id) {
        await User.deleteUser(id);
    }
}