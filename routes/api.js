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

// API pour s inscrire et connecter
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
 
// Api pour les evenements de notre sites  
router.get ('/events',(req,res)=>{
    let events =[
         {
     "_id":"1",
     "cours":"Angular", 
     "description":"framework fontend",  
     "Overture":"2022-03-01" 
    }, 

    {
        "_id":"2",
        "cours":"Mongodb", 
        "description":" base de donnees nosql",  
        "Overture":"2022-04-01" 
       }, 

       {
        "_id":"3",
        "cours":"Express", 
        "description":" framework pour les servers node js",  
        "Overture":"2022-04-01" 
       },
       {
        "_id":"4",
        "cours":"Nodejs", 
        "description":"environnement d'exécution multiplateforme pour la couche serveur",  
        "Overture":"2022-06-12" 
       }, 

       {
        "_id":"5",
        "cours":"Javascript", 
        "description":" angage de script léger, orienté objet",  
        "Overture":"2022-06-01" 
       },

    ] 
    res.json(events)
}) 


router.get ('/certif',(req,res)=>{
    let events =[
         {
     "_id":"1",
     "module":"Mean-stack", 
     "Prix":"500$",  
     "Overture":"2022-03-01" ,
     "Dure":"17 semaines"
    }, 

    { "_id":"2",
    "module":"MERN-stack", 
    "Prix":"300$",  
    "Overture":"2023-03-01" ,
    "Dure":"17 semaines"
       }, 

       {
        "_id":"3",
     "module":"PHYTOH", 
     "Prix":"500$",  
     "Overture":"2022-03-01" ,
     "Dure":"20 semaines"
       },
       {
        "_id":"4",
     "module":"MOBILE", 
     "Prix":"500$",  
     "Overture":"2022-06-5" ,
     "Dure":"17 semaines"
       }, 

       {
        "_id":"5",
     "module":"DATASCIENCE", 
     "Prix":"1000$",  
     "Overture":"2022-04-01" ,
     "Dure":"17 semaines"
       },

    ] 
    res.json(events)
})


module.exports=router
