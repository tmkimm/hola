import { Router } from 'express';
import study from './routes/study.js';

export default () => {
    const app = Router();
    study(app);

    return app;
}