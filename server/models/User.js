import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';

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
    likeLanguages: [String]
});

userSchema.statics.deleteUser= async function(id) {
    await User.findByIdAndDelete(
        { _id: id }
    );
}

userSchema.statics.modifyUser = async function(id, user) {
    const userRecord = await User.findByIdAndUpdate(
        { _id: id },
        user,
        { 
          new: true
        }
      );
    return userRecord;
}

userSchema.statics.findByEmail = function(email) {
    return this.findOne({ email: email });
};

userSchema.statics.findByIdToken = function(idToken) {
    return this.findOne({ idToken: idToken });
};

userSchema.methods.generateAccessToken = async function() {
    const user = this;
    const accessToken = await jwt.sign(
        {
            nickName: user.nickName,
            email: user.email
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
            email: user.email
        },
        config.jwtSecretKey,
        {
            expiresIn: '2w',
            issuer: config.issuer
     });
};

const User = mongoose.model('User', userSchema);

export { User };

