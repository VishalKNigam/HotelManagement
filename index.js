const express = require("express");
const { connection } = require("./db");
const { UserRouter } = require("./routes/users.routes");
const { HotelRouter } = require("./routes/hotels.routes");
const swaggerJSdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const app = express();
require('dotenv').config()
app.use(express.json());
const options = {
    definition:{
        openapi: "3.0.0",
        info: {
            title: "Hotel Management System",
            version: "1.0.0"
        },
        servers: [
            {
                url: "http://localhost:8080"
            }
        ]
    },
    apis:["./routes/*.js"]
}
const openAPIspec = swaggerJSdoc(options);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(openAPIspec))
app.use("/owner",UserRouter);
app.use("/hotels",HotelRouter)
app.listen(8080, async()=>{
    try{
        await connection
        console.log("Connected to the DB Sucessfully!")
    }catch(err){
        console.log(err)
    }
    console.log(`Connected to the Port 8080`);
})