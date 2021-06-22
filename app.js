const express = require("express");
const Emp = require('./models/emp')
const formidableMiddleware = require('express-formidable');
const AdminBro = require(`admin-bro`);
const AdminBroMongoose = require(`@admin-bro/mongoose`)
const AdminBroExpress = require(`@admin-bro/express`)
const app = express();
const mongoose = require("mongoose")

//Database
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
mongoose.connection.once('open', function(){
    console.log('Database connected Succefully')
}).on('error', function(err){
    console.log('Error in db connection', err)
})


// adminBro
AdminBro.registerAdapter(AdminBroMongoose)
const AdminBroOptions = {
    resources: [Emp]
}

const adminBro = new AdminBro(AdminBroOptions)
const router = AdminBroExpress.buildRouter(adminBro);
app.use(adminBro.options.rootPath, router)

// app.use(formidableMiddleware());


app.get('/', (req, res) => {
    console.log(" home page ")
})


const port = 3000

app.listen(port, (err) => {
    if(err){
        console.log(err);
    }
})



