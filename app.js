require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userSchema = require('./Models/userSchema');
const categorySchema = require('./Models/categorySchema');
const subcategorySchema = require('./Models/subcategorySchema');
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

// app.post('/register',async(req,res)=>{
   
//        console.log(req.body);
// })
//      if(password === cpassword ){
       
//          const userData = new userSchema({
//             name,
//             mobileno,
//             email,
//             password
//          })
//          userData.save(err=>{
//              if(err){
// 		     res.send("If Try Block"+err);
//                 console.log("err")
//              }else{
// 		     res.send("Else Try Block");
//                 res.send('register',{title :'Done',password:'',email:''})
//              }
//          })
       
//     const useremail = await userSchema.findOne({email:email});
//      if(email === useremail.email){
//         res.send('register',{title :'',password:'',email:'Email is Already there plz chose different one'})
//      }else{
//          console.log('err')
//      }

//     }else{
//         res.send('register',{title :'',password:'Password not Matching',email:''})
	    
//     }
	   
//    }catch(error){

//     res.send('register',{title :'Error in Code',password:'',email:''})
//    }
})
//End of Registration of Users
app.post('/register',async(req,res)=>{
    res.send("Welcome" + req.body);
    // try{
    //     // res.send("Under Try Block");
    //     const addUser =  new userSchema({
    //         firstname : req.body.firstname,
    //         lastname : req.body.lastname,
    //         mobileno: req.body.mobileno,
    //         email : req.body.email,
    //         password : req.body.password,
    //         status:'0',
    //         created_by : req.body.created_by,
    //         created_at : new Date(),
    //         updated_by : req.body.updated_by,
    //         updated_at : new Date(),
    //     });
    //     addUser.save((err,doc)=>{
    //         if(!err){
    //             res.send('Register Successfully');
    //         } else{
    //             res.send("Unable to process try again" + err);
    //         }
    //     })
    // }catch(error){
    //     res.send("catch errror"+error+"ERRRRRRRRRRRRR "+ req);
    // };
});
//Login
app.post('/login',async(req,res)=>{
res.send(req.body);
});

// console.log("Databaese connected Start Working")
// }).catch((e)=>{
// 	console.log("Error :", e)
// })


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
