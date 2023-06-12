const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const { UserModel } = require("../models/users.model");
const UserRouter = express.Router();
/**
 * @swagger
 * components:
 *  schemas:
 *      Users:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  description: The auto generated id of the Hotel
 *              owner_name: 
 *                  type: string
 *                  description: Owner Name
 *              email: 
 *                  type: string
 *                  description: Owner Email
 *              password: 
 *                  type: string
 *                  description: Owner Password
 *              phone: 
 *                  type: string
 *                  description: Owner Phone
 *               age: 
 *                  type: integer
 *                  description: Owner age
 *                city: 
 *                  type: string
 *                  description: Owner city
 *                
 */
/**
 * @swagger
 * tags:
 *  name: Owners
 *  description: All the Owners Routes
 */
/**
 * @swagger
 * /owner/signup:
 *  post: 
 *      summary: post the users
 *      tags: [Owners]
 *      requestBody:
 *          require: true
 *          content:
 *              application/json:
 *              schema:$ref: "#/components/schemas/Owners"
 *                  
 *      response:
 *          200:
 *              description:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          item:
 *                              $ref: "#/components/schemas/Owners"
 */
UserRouter.post("/signup",async(req,res)=>{
    const {owner_name,email,password,phone,age,city} = req.body;
    try{
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                console.log(err);
                res.status(200).json({err:err})
            }else{
                let user = new UserModel({owner_name,email,password:hash,phone,age,city})
                await user.save();
                res.json(`${user.owner_name} registered successfully!`)
            }
        })
    }catch(err){
        res.status(500).json({error: err.message});
        console.log(err);

    }
})
/**
 * @swagger
 * /owner/login:
 *  post: 
 *      summary: post the users
 *      tags: [Owners]
 *      requestBody:
 *          require: true
 *          content:
 *              application/json:
 *              schema:$ref: "#/components/schemas/Owners"
 *                  
 *      response:
 *          200:
 *              description:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          item:
 *                              $ref: "#/components/schemas/Owners"
 */
UserRouter.post("/login", async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await UserModel.findOne({email});
        if(user){
            bcrypt.compare(password,user.password,(err,decode)=>{
                if(err){
                    res.json({msg: err})
                }else{
                    let token = jwt.sign({userID:user._id, user:user.owner_name},"masai", {expiresIn:"7d"});
                    res.status(200).json({msg:"Login successsful!!",token});
                    console.log(user);
                }
            })
        }else{
            res.json({msg: "User does'nt exists"})
        }
    }catch(err){
        res.status(500).json({error: err.message});
        console.log(err);
    }
})
module.exports = {
    UserRouter
}
// {
//     "owner_name": "Vishal",
//      "email": "vishal", 
//      "password": "nigam",
//      "phone": "mob8750505058",
//      "age": 27,
//      "city": "lucknow"
   
//  }