import { Router } from 'express';
import study from './routes/study.js';
import auth from './routes/auth.js';

export default () => {
    const app = Router();
    study(app);
    auth(app);

    return app;
}