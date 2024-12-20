import express from "express" ;
import bodyParser from "body-parser";
import cors from "cors" ;
import morgan from "morgan";
import path from "path"
import {fileURLToPath} from "url"
import { configDotenv } from "dotenv";
import { DBConnection } from "./Config/DbConnection.js";
import { globalError } from "./Middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";

import authRouter from "./Router/authRouter.js"
import lockoutRouter from "./Router/lockoutRouter.js"
import fuelDeliveryRouter from "./Router/fuelDeliveryRouter.js"
import tireRouter from "./Router/tireRouter.js"
import carRouter from "./Router/carRouter.js";
import cars from "./Router/cars.js"
import carSellRouter from "./Router/carSellRouter.js"
import historyRouter from "./Router/historyRouter.js"
import jumpStartRouter from "./Router/jumpStartRouter.js"
import towRouter from "./Router/towRouter.js"

configDotenv({path : "Config/config.env"})
const app = express() ;
DBConnection();
app.use(cors());

// app.use(bodyParser.json({ limit: '10gb' })); // زيادة الحجم
// app.use(bodyParser.urlencoded({ limit: '10gb', extended: true }));
const PORT = process.env.PORT || 2000 ;
const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);
app.use(express.static('public'));
app.use('/images', express.static(path.join(dirname, 'images')));
app.use('/uploads', express.static('uploads'));



app.use(cookieParser()) 
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
if(process.env.NODE_ENV == "development"){
    app.use(morgan("dev")) 
    console.log("Mode : Development")
}else if(process.env.NODE_ENV == "production"){
  app.use(morgan("dev"))
    console.log("Mode : Production")  
}  



app.use("/api/auth" ,authRouter)
app.use("/api/lockout" ,lockoutRouter)
app.use("/api/fuel" ,fuelDeliveryRouter)
app.use("/api/tire" ,tireRouter)
app.use("/api/car" ,carRouter)
app.use("/api/models" ,cars )
app.use("/api/sellcar" ,carSellRouter )
app.use("/api/history" ,historyRouter )
app.use("/api/jumpstart" ,jumpStartRouter)
app.use("/api/tow" ,towRouter)
//global error Middleware  
app.use(globalError); 


app.listen(PORT ,async ()=>{
    console.log(`server is running on port ${PORT} ! `)
})
 
