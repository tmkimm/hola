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
    likeLanguages: [String],
    likeStudies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Study'}],
    readList: [{type: mongoose.Schema.Types.ObjectId, ref: 'Study'}]
},
{
    timestamps: true
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

userSchema.statics.findByNickName = async function(nickName) {
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
            expiresIn: '1m',
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
            expiresIn: '5m',
            issuer: config.issuer
     });
    return refreshToken;
};

userSchema.statics.addLikeStudy = async function(studyId, userId) {
    return await User.findByIdAndUpdate(
        { _id: userId },
        {
          $push: {
            likeStudies: {
                _id: studyId
            }
          }
        },
        {
          new: true,
          upsert: true
        }
      );
}

userSchema.statics.deleteLikeStudy = async function(studyId, userId) {
    const deleteRecord = await User.findOneAndUpdate(
        { _id: userId },
        {
            $pull: { likeStudies: studyId }
        }
      );
    return deleteRecord;
}

userSchema.statics.addReadList = async function(studyId, userId) {
    const isStudyExists = await User.findOne({ readList: studyId });
    if(!isStudyExists) {
        await User.findByIdAndUpdate(
            { _id: userId },
            {
              $push: {
                readList: {
                    _id: studyId
                }
              }
            }
        );
    }
}

const User = mongoose.model('User', userSchema);

export { User };

