import express from 'express';
import bodyParser from 'body-parser';
const app = express();
import env from 'dotenv';
import mongoose from 'mongoose';
import { userRouter, crudRouter } from './src/routes/index.js';
env.config();
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.ytq6kou.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`).then(() => {
    console.log("mongodb connected successfully");
});
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use('/', userRouter);
app.use('/api/crud', crudRouter);
app.use(express.static("public"));



app.listen(process.env.PORT, function () {

    console.log(`listening on port ${process.env.PORT}`);

});
