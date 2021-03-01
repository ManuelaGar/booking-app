import express from 'express';
import { readdirSync } from 'fs';
import cors from 'cors';
import mongoose from 'mongoose';
const morgan = require('morgan');

require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGODB_ATLAS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then(() => console.log('DB connected'))
.catch((error) => console.log('DB connection error: ', error));

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

readdirSync('./routes').map(r => app.use('/api', require(`./routes/${r}`)));

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});