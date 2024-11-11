import express from "express";
import helmet from "helmet";
import cors from "cors";
import "dotenv/config";
import urlRouter from "./routes/urlRoutes"
import { sequelize } from "./sequelize";

const app = express();

//middleware
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use((req,res,next)=>{
    console.log(req.path , req.method)
    next();
})

//Routes
app.use("/" , urlRouter);
sequelize.sync({
    force: true,

}).then(()=>{

    app.listen(3001 , ()=>{
        console.log("start")
    })

})


