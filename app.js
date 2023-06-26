const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const tasks = require('./routes/tasks');
const connectDB = require('./models/connect');
const errorHandlerMiddleware = require('./middleware/errorHandler');
require('dotenv').config();
require('./models/task');

 //Gets data from client request.
app.use(express.json());

//Any request that comes through this route will use the tasks middleware.
app.use('/api/tasks', tasks);
//Catch all requests for any route that is not defined and return a 404.
app.use('*', (req, res) => {
    res.status(404).send('Route Does not exist');
})
//Middleware function to handle errors.
app.use(errorHandlerMiddleware);

//Try to connect to the db, if successful start the server.
const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log('Speak and be heard mortal...'))
    } catch (error) {
        console.log(error)
    }
}
start()

