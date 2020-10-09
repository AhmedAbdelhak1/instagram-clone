import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Pusher from 'pusher';
import dbModel from "./dbModel.js";


const app = express();
const port = process.env.PORT || 8080;


const pusher = new Pusher({
  appId: '1087312',
  key: '814a0ff59094bccea5eb',
  secret: '5c2cf414dac29977abd9',
  cluster: 'eu',
  useTLS: true,
});


app.use(express.json());
app.use(cors());

const connection_url= 'mongodb+srv://admin:RreFqCFSrrD2HTMq@cluster0.lioec.mongodb.net/instaDB?retryWrites=true&w=majority'
mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.once('open', ()=>{
    console.log('Db is connecting...');
    const changeStream = mongoose.connection.collection('posts').watch();
    changeStream.on('cahnge', (change)=>{
        console.log('Chnage trigger on pusher...');
        console.log(change);
        console.log('End of change...');

        if(change.operationType ==='insert'){
            console.log('triggering pusher ---* upload image');
            const postDetails = change.fullDocument;
            pusher.trigger('posts', 'inserted', {
                user: postDetails.user,
                caption: postDetails.caption,
                image: postDetails.image
            })
        }else{
            console.log('Error triggering pusher...');
        }
    })

})


app.get("/", (req, res)=> res.status(200).send('Hello Ahmed!!'))

app.post('/upload', (req,res)=>{
    const body = req.body;
    dbModel.create(body,(err, data)=>{
        if (err){
            res.status(500).send(err)
        } else{
            res.status(201).send(data);
        }
    })
});


app.get('/sync', (req, res)=>{
    dbModel.find((err, data)=>{
        if (err){
            res.status(500).send(err)
        } else{
            res.status(200).send(data);
        }  
    })
})

app.listen(port, ()=> console.log(`listening on localhost : ${port}`))