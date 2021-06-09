import { User } from '../../models/User.js';

// 회원 정보 수정 시 닉네임이 중복되었는지 체크한다.
const nickNameDuplicationCheck = async (req, res, next) => {
    try {
        if(req.body.nickName) {
            const user = await User.findByNickName(req.body.nickName);
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