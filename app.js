require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const cookie_parser = require('cookie-parser')
const file_upload = require('express-fileupload')
const cors = require('cors')

const PORT = 4000 || process.env.PORT 
const server = express()

server.use(express.json())
server.use(cookie_parser())
server.use(cors())
server.use('/uploads', express.static('uploads'));
server.use(file_upload({
    useTempFiles: true
}))

server.use('/img', require('./routes/fileRouter'))
server.use('/agent', require('./routes/agentRouter'))

const URI = process.env.DB_URI
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err=>{
    if(err){
        console.log("Not Connected to MongoDB!!"); 
        throw err; 
    } else{
        console.log("Connected to MongoDB!!");
    }
    

})


server.listen(PORT, ()=>{
    console.log('Server is Running ',PORT)
})