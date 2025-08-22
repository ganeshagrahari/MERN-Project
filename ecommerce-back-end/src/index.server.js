const express = require('express');
const env = require('dotenv')
const app = express();
const bodyParser  =require('body-parser');
const mongoose = require('mongoose');

//
const userRoutes = require('./routes/user');
//environment variable or you can say constants
env.config();

//mongoDB connection
//mongodb+srv://root:<db_password>@cluster0.qgjbhkw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.qgjbhkw.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority&appName=Cluster0`,
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }
).then(() => {
    console.log('Database connected.')
}).catch((error) => {
    console.log('Database connection error:', error);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api',userRoutes);

app.listen(process.env.PORT, ()=> {
    console.log(`Server is running on port ${process.env.PORT}`);
});