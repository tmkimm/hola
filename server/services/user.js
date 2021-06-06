import config from "../config/index.js";
import { User } from "../models/User.js";
import AWS from "aws-sdk";
import { nickNameDuplicationCheck } from '../api/middlewares/index.js';

export class UserServcie {

  async findByNickName(nickName) {
    const users = await User.findByNickName(nickName);
    return users;
  }

  async findById(id) {
    const users = await User.findById(id);
    return users;
  }

  async modifyUser(id, user) {
    const userRecord = await User.modifyUser(id, user);
    const accessToken = await userRecord.generateAccessToken();
    const refreshToken = await userRecord.generateRefreshToken();
    return { userRecord, accessToken, refreshToken };
  }

  async deleteUser(id) {
    await User.deleteUser(id);
  }

  async findUserLikes(id) {
    const userLikes = await User.findById(id).populate('likeStudies').select('likeStudies');
    return userLikes;
  }

  async findReadList(id) {
    const readLIst = await User.findById(id).populate('readList').select('readList');
    return readLIst;
  }

  async getPreSignUrl(fileName) {
    const s3 = new AWS.S3({
      accessKeyId: config.S3AccessKeyId,
      secretAccessKey: config.S3SecretAccessKey,
      region: config.S3BucketRegion,
    });

    const params = {
      Bucket: config.S3BucketName,
      Key: fileName,
      Expires: 60 * 60 * 3,
    };

    const signedUrlPut = await s3.getSignedUrlPromise("putObject", params);
    return signedUrlPut;
  }

  async addReadLists(studyId, userId) {
    const user = await User.addReadList(studyId, userId);
    return user;
  }
}
