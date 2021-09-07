import { Router } from 'express';
import study from './routes/study.js';
import auth from './routes/auth.js';
import login from './routes/login.js';
import logout from './routes/logout.js';
import user from './routes/user.js';
import feedback from './routes/feedback.js';
import commment from './routes/comment.js';
import reply from './routes/reply.js';

export default () => {
    const app = Router();
    auth(app);
    login(app);
    logout(app);
    user(app);
    study(app);
    feedback(app);
    commment(app);
    reply(app);
    return app;
}