const express = require('express')
const app = express()

// / => http://basheer.com -> endpoint / api
app.get('/',(req,res)=>{
    res.send("Test 9")
})

app.listen('8000',()=>{
    console.log("Server is running on port 8000...")
})

