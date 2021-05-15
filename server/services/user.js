import config from "../config/index.js";
import { User } from "../models/User.js";
import AWS from "aws-sdk";

export class UserServcie {
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
}
