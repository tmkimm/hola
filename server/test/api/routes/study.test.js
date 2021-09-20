import request from 'supertest';
import 'regenerator-runtime/runtime';
import { server } from '../../../app.js'
import mongoose from 'mongoose';

let accessToken, newStudyId;
let createStudyData = {
    language: ['react'],
    title: '같이 사이드 프로젝트 하실분!',
    content: '댓글 달아주세요 :)'
}
beforeAll( async () => {
    await mongoose.connect(process.env.MONGODB_TEST_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        autoIndex: false
    });

    // 테스트를 위한 accessToken 발급
    const res = await request(server)
    .post('/api/login')
    .type('application/json')
    .send({ loginType: 'guest' });
    accessToken = res.body.accessToken;
  })

afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
    await server.close();
});

describe("POST /api/studies", () => {
    it('access token이 유효하지 않을 경우 401 응답', async() => { 
        const res = await request(server)
        .post('/api/studies')
        .type('application/json')
        .send(createStudyData)
        .set('Authorization', 'Bearer ' + accessToken + '123')
        expect(res.status).toBe(401)
    });

    it('글 등록 성공 시 201 응답', async() => { 
        const res = await request(server)
        .post('/api/studies')
        .type('application/json')
        .send(createStudyData)
        .set('Authorization', 'Bearer ' + accessToken)
        expect(res.status).toBe(201)
        newStudyId = res.body._id;
    });
});

describe("PATCH /api/studies", () => {
    it('글 수정 성공 시 201 응답', async() => { 
        const res = await request(server)
        .patch(`/api/studies/${newStudyId}`)
        .type('application/json')
        .send(createStudyData)
        .set('Authorization', 'Bearer ' + accessToken)
        expect(res.status).toBe(200)
    });
});

describe("GET /api/studies/:id", () => {
    it('스터디 id가 존재하지 않을 경우 404 응답', async() => {
        const result = await request(server).get('/api/studies/6103fca959c4001f004943b9');
        expect(result.status).toBe(404);
    });

    it('신규 등록한 스터디 상세 정상 조회', async() => {
        const result = await request(server).get(`/api/studies/${newStudyId}`);
        expect(result.status).toBe(200);
    });
});


describe("POST /api/studies/likes", () => {
    it('좋아요 추가 성공 시 201 응답', async() => { 
        const res = await request(server)
        .post('/api/studies/likes')
        .type('application/json')
        .send({studyId: newStudyId})
        .set('Authorization', 'Bearer ' + accessToken)
        expect(res.status).toBe(201)
        expect(res.body.likeUsers).toBeDefined();
    });
});

describe("DELETE /api/studies/likes", () => {
    it('좋아요 삭제 성공 시 201 응답', async() => { 
        const res = await request(server)
        .delete(`/api/studies/likes/${newStudyId}`)
        .type('application/json')
        .set('Authorization', 'Bearer ' + accessToken)
        expect(res.status).toBe(201)
        expect(res.body.likeUsers).toBeDefined();
    });
});

describe("DELETE /api/studies/:id", () => {
    it('스터디 id가 존재하지 않을 경우 404 응답', async() => {
        const result = await request(server).delete(`/api/studies/6103fca959c4001f004943b9`);
        expect(result.status).toBe(404);
    });
    it('정상 삭제 시 204 응답', async() => {
        const result = await request(server).delete(`/api/studies/${newStudyId}`)
        .set('Authorization', 'Bearer ' + accessToken);
        expect(result.status).toBe(204);
    });
});

describe("GET /api/studies", () => {
    it('스터디 리스트 정상 조회 시 200 응답', async() => {
        const result = await request(server).get('/api/studies');
        expect(result.status).toBe(200);
    });
})