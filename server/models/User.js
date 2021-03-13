import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import { generateToken, decodeToken } from '../services/token.js'

const userSchema = mongoose.Schema({
    id: {
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
    nickname: {
        type: String,
        maxlength: 100
    },
    password: {
        type: String,
        minlength: 8
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    idToken: {
        type: String
    },
    tokenType: {
        type: String
    }
});

userSchema.statics.findByEmail = function(email) {
    return this.findOne({ email: email });
};

userSchema.statics.findByUserID = function(userId) {
    return this.findOne({ id: userId });
};

userSchema.methods.generateAccessToken = function() {
    const user = this;
    let accessToken = generateToken(
        {
            name: user.name,
            email: user.email
        },
        '1h'
    );
    return accessToken;
};

userSchema.methods.generateRefreshToken = function() {
    const user = this;
    let refreshToken = generateToken(
        {
            email: user.email
        },
        '2w'
    );
    return refreshToken;
};

const User = mongoose.model('User', userSchema);

export { User };

