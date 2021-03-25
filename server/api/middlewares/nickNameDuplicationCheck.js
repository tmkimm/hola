import { User } from '../../models/User.js';

const nickNameDuplicationCheck = async (req, res, next) => {
    try {
        if(req.body.nickName) {
            const user = await User.findByNickname(req.body.nickName);
            if(user) {
                return res.status(400).json({message : `Nickname is duplicated.`});
            }
        }
        next();
    } catch(err) {
        return res.status(400).json({message : `Nickname is duplicated.`});
    }
}

export { nickNameDuplicationCheck };