import { Router } from 'express';
import study from './routes/study.js';
import auth from './routes/auth.js';
import login from './routes/login.js';

export default () => {
    const app = Router();
    study(app);
    auth(app);
    login(app);

    return app;
}