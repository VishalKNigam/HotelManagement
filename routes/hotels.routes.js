const express = require("express");
const { HotelModel } = require("../models/hotels.model");
const { auth } = require("../middllewares/auth.middlewares");
const HotelRouter = express.Router();
/**
 * @swagger
 * components:
 *  schemas:
 *      Hotels:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  description: The auto generated id of the Hotel
 *              hotel_name: 
 *                  type: string
 *                  description: Hotel Name
 *              location: 
 *                  type: string
 *                  description: Hotel Location
 *              rating: 
 *                  type: integer
 *                  description: Hotel Rating
 *              serve_food: 
 *                  type: boolean
 *                  description: WHether server food or not
 *                
 */

/**
 * @swagger
 * tags:
 *  name: Hotels
 *  description: All the Hotel Routes
 */

/**
 * @swagger
 * /hotels:
 *  get: 
 *      summary: 
 *      tags: [Hotels]
 *      response:
 *          200:
 *              description:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          item:
 *                              $ref: "#/components/schemas/Hotels"
 */

HotelRouter.use(auth);
HotelRouter.post("/add",async(req,res)=>{
    try{
        let hotel = new HotelModel(req.body);
        await hotel.save();
        res.json({msg: "New Hotel has been added sucessfully!"});
    }catch(err){
        console.log(err);
        res.json({error: err.message})
    }
})
HotelRouter.get("/",async(req,res)=>{
    try{
        let hotels = await HotelModel.find({userID: req.body.userID})
        res.json({"hotels":hotels})
    }catch(err){
        console.log(err);
        res.json({error: err.message})
    }
})
HotelRouter.patch("/update/:id",async(req,res)=>{
    const userIDinUserDoc = req.body.userID;
    const {id} = req.params;
    try{
        const hotel = await HotelModel.findOne({_id: id});
        const userIDinhoteldoc = hotel.userID;
        if(userIDinUserDoc===userIDinhoteldoc){
            await HotelModel.findByIdAndUpdate({_id: id}, req.body)
            res.status(200).json({msg: "Hotels has been updated sucessful!"});
        }else{
            res.json({msg:"Not Authorized!"});
        }
    }catch(err){
        console.log(err);
        res.json({error: err.message})
    }
})
HotelRouter.delete("/del/:id",async(req,res)=>{
    const userIDinUserDoc = req.body.userID;
    const {id} = req.params;
    try{
        const hotel = await HotelModel.findOne({_id: id});
        const userIDinhoteldoc = hotel.userID;
        if(userIDinUserDoc===userIDinhoteldoc){
            await HotelModel.findByIdAndDelete({_id: id})
            res.status(200).json({msg: "Hotels has been Deleted sucessful!"});
        }else{
            res.json({msg:"Not Authorized!"});
        }
    }catch(err){
        console.log(err);
        res.json({error: err.message})
    }
})

module.exports = {
    HotelRouter
}

// {
 
//     "hotel_name": "Mansarovar",
//     "location": "lucknow",
//     "rating": 4,
//     "serve_food": true
// }