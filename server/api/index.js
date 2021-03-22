import { Router } from 'express';
import study from './routes/study.js';
import auth from './routes/auth.js';
import login from './routes/login.js';
import user from './routes/user.js'

export default () => {
    const app = Router();
    auth(app);
    login(app);
    user(app);
    study(app);
    return app;
}