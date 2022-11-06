const passport =require('passport')
const express =require('express')
const {config}=require('../configuration/config')
var router =express.Router()
const ejs=require('express')

router.get('/index',function(req,res){
    res.render('index')
})

router.get('/profile',isLoggedIn,function(req,res){
    res.render('profile',{
        user:req.user
    })
})
router.get('/login',isLoggedIn,function(req,res){
    res.render('login',{
        user:req.user
    })
})
router.get('/error',isLoggedIn,function(req,res){
    res.render('error',{
        user:req.user
    })
})

router.get('/auth/google',
    passport.authenticate('google',{scope:['profile','email']}));
    
router.get('/auth/google/callback',function () {
        passport.authenticate('google',
        {success:'/profile',failureRedirect:'/error'})
        
})

// router.post('/auth/google/callback',function () {
//     passport.authenticate('google',
//     {success:'/profile',failureRedirect:'/error'})

// })
router.get('/logout',function(req,res){
    req.logout()
    res.redirect('/index')
})
function isLoggedIn(req,res,next){
    if(req.isAuthenticated())

    return next()

    res.redirect('/')

    }
module.exports=router