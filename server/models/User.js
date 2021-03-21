import mongoose from 'mongoose';
import { generateToken, decodeToken } from '../services/token.js';

const userSchema = mongoose.Schema({
    idToken: {
        type: String
    },
    tokenType: {
        type: String
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    name: {
        type: String,
        maxlength: 50
    },
    nickName: {
        type: String,
        maxlength: 100
    },
    password: {
        type: String,
        minlength: 8
    },
    image: String,
    likesLanguage: [String]
});

userSchema.statics.findByEmail = function(email) {
    return this.findOne({ email: email });
};

userSchema.statics.findByIdToken = function(idToken) {
    return this.findOne({ idToken: idToken });
};

userSchema.methods.generateAccessToken = async function() {
    const user = this;
    const accessToken = await generateToken(
        {
            nickName: user.nickName,
            email: user.email
        },
        '1h'
    );
    return accessToken;
};

userSchema.methods.generateRefreshToken = function() {
    const user = this;
    const refreshToken = generateToken(
        {
            email: user.email
        },
        '2w'
    );
    return refreshToken;
};

const User = mongoose.model('User', userSchema);

export { User };

