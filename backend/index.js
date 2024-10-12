const express = require("express");
const { connectMongo } = require("./connection");
const cors = require('cors');
const path = require('path');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const CommentRouter = require('./routes/comment');
const PORT = 4000;
const url = "mongodb://127.0.0.1:27017/art-chat";


connectMongo(url).then(()=>{
    console.log("Mongo is connected");
}).catch((e)=>{
    console.log("error" , e);
})


const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increase the limit
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/api/user' , userRouter);
app.use('/api/post' , postRouter);
app.use('/api/comment', CommentRouter)


app.listen(PORT , ()=> console.log("server start on localhost:" , PORT));
