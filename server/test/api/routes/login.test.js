import request from 'supertest';
import 'regenerator-runtime/runtime';
import { server } from '../../../app.js'
import mongoose from 'mongoose';
import config from '../../../config/index.js';
import jwt from 'jsonwebtoken';

beforeAll( async () => {
    await mongoose.connect(process.env.MONGODB_TEST_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        autoIndex: false
    });
  })

afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
    await server.close();
});

const isAccessTokenValid = async (accessToken) => {
    try {
        const decodedUser = await jwt.verify(accessToken, config.jwtSecretKey);
        return true;    
    } catch (error) {
        return false;
    }
}

describe("POST /api/login/signup", () => {
    it('닉네임이 중복되었을 경우 200 응답', async() => { 
        const res = await request(server)
        .post('/api/login/signup')
        .type('application/json')
        .send({ nickName: 'Hola' })
        expect(res.status).toBe(200)
        expect(res.body.isExists).toEqual(true);
    });

    it('사용자 ID가 올바르지 않을 경우 404 응답', async() => { 
        const res = await request(server)
        .post('/api/login/signup')
        .type('application/json')
        .send({ id: '61442c0e97ce44432e9d5999' })
        expect(res.status).toBe(404)
    });

    it('성공시 발급된 Access Token이 유효한지 체크 응답', async() => { 
        const res = await request(server)
        .post('/api/login/signup')
        .type('application/json')
        .send({ id: '61442c0e97ce44432e9d5f2d' })
        expect(res.status).toBe(200)
        await expect( await isAccessTokenValid(res.body.accessToken)).toEqual(true);
    });
});

describe("POST /api/login", () => {
    it('구글 로그인 시 올바른 Oauth2.0 token이 아니면 400 응답', async() => { 
        const res = await request(server)
        .post('/api/login')
        .type('application/json')
        .send({ loginType: 'google', code: '123456'})
        expect(res.status).toBe(400)
    });
    it('깃허브 로그인 시 올바른 Oauth2.0 token이 아니면 400 응답', async() => { 
        const res = await request(server)
        .post('/api/login')
        .type('application/json')
        .send({ loginType: 'github', code: '123456'})
        expect(res.status).toBe(400)
    });
    it('카카오 로그인 시 올바른 Oauth2.0 token이 아니면 400 응답', async() => { 
        const res = await request(server)
        .post('/api/login')
        .type('application/json')
        .send({ loginType: 'kakao', code: '123456'})
        expect(res.status).toBe(400)
    });

    it('로그인 성공 시 발급된 Access Token이 유효한지 체크', async() => { 
        const res = await request(server)
        .post('/api/login')
        .type('application/json')
        .send({ loginType: 'guest'})
        expect(res.status).toBe(200)
        await expect( await isAccessTokenValid(res.body.accessToken)).toEqual(true);
    });
});