import express, { json } from "express";

import authRouter from "./routes/userRoutes";

const app = express()   //initialize the application
app.use(json())     //add body to requests


// URLs within application



// start the application
app.listen(4000, () => {
    console.log('The backend server is running!')
})
