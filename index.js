const express  = require('express');
const app = express();
const mongoose = require('mongoose');

const postRoute = require('./routes/post.route');
const actionRoute = require('./routes/action.route');
const commentRoute = require('./routes/comment.route');
const userRoute = require('./routes/user.route');

const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3001;

//Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


//Routes
app.get('/', (req, res) => {
    res.send('Social Emulator App with Node.js and MongoDB for BairesDev! Test');
});

app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/action', actionRoute);
app.use('/api/comment', commentRoute);


mongoose.connect(process.env.MONGO, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`API is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });

