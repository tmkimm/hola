import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';

const userSchema = mongoose.Schema({
    idToken: String,
    tokenType: String,
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
    likeLanguages: [String]
});

userSchema.statics.deleteUser= async function(id) {
    await User.findByIdAndDelete(
        { _id: id }
    );
}

userSchema.statics.modifyUser = async function(id, user) {
    const userRecord = await User.findByIdAndUpdate(
        id,
        user,
        { 
          new: true
        }
      );
    return userRecord;
}

userSchema.statics.findByIdToken = async function(idToken) {
    return await User.findOne({ idToken: idToken });
};

userSchema.statics.findByEmail = async function(email) {
    return await User.findOne({ email: email });
};

userSchema.statics.findByNickname = async function(nickName) {
    return await User.findOne({ nickName: nickName });
};

userSchema.methods.generateAccessToken = async function() {
    const user = this;
    const accessToken = await jwt.sign(
        {
            nickName: user.nickName,
            idToken: user.idToken
        },
        config.jwtSecretKey,
        {
            expiresIn: '1h',
            issuer: config.issuer
     });
    return accessToken;
};

userSchema.methods.generateRefreshToken = async function() {
    const user = this;
    const refreshToken = await jwt.sign(
        {
            nickName: user.nickName
        },
        config.jwtSecretKey,
        {
            expiresIn: '2w',
            issuer: config.issuer
     });
    return refreshToken;
};

const User = mongoose.model('User', userSchema);

export { User };

