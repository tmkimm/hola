import request from 'supertest';
import 'regenerator-runtime/runtime';
import { server } from '../../../app.js'
import config from '../../../config/index.js';
import mongoose from 'mongoose';

describe("스터디 API 테스트", () => {
    beforeAll( async () => {
        await mongoose.connect(config.databaseURL, {
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
        //await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
    });

    it('GET /api/studies', async() => {
        const result = await request(server).get('/api/studies');
        expect(result.status).toBe(200);
    });
    it('two plus tow is foure ', async () => {
        expect(2 + 2).not.toBe(5);
    });
})