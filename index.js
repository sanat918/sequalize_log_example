require('dotenv').config();
let {connectionToDb} =require('./connectionToDB')


let express=require('express')
let app=express()

let port=process.env.PORT || 5000
app.use(express.json())

app.use('/api/user',require('./routes/user.routes'))
// app.use('/api/admin',require('./routes/admin.routes'))
// app.use('/api',(req,res)=>{
//    return  res.send("Hello world")
// })



var models = require("./models");
const sequelize = models.sequelize;

//Sync Database REMOVE FORCE TRUE to prevent overwrite of table
sequelize.sync().then(function() {
    console.log('Nice! Database synchronization successful');
  }).catch(function(err) {
    console.error('Database synchronization error:', err);
 });


app.listen(port,()=>{
    console.log(`App is listening on Port ${port}`)
})