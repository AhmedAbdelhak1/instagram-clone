import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Pusher from 'pusher';


const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

const connection_url= 'mongodb+srv://admin:<password>@cluster0.lioec.mongodb.net/<dbname>?retryWrites=true&w=majority'



app.get("/", (req, res)=> res.status(200).send('Hello Ahmed!!'))

app.listen(port, ()=> console.log(`listening on localhost : ${port}`))