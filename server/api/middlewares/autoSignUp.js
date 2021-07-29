import { User } from '../../models/User.js';

// 로그인 시 회원가입 여부를 판단한다.
// loginSuccess
// true: 로그인 완료
// false: 로그인 실패. 회원 가입 필요.
const autoSignUp = async (req, res, next) => {
    console.log(`autoSignup idTOken : ${req.user.idToken}`);
    const user = await User.findByIdToken(req.user.idToken);
    console.log(user);
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