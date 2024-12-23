import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import usersRoutes from './routes/users';
import notesRoutes from './routes/notes';


const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use('/api/users', usersRoutes);
app.use('/api/notes', notesRoutes);

mongoose.connect('mongodb://localhost:27017/mern')
    .then(
        () => app.listen(5555, '127.0.0.1')
    ).catch(
        (error: any) => console.error(error.message)
    );


export default app;    
