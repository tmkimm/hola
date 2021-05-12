import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

export default {
  port: parseInt(process.env.PORT, 10),

 /* MongoDB URL */
  databaseURL: process.env.MONGODB_URI,
 /* API configs */
  api: {
    prefix: '/api'
  },
 /* Google OAuth2.0 */
  googleClientID: process.env.GOOGLE_CLIENT_ID,
/* GitHub OAuth2.0 */
  githubClientID: process.env.GITHUB_CLIENT_ID,
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
 /* JWT Secret */
  jwtSecretKey: process.env.JWT_SECRET_KEY,
 /* Used by winston logger */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  issuer: 'Hola',
  /* S3 */
  S3AccessKeyId: process.env.S3_ACCESS_KEY_ID,
  S3SecretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  S3BucketName: process.env.S3_BUCKET_NAME,
  S3BucketRegion: process.env.S3_BUCKET_REGION,

};