require('dotenv').config(); // For .env 

const express = require('express') ;
const cors = require('cors') ;
const app = express() ;

const authRouter = require('./Router/auth_router.js') ;
const contactRouter = require('./Router/contact_router.js') ;
const serviceRouter = require('./Router/service_router.js') ;
const adminRouter = require('./Router/admin_router.js') ;

const connectDB = require('./utils/Database.js') ;
const errorMiddleware = require('./middleware/error_middleware.js') ;

/*
 
Hosted Project Link: https://comprehensive-service-hub-frontend-new.onrender.com

*/


//Middleware---1
// Cors ---> Cross-Origin Resource Sharing

const corsOptions = {
    origin: ["http://localhost:5173", "https://comprehensive-service-hub-frontend-new.onrender.com"],
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};
app.use(cors(corsOptions)) ;

//Middleware---2
app.use(express.json()) ; 


app.use('/api/auth', authRouter) ;
app.use('/api/form', contactRouter) ;
app.use('/api/data', serviceRouter) ;
app.use('/api/admin', adminRouter) ;


 
app.use(errorMiddleware) ;

const Port = process.env.PORT || 4000 ;

connectDB()
.then(()=>{
    app.listen(Port, ()=>{
        console.log('This is visible on Terminal --> index.js file') ;
    });
});