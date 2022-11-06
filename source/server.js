const express =require('express')
const bodyParser=require('body-parser')
const app=express()
const session =require('express-session')
const passport =require("passport")
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const routes=require('./router/router')
const {config}=require('./configuration/config.js')
require('dotenv').config()

app.set('view engine','ejs')

app.use(session({
    resave:false,
    saveUninitialized:true,
    secret:'SECRET' 

}))
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(function(user,cb){
    cb(null,user)
})
passport.deserializeUser(function(obj,cb){
    cb(null,obj)
})
passport.use(new GoogleStrategy({
    clientID:config.googleAuth.clientID,
    clientSecret:config.googleAuth.clientSecret,
    // profileURL:config.googleAuth.profileURL,
    callbackURL:config.googleAuth.callbackURL,
  },
  (accessToken,refreshToken,profile,done)=>{
        // userProfile=profile
        return done(null,profile)
  }))
app.use('/',routes)
app.listen(process.env.PORT,()=>{
    console.log(`server is running at ${process.env.PORT}`)
})