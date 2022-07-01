require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
//app.use(express.json());


//const dbUrl = 'mongodb+srv://admin:D9ihAcWWH1N6vAlG@cluster0.2wp8ctn.mongodb.net/onlinequiz?retryWrites=true&w=majority';

//Routes = 
//const category = require('./routes/category');

//Database Connection
console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL,{
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(()=>{
	app.get('/',(req,res)=>{
	res.send('Welcome to NodeQuiz');
});
console.log("Databaese connected Start Working")
}).catch((e)=>{
	console.log("Error :", e)
})


//Middleware
app.use(bodyParser.json());
app.use(cors());

//Routes
//app.use('/api',category);


// app.get('/',(req,res)=>{
// 	res.send('Welcome to NodeQuiz');
// });


const port = process.env.PORT || 8080;
app.listen(port,()=>console.log(`Listening on port ${port}`));
