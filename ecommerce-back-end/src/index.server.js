const express = require('express');
const env = require('dotenv')
const app = express();
const bodyParser  =require('body-parser');
const mongoose = require('mongoose')

//environment variable or you can say constants
env.config();

//mongoDB connection
//mongodb+srv://root:<db_password>@cluster0.qgjbhkw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

mongoose.connect('mongodb://127.0.0.1:27017/test');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req,res,next)=> {
    res.status(200).json({
        message : 'Hello from Server'
    });

});
app.post('/data', (req,res,next)=> {
    res.status(200).json({
        message : req.body
    });

});
app.listen(process.env.PORT, ()=> {
    console.log(`Server is running on port ${process.env.PORT}`);
});