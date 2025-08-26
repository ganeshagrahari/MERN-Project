const express = require('express');
const env = require('dotenv')
const app = express();
const mongoose = require('mongoose');

//routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
//environment variable or you can say constants
env.config();

//mongoDB connection
//mongodb+srv://root:<db_password>@cluster0.qgjbhkw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.qgjbhkw.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority&appName=Cluster0`
).then(() => {
    console.log('Database connected.')
}).catch((error) => {
    console.log('Database connection error:', error);
});

app.use(express.json())

app.use('/api',authRoutes);
app.use('/api',adminRoutes);
app.use('/api',categoryRoutes);

app.listen(process.env.PORT, ()=> {
    console.log(`Server is running on port ${process.env.PORT}`);
});