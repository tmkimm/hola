import config from '../config/index.js';
import mongoose from 'mongoose';

export default (app) => {
    // configure mongoose(MongoDB)
    if (process.env.NODE_ENV !== "test") {
        const connection = mongoose.connect(config.databaseURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
            autoIndex: false
        });
    }
}