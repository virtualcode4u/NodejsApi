require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userSchema = require('./Models/userSchema');
const categorySchema = require('./Models/categorySchema');
const subcategorySchema = require('./Models/subcategorySchema');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const Jwt = require('jsonwebtoken');
const jwtKey = 'how-r-u';

const app = express();
//app.use(express.json());


//const dbUrl = 'mongodb+srv://username:Password@cluster0.2wp8ctn.mongodb.net/Databasename?retryWrites=true&w=majority';

//Routes = 
//const category = require('./routes/category');

//Database Connection
//console.log(process.env.MONGO_URL)
const dbConnect = mongoose.connect(process.env.MONGO_URL,{
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(()=>{
	app.get('/',(req,res)=>{
	res.send('Welcome to MongoDB');
});
	
//Add a Category
app.post('/addcategory',async(req,res)=>{
    try{
        const addCat =  new categorySchema({
            catname : req.body.catname,
            catdesc : req.body.catdesc,
            isrecclsd : req.body.isrecclsd,
            created_by : req.body.created_by,
            created_at : new Date(),
            updated_by : req.body.updated_by,
            updated_at : new Date(),
        });
        //res.send(req.body);
        addCat.save((err,doc)=>{
            if(!err){
                res.send('Category added successfully!!! Done' + req.body)
                
            } else{
                res.send("Some Error"+req.body+err);
            }
        })      
    }catch(error){
        res.send(error);
    };
})

//Get All Category
app.get('/getcategory',async(req,res)=>{
        categorySchema.find().then((result)=>{
            res.send(result);
        }).catch((error)=>{
        res.status(500).json({message:error.message});
    })
})

//Get Category By Id
app.get('/getcategory/:id',async(req,res)=>{
    categorySchema.findById(req.params.id).then((result)=>{
        res.send(result);
    }).catch((error)=>{
    res.status(500).json({message:error.message});
    })
})

//Add a SubCategory
app.post('/addsubcategory',async(req,res)=>{
    try{
        const addsubCat =  new subcategorySchema({
            category : req.body.category,
            subcatname : req.body.subcatname,
            subcatdesc : req.body.subcatdesc,
            isrecclsd : req.body.isrecclsd,
            created_by : req.body.created_by,
            created_at : new Date(),
            updated_by : req.body.updated_by,
            updated_at : new Date(),
        });
        //res.send(req.body);
        addsubCat.save((err,doc)=>{
            if(!err){
                res.send('Sub Category added successfully!!! Done' + req.body)
                
            } else{
                res.send("Some Error"+req.body+err);
            }
        })      

    }catch(error){
        res.send(error);
    };
})

//Get All SubCategory
app.get('/getsubcategory',async(req,res)=>{
    subcategorySchema.find().then((result)=>{
        res.send(result);
    }).catch((error)=>{
    res.status(500).json({message:error.message});
})
})

//Get SubCategory By Id
app.get('/getsubcategory/:id',async(req,res)=>{
    subcategorySchema.find({category:req.params.id}).then((result)=>{
    res.send(result);
    }).catch((error)=>{
    res.status(500).json({message:error.message});
    })
})


//Registration of Users
app.post('/register',async(req,res)=>{
        try{
            //let password = await bcrypt.hash(req.body.password,10)
            const {firstname, lastname,mobileno,email,status,created_by,updated_by} = req.body;
            let password = await bcrypt.hash(req.body.password,10)
            const user = await userSchema.findOne({ email: req.body.email });
            if(user)
            {
                res.send('User is already registered!!!');
            } else {
                    const addUser = new userSchema({
                        firstname,
                        lastname,
                        mobileno,
                        email,
                        password,
                        status,
                        created_by,
                        created_at:new Date(),
                        updated_by,
                        updated_at:new Date(),
                    });
                    addUser.save((err,doc)=>{
                                    if(!err){
                                        res.send('Register Successfully');
                                    } else{
                                        res.send("Unable to process try again" + err);
                                    }
                                })
               // res.status(401).json({ error: "User does not exist" });
              }
           // userSchema.findOne({email:email},(err,user)=>{
            //     res.send("Wait Coming"+err)
            //     // if(user){
                    
            //     //     res.send('User is already registered!!!');
            //     // } else{
            //     //     //res.send(req.body);
            //     //      const addUser = new userSchema({
            //     //         firstname,
            //     //         lastname,
            //     //         mobileno,
            //     //         email,
            //     //         password,
            //     //         status,
            //     //         created_by,
            //     //         created_at:new Date(),
            //     //         updated_by,
            //     //         updated_at:new Date(),
            //     //     });
            //     //     addUser.save((err,doc)=>{
            //     //         if(!err){
            //     //             res.send('Register Successfully');
            //     //         } else{
            //     //             res.send("Unable to process try again" + err);
            //     //         }
            //     //     })
            //      }
            // })
            
    }catch(error){
        res.send(error);
    };
    });

//Login of Users
app.post('/login',async(req,res)=>{
    try{
    const body = req.body;
    const user = await userSchema.findOne({ email: body.email });
    if (user) {
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(body.password, user.password);
      if (validPassword) {
        Jwt.sign({user},jwtKey, {expiresIn:"1h"},(err,token)=>{
            if(err){
                res.send("Something went wrong try again later!")
            } else{
                res.status(200).json({user,auth:token});
            }
            
        });

      } else {
        res.status(400).json({ error: "Password is incorrect" });
      }
    } else {
      res.status(401).json({ error: "User does not exist" });
    }
} catch(error){
    res.send(error);
}

});




})



//Middleware
app.use(bodyParser.json());
app.use(cors());

//Routes
//app.use('/api',category);



const port = process.env.PORT || 8080;
app.listen(port,()=>console.log(`Listening on port ${port}`));
