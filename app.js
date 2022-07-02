require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userSchema = require('./Models/userSchema');
const categorySchema = require('./Models/categorySchema');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
//app.use(express.json());


//const dbUrl = 'mongodb+srv://username:Password@cluster0.2wp8ctn.mongodb.net/Databasename?retryWrites=true&w=majority';

//Routes = 
//const category = require('./routes/category');

//Database Connection
console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL,{
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(()=>{
	app.get('/',(req,res)=>{
	res.send('Welcome to MongoDB');
});
	
//Add a Category
app.post('/addcategory',async(req,res)=>{
    try{
        const {
            catname,
            catdesc,
            isrecclsd,
            created_by,
            created_at,
            updated_by,
            updated_at
        } = req.body;

        const addCat =  new categorySchema({
            catname,
            catdesc,
            isrecclsd,
            created_by,
            created_at,
            updated_by,
            updated_at
        })
        //res.send(req.body);
        addCat.save(err=>{
            if(err){

                res.send("Some Error"+req.body+err);
            } else{
                res.send('Category added successfully!!! Done' + req.body)
            }
        })
        res.send('Not Done');
        

    }catch(error){
        res.send(error);
    };
})


//Registration of Users
app.post('/register',async(req,res)=>{
   try{
       const {
           name,
           mobileno,
           email,
           password,
           cpassword
       } = req.body;

     if(password === cpassword ){
       
         const userData = new userSchema({
            name,
            mobileno,
            email,
            password
         })
         userData.save(err=>{
             if(err){
		     res.send("If Try Block"+err);
                console.log("err")
             }else{
		     res.send("Else Try Block");
                res.send('register',{title :'Done',password:'',email:''})
             }
         })
       
    const useremail = await userSchema.findOne({email:email});
     if(email === useremail.email){
        res.send('register',{title :'',password:'',email:'Email is Already there plz chose different one'})
     }else{
         console.log('err')
     }

    }else{
        res.send('register',{title :'',password:'Password not Matching',email:''})
	    
    }
	   
   }catch(error){

    res.send('register',{title :'Error in Code',password:'',email:''})
   }
})
//End of Registration of Users
	//getsumdetails
app.post("/getsumdetails", function(req, res) {
 
  res.send("You will get a sum using this" + req.body.name);
})
	
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
