const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//object of express framework
const app = express();

//port to run node app
const PORT = 3000;

//utilizing bodyparser middleware in node js
//help to parse body
app.use(bodyParser.json());

//tells express to serve static file from the directory
app.use(express.static(__dirname));

mongoose.connect(
  'mongodb+srv://adarshmishra1237:9OIckWZlEPxp9fA0@clustercrud.uob0il1.mongodb.net/?retryWrites=true&w=majority&appName=ClusterCRUD'
);

const connect = mongoose.connection;

connect.on(
  'error',
  console.error.bind(console, 'MongoDB connection error')
);

connect.once('open', () => {
  console.log('Connected to MongoDB');
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});
const User = mongoose.model('User', userSchema);

app.post('/users', async (request, response) => {
  const user = new User({
    name: request.body.name,
    email: request.body.email,
    age: request.body.age,
  });
  const newitem = await user.save();
  response.status(201).json({ success: true });
});
app.get('/', async (request, response) => {
  response.sendFile(__dirname + '/user.html');
});
app.get('/users', async (request, response) => {
  const users = await User.find();
  response.status(200).json(users);
});
app.get('/users/:id', async (request, response) => {
  const user = await User.findById(request.params.id);
  response.status(200).json(user);
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
