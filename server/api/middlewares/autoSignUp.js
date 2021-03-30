import { User } from '../../models/User.js';

const autoSignUp = async (req, res, next) => {
    const user = await User.findByIdToken(req.user.idToken);

    if(!user) {
        const newUser = await User.create(req.user);   
        return res.status(200).json({
            _id: newUser._id,
            loginSuccess: false,
            message : '회원 가입을 진행해야 합니다.'
        });
    } else if(!user.nickName) {
        return res.status(200).json({
            _id: user._id,
            loginSuccess: false,
            message : '회원 가입을 진행해야 합니다.'
        });
    } else {
        next();
    }
}

export { autoSignUp }