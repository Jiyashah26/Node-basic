const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

const profiles= [
    {
        id:1,
        insta: "Tehseen-student",
        name: "Tehseen",
        desc: "student",
       

    },
    {
        id:2,
        insta: "Nawaf-student",
        name: "Nawaf",
        desc: "student",
        github: 'Sknawaf05'

    },
    {
        id:3,
        insta: "moin-student",
        name: "Moin",
        desc: "student",

    },
    {
        id:4,
        insta: "Basheer-student",
        name: "Basheer",
        desc: "student",

    }
   ] 

// / => http://basheer.com -> endpoint / api
app.get('/',(req,res)=>{
    res.send("Test 9")


})

app.get('/profiles', (req,res)=>{
    res.status(200).json(profiles);
}) 

app.get('/profile/:id',(req,res)=>{
   const id = req.params.id;
   const profile = profiles. find((profile)=>{
    return profile.id == id
   })
    
    res.send(profile??"Not found")
})

app.listen('8000',()=>{
    console.log("Server is running on port 8000...")
})

