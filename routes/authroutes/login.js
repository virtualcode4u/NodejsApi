app.post('/login',async(req,res)=>{
    try{
    const body = req.body;
    const user = await userSchema.findOne({ email: body.email });
    if (user) {
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(body.password, user.password);
      if (validPassword) {
        res.status(200).json({ message: "Login Successfull", user: user });
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
