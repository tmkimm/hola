import config from "../config/index.js";
import { User } from "../models/User.js";
import AWS from "aws-sdk";

export class UserServcie {

  // 닉네임을 이용하여 사용자 정보를 조회한다.
  async findByNickName(nickName) {
    const users = await User.findByNickName(nickName);
    return users;
  }

  // id를 이용하여 사용자 정보를 조회한다.
  async findById(id) {
    const users = await User.findById(id);
    return users;
  }

  // 사용자 정보를 수정한다.
  // 닉네임을 기준으로 Token을 생성하기 때문에 Token을 재발급한다.
  async modifyUser(id, user) {
    const userRecord = await User.modifyUser(id, user);
    const accessToken = await userRecord.generateAccessToken();
    const refreshToken = await userRecord.generateRefreshToken();
    return { userRecord, accessToken, refreshToken };
  }

  async deleteUser(id) {
    await User.deleteUser(id);
  }

  // 사용자가 관심 등록한 글 리스트를 조회한다.
  async findUserLikes(id) {
    const userLikes = await User.findById(id)
    .where('isDeleted').equals(false)
    .populate('likeStudies')
    .select('likeStudies');
    return userLikes;
  }

  // 사용자의 읽은 목록을 조회한다.
  async findReadList(id) {
    const readLIst = await User.findById(id)
    .where('isDeleted').equals(false)
    .populate('readList')
    .select('readList');
    return readLIst;
  }

  // S3 Pre-Sign Url을 발급한다.
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

  // 사용자의 읽은 목록을 추가한다.
  async addReadLists(studyId, userId) {
    const user = await User.addReadList(studyId, userId);
    return user;
  }
}
