let express = require('express');
// let mysql = require('mysql2')
// let formidable  = require('express-formidable')
// let bcrypt  = require('bcrypt')

let app = express()

app.post('/send-email', async (req, res)=>{

    let {email} = req.fields;

    console.log('email',email)
    res.send('email recieved successfully')
})


app.listen(3002)