//ajoutons tout les demandes de terminaisons de  API 
const express=require('express')
const router=express.Router()
const User=require('../models/user')
const mongoose=require('mongoose')
const db="mongodb+srv://sada56:fally1956@cluster0.gxkrr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(db,err=>{
    if(err){
        console.error('Error!'+ err)
    }else{
        console.log('connected to mongodb')
    }
})

router.get('/', (req,res)=>{
    res.send('From API route')
}) 

// route pour inscription dans le site
router.post('/register', (req,res)=>{
    let userData=req.body
    let user= new User( userData)
   user.save((error,registeredUser) =>{
       if(error){
           console.log(error)
       }else{
           res.status(200).send(registeredUser)
       }
   })
}) 

router.post('/login',(req,res) =>{
    let userData=req.body 
    User.findOne({email:userData.email},(error,user)=>{
        if(error){
            console.log(error)
        }else{
            if(!user){
                res.status(401).send('Invalid email')
            }else
            if(user.password !==userData.password){
                res.status(401).send('Invalid password')
            }else{
                res.status(200).send(user)
            }
        }
    })
})


module.exports=router
