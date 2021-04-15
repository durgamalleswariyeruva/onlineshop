const exp=require("express");
const userApiObj=exp.Router();

const asyncHandler=require("express-async-handler")
const verifyToken=require("./middlewares/verifyToken")

//extract body of req obj
userApiObj.use(exp.json());

//import bcrypt
const bcryptjs=require("bcryptjs");

const jwt=require("jsonwebtoken")

//post req handler for user register
userApiObj.post("/registration", asyncHandler(async(req,res,next)=>{
    //get user collection object
    let userCollectionObj = req.app.get("userCollectionObj");
    
    
    let userObj = req.body;

    //check for user in db
    let user = await userCollectionObj.findOne({userid:userObj.userid});
    //if username alreaddy taken
    if(user!==null){
        res.send({message:"user existed"});
    }
    else{
        //hash the password
        let hashedpwd = await bcryptjs.hash(userObj.password,6);

        //replace plain txt pswdd with hashed pswd
        userObj.password = hashedpwd;

        //create user
        let success=await userCollectionObj.insertOne(userObj);
        res.send({message:"user created",userId:userObj.userid})
        
        
    }
}))

///users count

userApiObj.get("/userscount",asyncHandler(async(req,res,next)=>{
    let userCollectionObj = req.app.get("userCollectionObj");

    
    let user=await userCollectionObj.find().toArray();
    let userlength=user.length;
    res.send({message:userlength})


}))

//user login
userApiObj.post("/login",asyncHandler(async(req,res,next)=>{
    //get user collectionObject
    let userCollectionObj = req.app.get("userCollectionObj");

    let userCredObj = req.body;
    //verify  username
    let user = await userCollectionObj.findOne({userid:userCredObj.userid})
    if(user == null){
        res.send({message:"Invalid username"})
    }
    else if(user.username =="admin"){
        let status = await bcryptjs.compare(userCredObj.password,user.password);

        //if pswd matched
        if(status == true){
            //create a token
            let token = await jwt.sign({userid:user.userid},process.env.secretKey,{expiresIn:3000});

            //send token
            res.send({message:"admin login",signedToken:token,userid:user.userid,username:user.username});
        }
        else{
            res.send({message:"Invalid password"});
        }    }
    else{
        //verify password
        let status = await bcryptjs.compare(userCredObj.password,user.password);

        //if pswd matched
        if(status == true){
            //create a token
            let token = await jwt.sign({userid:user.userid},"abcd",{expiresIn:3000});

            //send token
            res.send({message:"success",signedToken:token,userid:user.userid,username:user.username});
        }
        else{
            res.send({message:"Invalid password"});
        }
    }
}))


userApiObj.post("/addtocart",asyncHandler(async(req,res,next)=>{

    let cardCollectionObj= req.app.get("cardCollectionObj");

    let cartObj=req.body;
    let cart = await cardCollectionObj.findOne({userid:cartObj.userid,productname:cartObj.productname})
    if(cart!==null){
        res.send({message:"product exist"})
    }
    else{
        await cardCollectionObj.insertOne(cartObj);
        res.send({message:"product added"})
    }
    
    
}))





//store wishlist products

userApiObj.post("/wishlist",asyncHandler(async(req,res,next)=>{

    let wishlistCollectionObj= req.app.get("wishlistCollectionObj");

    let wishObj=req.body;
    let wishcart = await wishlistCollectionObj.findOne({userid:wishObj.userid,productname:wishObj.productname})
    if(wishcart!==null){
        res.send({message:"product exist"})
    }
    else{
        await wishlistCollectionObj.insertOne(wishObj);
        res.send({message:"product added"})
    }
    
    
}))


//retrive wishlist products
userApiObj.get('/getWishlist/:userid',verifyToken,asyncHandler(async(req,res,next)=>{

    let wishlistCollectionObj = req.app.get('wishlistCollectionObj');
    let wishObj=req.body;
    let products = await wishlistCollectionObj.find({userid: req.params.userid}).toArray();

    res.send({message:'success', productList: products})
}))


//delete wish product

userApiObj.post("/deletewishproduct",asyncHandler(async(req,res,next)=>{
    
    let wishlistCollectionObj = req.app.get("wishlistCollectionObj");
    let wishObj =  req.body;
    
    //check for user in db
    let product = await wishlistCollectionObj.findOne({productname:wishObj.productname});

    //product is there
    if(product!==null){
        let remove=await wishlistCollectionObj.deleteOne({productname:wishObj.productname});
        res.send({message:true});
    }

}))

//get all products
userApiObj.get('/getcartitems/:userid',verifyToken,asyncHandler(async(req,res,next)=>{

    let cardCollectionObj = req.app.get('cardCollectionObj');
    let adminProductCollectionObj = req.app.get('adminProductCollectionObj');
    let product = await adminProductCollectionObj.find().toArray();

    let products = await cardCollectionObj.find({userid: req.params.userid}).toArray();
    res.send({message: 'success' , product: products, product1: product})
}))

userApiObj.get('/getsize/:userid',verifyToken,asyncHandler(async(req,res,next)=>{
    let cardCollectionObj = req.app.get('cardCollectionObj');
    
    let cart=await cardCollectionObj.find({userid: req.params.userid}).toArray();
    let cartlength = cart.length;
    res.send({cartsize: cartlength ,userCart: cart} );
    //console.log("the size is ",cart);
}))



userApiObj.post("/resetpassword",asyncHandler(async(req,res,next)=>
{
    let userCollectionObj=req.app.get("userCollectionObj")
    let obj=req.body;
    
    let user=await userCollectionObj.findOne({userid:obj.userid})
    if(user!=null){
    let hash=await bcryptjs.hash(obj.password1,6)
    let success=await userCollectionObj.updateOne({userid:obj.userid},{$set:{
        password:hash

    }})
   
  
    res.send({message:"success"})
    

}
else{
    res.send({message:"nouser"})
}
}
))




userApiObj.post("/deleteproduct",asyncHandler(async(req,res,next)=>{
    
    let cardCollectionObj = req.app.get("cardCollectionObj");
    let cartObj =  req.body;
    
    //check for user in db
    let product = await cardCollectionObj.findOne({productname:cartObj.productname});
    //product is there
    if(product!==null){
        let remove=await cardCollectionObj.deleteOne({productname:cartObj.productname});
        res.send({message:true});
    }

}))

// delete product in addtocart when we place order

userApiObj.post("/deleteOrder1",asyncHandler(async(req,res,next)=>{
    
    let cardCollectionObj = req.app.get("cardCollectionObj");
    let cartObj =  req.body;
    
    //check for user in db
    let product = await cardCollectionObj.findOne({productname:cartObj.productname});

    //product is there
    if(product!==null){
        let remove=await cardCollectionObj.deleteOne({productname:cartObj.productname});
        res.send({message:true});
    }

}))
  //place order

  userApiObj.post("/orders",asyncHandler(async(req,res,next)=>{

    //console.log("the cart obj is ",req.body)
    let orderCollectionObj= req.app.get("orderCollectionObj");

    let cartObj=req.body;
  
    
    
    let cart = await orderCollectionObj.findOne({productname:cartObj.productname,userid:cartObj.userid})
    //console.log("the cart is ",cart)
    if(cart!==null){
        res.send({message:"product exist"})
    }
   else{
    await orderCollectionObj.insertOne(cartObj);
    res.send({message:true})
   }
    
}))

userApiObj.get("/getOrderitem/:userid",verifyToken,asyncHandler(async(req,res,next)=>{

    let orderCollectionObj = req.app.get("orderCollectionObj");
    
    let products = await orderCollectionObj.find({userid:req.params.userid}).toArray();
    res.send({message:"success",productList:products})
}))


userApiObj.post("/deleteOrder",asyncHandler(async(req,res,next)=>{
    
    let orderCollectionObj = req.app.get("orderCollectionObj");
    let orderObj =  req.body;
    
    //check for user in db
    let product = await orderCollectionObj.findOne({productname:orderObj.productname});

    //product is there
    if(product!==null){
        let remove=await orderCollectionObj.deleteOne({productname:orderObj.productname});
        res.send({message:true});
    }

}))


//export
module.exports = userApiObj;